// @ts-check
import React, { Children, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Divider from './Divider';
import LayoutContext from '../contexts/LayoutContext';
import useDimensions from '../hooks/useDimensions';
import { layoutTypes } from '../utils/enums';
import useContextLayout from '../hooks/useContextLayout';
import { dimensionsAreZero } from '../utils/size';
import { getIdBy } from '../utils/keys';
import useEventSystem from '../hooks/useEventSystem';

/**
 * @typedef {import('../hooks/useDimensions').Dimensions} Dimensions
 * @typedef {import('../contexts/LayoutContext').LayoutContextType} LayoutContextType
 * @typedef {import('../utils/size').SizeDescriptor} SizeDescriptor
 * @typedef {import('../utils/events').EventSystem} EventSystem
 * @typedef {import('../utils/events').OnEvent} OnEvent
 * @typedef {import('../utils/events').OffEvent} OffEvent
 * @typedef {import('../utils/events').FireEvent} FireEvent
 * @typedef {import('../store/containers').ContainersState} ContainersState
 * @typedef {import('../store/containers').Container} Container
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
 * @param {Dimensions} params.dimensions
 * @param {object} params.variableContainersRef
 * @param {object} params.layoutEventsRef
 * @param {object} params.containersEventsRef
 * @returns {LayoutContextType}
 */
const useCreateLayoutContext = ({
  type,
  dimensions,
  variableContainersRef,
  layoutEventsRef,
  containersEventsRef,
}) => {
  return {
    layoutEventsRef,
    containersEventsRef,
    variableContainersRef,
    isRoot: false,
    dimensions,
    type,
  };
};

const useParentLayoutEvents = (
  { onParentLayoutResize, onCheckDimensions },
  dimensions,
) => {
  const { layoutEventsRef } = useContextLayout();

  useEffect(() => {
    if (layoutEventsRef) {
      const { current: layoutEvents } = layoutEventsRef;
      layoutEvents.on('resize', onParentLayoutResize);

      return () => layoutEvents.off('resize', onParentLayoutResize);
    }
    if (!dimensionsAreZero(dimensions)) {
      onParentLayoutResize();
    }
  }, [onParentLayoutResize, layoutEventsRef, dimensions]);

  useEffect(() => {
    if (!layoutEventsRef) {
      window.addEventListener('resize', onCheckDimensions);
      return () => window.removeEventListener('resize', onCheckDimensions);
    }

    const { current: layoutEvents } = layoutEventsRef;
    layoutEvents.on('check-dimensions', onCheckDimensions);

    return () => layoutEvents.off('check-dimensions', onCheckDimensions);
  }, [onCheckDimensions, layoutEventsRef]);
};

const Layout = (props) => {
  const variableContainersRef = useRef([]);
  const elementRef = useRef(null);
  const { dimensions, checkDimensions } = useDimensions(elementRef);
  const { children, type, floats } = props;
  const { layoutEventsRef, containersEventsRef } = useEventSystem();
  const { current: layoutEvents } = layoutEventsRef;
  const { current: containersEvents } = containersEventsRef;
  const { current: variableContainers } = variableContainersRef;
  const style = { flexDirection: type };

  const childrenArr = Children.toArray(children);
  const { content } = childrenArr.reduce(
    (result, child, index, list) => {
      const { isFixedSize, children } = child.props;
      const isLast = index === list.length - 1;

      result.content.push(child);

      const current = getIdBy(children);

      if (isFixedSize) {
        const index = variableContainers.indexOf(current);
        variableContainers.splice(index, 1);
      } else if (!variableContainers.includes(current)) {
        variableContainers.push(current);
      }

      if (!isFixedSize && !isLast) {
        const after = getIdBy(list[index + 1].props.children);
        result.content.push(
          <Divider
            before={current}
            after={after}
            key={`${current}-${after}`}
            onSizeChange={(change) => {
              const { diff } = change;

              layoutEvents.fire('resize');
              containersEvents.fire('resize', {
                containers: [current, after],
                diff,
              });
            }}
          />,
        );
      }

      return result;
    },
    { content: [] },
  );

  const contextValue = useCreateLayoutContext({
    layoutEventsRef,
    containersEventsRef,
    type,
    dimensions,
    variableContainersRef,
  });
  const { lastHeight, lastWidth } = dimensions;
  const onParentLayoutResize = useCallback(() => {
    const { current: element } = elementRef;
    const { clientWidth: width, clientHeight: height } = element;

    const diff =
      type === layoutTypes.ROW ? width - lastWidth : height - lastHeight;

    layoutEvents.fire('resize');

    if (diff !== 0) {
      containersEvents.fire('layout-resize', diff);
    }
  }, [lastHeight, lastWidth, type, layoutEvents, containersEvents]);

  const onCheckDimensions = useCallback(() => {
    checkDimensions();
  }, [checkDimensions]);

  useParentLayoutEvents(
    { onParentLayoutResize, onCheckDimensions },
    dimensions,
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <div ref={elementRef} className="rdl-layout" style={style}>
        {dimensionsAreZero(dimensions) ? (
          'Processing...'
        ) : (
          <>
            {content}
            {floats}
          </>
        )}
      </div>
    </LayoutContext.Provider>
  );
};

Layout.defaultValues = {
  type: layoutTypes.ROW,
  floats: [],
};

Layout.propTypes = {
  floats: PropTypes.array,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(layoutTypes)),
};

Object.assign(Layout, layoutTypes);

export default Layout;
