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
const createLayoutContext = ({
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

const useParentLayoutEvents = ({ onCheckDimensions }, dimensions) => {
  const { layoutEventsRef } = useContextLayout();
  useEffect(() => {
    const isRoot = !layoutEventsRef;
    if (!isRoot) {
      const { current: layoutEvents } = layoutEventsRef;
      layoutEvents.on('resize', onCheckDimensions);

      return () => layoutEvents.off('resize', onCheckDimensions);
    }
  }, [onCheckDimensions, layoutEventsRef, dimensions]);
};

const useLayoutDimensions = (elementRef) => {
  const { layoutEventsRef } = useContextLayout();
  const isRoot = !layoutEventsRef;
  return useDimensions(elementRef, isRoot);
};

const Layout = (props) => {
  const variableContainersRef = useRef([]);
  const elementRef = useRef(null);
  const { dimensions, checkDimensions } = useLayoutDimensions(elementRef);
  const { layoutEventsRef, containersEventsRef } = useEventSystem();
  const { children, type, floats } = props;
  const { current: layoutEvents } = layoutEventsRef;
  const { current: containersEvents } = containersEventsRef;
  const { current: variableContainers } = variableContainersRef;
  const style = { flexDirection: type };

  const childrenArr = Children.toArray(children);

  const { content } = childrenArr.reduce(
    (result, child, index, list) => {
      const { isFixedSize, children } = child.props;
      const isLast = index === list.length - 1;
      const { content } = result;

      content.push(child);

      const current = getIdBy(children);

      if (isFixedSize) {
        const index = variableContainers.indexOf(current);
        variableContainers.splice(index, 1);
      } else if (!variableContainers.includes(current)) {
        variableContainers.push(current);
      }

      if (isFixedSize || isLast) {
        return result;
      }

      const onSizeChange = (change) => {
        const { diff } = change;

        layoutEvents.fire('resize');
        containersEvents.fire(`resize.${current}`, {
          diff,
        });
        containersEvents.fire(`resize.${after}`, {
          diff: -diff,
        });
      };

      const after = getIdBy(list[index + 1].props.children);
      content.push(
        <Divider
          before={current}
          after={after}
          key={`${current}-${after}`}
          onSizeChange={onSizeChange}
        />,
      );

      return result;
    },
    { content: [] },
  );

  const contextValue = createLayoutContext({
    layoutEventsRef,
    containersEventsRef,
    type,
    dimensions,
    variableContainersRef,
  });

  useEffect(() => {
    const { lastHeight, lastWidth, width, height } = dimensions;
    const diff =
      type === layoutTypes.ROW ? width - lastWidth : height - lastHeight;

    layoutEvents.fire('resize');

    if (diff !== 0) {
      containersEvents.fire('layout-resize', diff);
    }
  }, [dimensions, type, layoutEvents, containersEvents]);

  const onCheckDimensions = useCallback(() => {
    checkDimensions();
  }, [checkDimensions]);

  useParentLayoutEvents({ onCheckDimensions }, dimensions);

  useEffect(() => {
    checkDimensions();
  }, [checkDimensions]);

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
