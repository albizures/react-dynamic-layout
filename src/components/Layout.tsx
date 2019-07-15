// @ts-check
import React, { Children, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Divider from './Divider';
import LayoutContext from '../contexts/LayoutContext';
import useDimensions from '../hooks/useDimensions';
import useContextLayout from '../hooks/useContextLayout';
import useEventSystem from '../hooks/useEventSystem';
import { LayoutType } from '../types';

/**
 * @typedef {import('../types').Layout} LayoutType
 * @typedef {import('../hooks/useDimensions').Dimensions} Dimensions
 * @typedef {import('../contexts/LayoutContext').LayoutContextType} LayoutContextType
 * @typedef {import('../utils/size').SizeDescriptor} SizeDescriptor
 * @typedef {import('../utils/events').EventSystem} EventSystem
 * @typedef {import('../utils/events').OnEvent} OnEvent
 * @typedef {import('../utils/events').OffEvent} OffEvent
 * @typedef {import('../utils/events').FireEvent} FireEvent
 */

/**
 *
 * @typedef ResultChildrenReducer
 * @property {Container} containers
 * @property {number} totalSize
 * @property {number[]} autoSizes
 * @property {number[]} variableSizes
 */

/**
 *
 * @callback ChildrenReducer
 * @param {ResultChildrenReducer} result
 * @param {object} child
 * @param {number} index
 * @returns {ResultChildrenReducer}
 */

/**
 *
 * @param {object} params
 * @param {string} params.type
 * @param {object} params.variableContainersRef
 * @param {object} params.layoutEventsRef
 * @param {object} params.containersEventsRef
 * @returns {LayoutContextType}
 */
const createLayoutContext = ({
  type,
  variableContainersRef,
  layoutEventsRef,
  containersEventsRef,
}) => {
  return {
    layoutEventsRef,
    containersEventsRef,
    variableContainersRef,
    isRoot: false,
    type,
  };
};

const useParentLayoutEvents = ({ onCheckDimensions }) => {
  const { layoutEventsRef } = useContextLayout();
  useEffect(() => {
    const isRoot = !layoutEventsRef;
    if (!isRoot) {
      const { current: layoutEvents } = layoutEventsRef;
      layoutEvents!.on('resize', onCheckDimensions);

      return () => layoutEvents!.off('resize', onCheckDimensions);
    }
  }, [onCheckDimensions, layoutEventsRef]);
};

const useLayoutDimensions = (elementRef) => {
  const { layoutEventsRef } = useContextLayout();
  const isRoot = !layoutEventsRef;
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
  ) => {
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
    const { current: lastWidth } = lastWidthRef;
    const { current: lastHeight } = lastHeightRef;
    const diff = {
      width: 0,
      height: 0,
    };

    if (!(width === 0 || lastWidth === 0)) {
      diff.width = width - lastWidth!;
    }

    if (!(height === 0 || lastHeight === 0)) {
      diff.height = height - lastHeight!;
    }

    const containersDiff = type === 'row' ? diff.width : diff.height;

    containersEvents.fire('layout-resize', containersDiff);
    lastWidthRef.current = width;
    lastHeightRef.current = height;

    if (diff.width !== 0 || diff.height !== 0) {
      layoutEvents.fire('resize');
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
