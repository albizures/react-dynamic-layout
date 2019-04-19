// @ts-check
import React, {
  Children,
  useRef,
  useLayoutEffect,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Divider from './Divider';
import LayoutContext from '../contexts/LayoutContext';
import useDimensions from '../hooks/useDimensions';
import { layoutTypes } from '../utils/enums';
import { parseSize, getSizeProperty, pixelToPercentage } from '../utils/size';
import * as containersStore from '../store/containers';
import Container from './Container';
import useContextLayout from '../hooks/useContextLayout';
import { removeArrayItem } from '../utils';

/**
 * @typedef {import('../hooks/useDimensions').Dimensions} Dimensions
 * @typedef {import('../utils/size').SizeDescriptor} SizeDescriptor
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
 * @param {Dimensions} params.dimensions
 * @param {string} params.type
 * @returns {ChildrenReducer}
 */
const childrenReducerFactory = ({ dimensions, type }) => (
  result,
  child,
  index,
) => {
  const { props: childProps } = child;
  const { initialSize, isFixedSize, children } = childProps;
  const { portion } = getSizeProperty(type);

  const size = parseSize(initialSize, dimensions[portion], isFixedSize);

  result.containers[index] = {
    children,
    size,
  };

  if (size.isVariable) {
    result.variableSizes.push(index);
  }

  if (size.px !== null) {
    result.totalSize = result.totalSize + size.px;
  } else {
    result.autoSizes.push(index);
  }

  return result;
};

/**
 *
 * @param {ContainersState} containers
 * @param {Function} dispatch
 * @param {Function} fireResizeEvent
 * @returns {(string|Array)}
 */
const getContainers = (containers, dispatch, fireResizeEvent) => {
  if (containers.keyList.length === 0) {
    return 'Processing...';
  }

  return containers.keyList.reduce((result, key, index, list) => {
    const { size, children } = containers.map[key];
    const isLast = index === list.length - 1;

    result.push(
      <Container key={index} size={size.px}>
        {children}
      </Container>,
    );

    if (size.isVariable && !isLast) {
      result.push(
        <Divider
          before={index}
          after={index + 1}
          key={`${index}-${index + 1}`}
          onSizeChange={(change) => {
            const { before: beforeKey, after: afterKey, diff } = change;

            const beforeContainerSize = containers.map[beforeKey].size;
            const afterContainerSize = containers.map[afterKey].size;

            dispatch(
              containersStore.actions.batch([
                containersStore.actions.changeSize(
                  beforeKey,
                  beforeContainerSize.px + diff,
                ),
                containersStore.actions.changeSize(
                  afterKey,
                  afterContainerSize.px - diff,
                ),
              ]),
            );

            fireResizeEvent();
          }}
        />,
      );
    }

    return result;
  }, []);
};

/**
 *
 * @param {object} params
 * @param {string} params.type
 * @param {Array} params.childrenArr
 * @param {Dimensions} params.dimensions
 * @returns {ContainersState}
 */
const createContainersState = (params) => {
  const { type, childrenArr, dimensions } = params;
  const { portion } = getSizeProperty(type);

  const {
    containers,
    totalSize,
    autoSizes,
    variableSizes,
  } = childrenArr.reduce(childrenReducerFactory({ dimensions, type }), {
    containers: {},
    totalSize: 0,
    autoSizes: [],
    variableSizes: [],
  });
  const freeSpace = dimensions[portion] - totalSize;

  if (freeSpace < 0) {
    // eslint-disable-next-line no-console
    console.warn('Size overflow, please check your initial sizes');
  }

  if (freeSpace > 0 && autoSizes.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('Extra free space, please check your initial sizes');
  }

  const autoSize = freeSpace / autoSizes.length;
  autoSizes.forEach((item) => {
    const {
      size: { isVariable },
    } = containers[item];

    containers[item].size = {
      px: autoSize,
      percentage: pixelToPercentage(autoSize, dimensions[portion]),
      isVariable,
    };
  });

  return { map: containers, variableSizes };
};

/**
 *
 * @param {ContainersState} containers
 * @param {string} type
 */
const useCreateLayoutContext = (containers, type) => {
  const resizeListenersRef = useRef([]);
  const removeResizeListener = useCallback((listener) => {
    const { current: resizeListeners } = resizeListenersRef;

    resizeListenersRef.current = removeArrayItem(resizeListeners, listener);
  }, []);

  const addResizeListeners = useCallback((listener) => {
    const { current: resizeListeners } = resizeListenersRef;
    if (!resizeListeners.includes(listener)) {
      resizeListenersRef.current.push(listener);
    }
  }, []);

  const fireResizeEvent = useCallback(() => {
    resizeListenersRef.current.forEach((listener) => listener());
  }, []);

  return {
    addResizeListeners,
    removeResizeListener,
    fireResizeEvent,
    isRoot: false,
    containers,
    type,
  };
};

const Layout = (props) => {
  const {
    addResizeListeners,
    removeResizeListener,
    isRoot,
  } = useContextLayout();
  const initRef = useRef(null);
  const elementRef = useRef(null);
  const [containers, dispatch] = useReducer(containersStore.reducer, {
    variableSizes: [],
    map: {},
    keyList: [],
  });
  const dimensions = useDimensions(elementRef);
  const { children, type, floats } = props;
  const style = {
    flexDirection: type,
  };

  const childrenArr = Children.toArray(children);
  useLayoutEffect(() => {
    if (dimensions.width === 0 && dimensions.height === 0) {
      return;
    }

    let containersState;

    if (initRef.current) {
      const diff =
        type === layoutTypes.ROW
          ? dimensions.width - dimensions.lastWidth
          : dimensions.height - dimensions.lastHeight;
      if (diff !== 0) {
        dispatch(containersStore.actions.resize(diff));
      }
    } else {
      containersState = createContainersState({
        type,
        childrenArr,
        dimensions,
      });

      initRef.current = true;
      dispatch(containersStore.actions.init(containersState));
    }
  }, [childrenArr, dimensions, type]);

  const contextValue = useCreateLayoutContext(containers, type);
  const { fireResizeEvent } = contextValue;

  const content = useMemo(
    () => getContainers(containers, dispatch, fireResizeEvent),
    [containers, fireResizeEvent],
  );

  const onParentLayoutResize = useCallback(() => {
    const { current: element } = elementRef;
    const { clientWidth: width, clientHeight: height } = element;

    const diff =
      type === layoutTypes.ROW
        ? width - dimensions.width
        : height - dimensions.height;

    if (diff !== 0) {
      dispatch(containersStore.actions.resize(diff));
    }

    fireResizeEvent();
  }, [dimensions, type, fireResizeEvent]);

  useEffect(() => {
    if (!isRoot) {
      addResizeListeners(onParentLayoutResize);

      return () => removeResizeListener(onParentLayoutResize);
    }
  }, [isRoot, onParentLayoutResize, addResizeListeners, removeResizeListener]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <div ref={elementRef} className="rdl-layout" style={style}>
        {content}
        {floats}
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
