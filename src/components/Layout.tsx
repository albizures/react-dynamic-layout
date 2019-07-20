import React, { Children, useRef, useCallback, useEffect } from 'react';

import Divider from './Divider';
import LayoutContext, { LayoutState } from '../contexts/LayoutContext';
import useDimensions, { UseDimensions } from '../hooks/useDimensions';
import useContextLayout from '../hooks/useContextLayout';
import useEventSystem from '../hooks/useEventSystem';
import { LayoutType } from '../types';

const createLayoutContext = ({
  type,
  variableContainersRef,
  layoutEventsRef,
  containersEventsRef,
}): LayoutState => {
  return {
    layoutEventsRef,
    containersEventsRef,
    variableContainersRef,
    isRoot: false,
    type,
  };
};

const useParentLayoutEvents = ({ onCheckDimensions }): void => {
  const { isRoot, layoutEventsRef } = useContextLayout();
  useEffect(() => {
    if (!isRoot) {
      const { current: layoutEvents } = layoutEventsRef;
      if (layoutEvents === null) {
        return;
      }

      layoutEvents.on('resize', onCheckDimensions);

      return () => layoutEvents.off('resize', onCheckDimensions);
    }
  }, [onCheckDimensions, layoutEventsRef, isRoot]);
};

const useLayoutDimensions = (
  elementRef: React.RefObject<HTMLElement>,
): UseDimensions => {
  const { isRoot } = useContextLayout();
  return useDimensions(elementRef, isRoot);
};

interface PropTypes {
  children: React.ReactNode;
  type: LayoutType;
  floats?: React.ReactNode[];
}

type Layout = React.FC<PropTypes> & {
  ROW: LayoutType;
  COLUMN: LayoutType;
};

const Layout: Layout = (props) => {
  const variableContainersRef = useRef<string[]>([]);
  const elementRef = useRef(null);
  const { dimensions, checkDimensions, setElement } = useLayoutDimensions(
    elementRef,
  );
  const { layoutEventsRef, containersEventsRef } = useEventSystem();
  const { children, type = LayoutType.ROW, floats = [] } = props;
  const { current: layoutEvents } = layoutEventsRef;
  const { current: containersEvents } = containersEventsRef;
  const { current: variableContainers } = variableContainersRef;
  const style = { flexDirection: type };
  const { lastHeightRef, lastWidthRef, width, height } = dimensions;

  const childrenArr = Children.toArray(children);

  variableContainers.length = 0;

  /**
   * @param {React.ReactNode[]} result
   * @param {React.ReactNode & { props: object }} child
   * @param {number} index
   * @param {Array<{ props: object }>} list
   */
  const reducer = (
    result,
    child: { props: { id: string; isFixedSize: boolean } },
    index: number,
    list: any[],
  ): React.ReactNode[] => {
    const { isFixedSize, id } = child.props;
    const isLast = index === list.length - 1;

    result.push(child);

    if (isFixedSize) {
      const indexContainer = variableContainers.indexOf(id);
      if (indexContainer !== -1) {
        variableContainers.splice(indexContainer, 1);
      }
    } else if (!variableContainers.includes(id)) {
      variableContainers.push(id);
    }

    if (isFixedSize || isLast) {
      return result;
    }

    const next = list[index + 1];
    const after = next.props.id;
    const nextHasFixedSize = next.props.isFixedSize;

    if (nextHasFixedSize) {
      return result;
    }

    if (containersEvents === null) {
      return result;
    }

    result.push(
      <Divider
        before={id}
        after={after}
        containersEvents={containersEvents}
        key={`${id}-${after}`}
      />,
    );

    return result;
  };
  /** @type {React.ReactNode[]} */
  const initContent = [];
  // @ts-ignore
  const content = childrenArr.reduce(reducer, initContent);

  const contextValue = createLayoutContext({
    layoutEventsRef,
    containersEventsRef,
    type,
    variableContainersRef,
  });

  useEffect(() => {
    const { current: lastWidth = 0 } = lastWidthRef;
    const { current: lastHeight = 0 } = lastHeightRef;
    const diff = {
      width: 0,
      height: 0,
    };

    if (!(width === 0 || lastWidth === 0)) {
      diff.width = width - lastWidth;
    }

    if (!(height === 0 || lastHeight === 0)) {
      diff.height = height - lastHeight;
    }

    const containersDiff = type === 'row' ? diff.width : diff.height;

    if (containersEvents !== null) {
      containersEvents.fire('layout-resize', containersDiff);
    }
    lastWidthRef.current = width;
    lastHeightRef.current = height;

    if (diff.width !== 0 || diff.height !== 0) {
      if (layoutEvents !== null) {
        layoutEvents.fire('resize');
      }
    }
  }, [
    type,
    layoutEvents,
    containersEvents,
    width,
    height,
    lastWidthRef,
    lastHeightRef,
  ]);

  const onCheckDimensions = useCallback(() => {
    checkDimensions();
  }, [checkDimensions]);

  useParentLayoutEvents({ onCheckDimensions });

  return (
    <LayoutContext.Provider value={contextValue}>
      <div ref={setElement} className="rdl-layout" style={style}>
        {content}
        {floats}
      </div>
    </LayoutContext.Provider>
  );
};

Layout.ROW = LayoutType.ROW;
Layout.COLUMN = LayoutType.COLUMN;

export default Layout;
