// @ts-check
import React, { useRef, useEffect, useState, useCallback } from 'react';

import useSizeProperties from '../hooks/useSizeProperties';
import useContextLayout from '../hooks/useContextLayout';
import useDimensions, { Dimensions } from '../hooks/useDimensions';
import { createId } from '../utils/keys';
import { dimensionsAreZero } from '../utils/size';

const { assign } = Object;

type RenderChildren = (options: {
  dimensions: Dimensions;
  id: string | undefined;
}) => React.ReactNode;

const getContent = (
  size: number | string | undefined,
  children: RenderChildren | React.ReactNode,
  id: string | undefined,
  dimensions: Dimensions,
): null | React.ReactNode => {
  const childrenIsFunction = typeof children === 'function';

  if (!size || dimensionsAreZero(dimensions)) {
    return null;
  }

  if (childrenIsFunction) {
    return (children as RenderChildren)({ dimensions, id });
  }

  return children;
};

interface PropTypes {
  children: RenderChildren | React.ReactNode;
  initialSize?: number | string;
  id?: string;
  isFixedSize?: boolean;
}

const Container: React.FC<PropTypes> = (props) => {
  const {
    containersEventsRef: { current: containersEvents },
    layoutEventsRef: { current: layoutEvents },
    variableContainersRef: { current: variableContainers },
  } = useContextLayout();
  const { children, initialSize, id, isFixedSize = false } = props;
  const [size, setSize] = useState(initialSize);
  const style = {};
  const elementRef = useRef<HTMLDivElement>(null);
  const { portion } = useSizeProperties();
  const { dimensions, checkDimensions } = useDimensions(elementRef, false);
  const currentSize = dimensions[portion];
  const { width, height } = dimensions;
  const numberOfVariableContainers =
    (variableContainers && variableContainers.length) || 1;

  const onLayoutResize = useCallback(
    (diff) => {
      const containerDiff = diff / numberOfVariableContainers;

      if (diff !== 0) {
        setSize((lastSize) => (lastSize || currentSize) + containerDiff);
      }

      checkDimensions();
    },
    [numberOfVariableContainers, currentSize, checkDimensions],
  );

  const onContainersResize = useCallback(
    ({ diff }) => {
      setSize((lastSize) => (lastSize || currentSize) + diff);
    },
    [currentSize],
  );

  useEffect(() => {
    if (layoutEvents === null) {
      return;
    }

    layoutEvents.fire('resize');
  }, [width, height, layoutEvents]);

  useEffect(() => {
    if (containersEvents === null) {
      return;
    }

    containersEvents.on(`resize.${id}`, onContainersResize);
    return () => containersEvents.off(`resize.${id}`, onContainersResize);
  }, [containersEvents, onContainersResize, id]);

  useEffect(() => {
    if (isFixedSize || containersEvents === null) {
      return;
    }
    containersEvents.on('layout-resize', onLayoutResize);
    return () => containersEvents.off('layout-resize', onLayoutResize);
  }, [containersEvents, onLayoutResize, isFixedSize]);

  useEffect(() => {
    if ((!size || typeof size === 'string') && currentSize !== 0) {
      setSize(currentSize);
    }
  }, [size, currentSize, id]);

  // Lazy check
  setTimeout(() => checkDimensions());

  if (typeof size === 'number') {
    assign(style, { flex: `0 0 ${size}px` });
    if (isFixedSize) {
      assign(style, {
        [portion]: `${size}px`,
      });
    }
  } else if (typeof size === 'string') {
    assign(style, { flex: `0 0 ${size}` });
    if (isFixedSize) {
      assign(style, {
        [portion]: size,
      });
    }
  } else {
    assign(style, { flex: 'auto' });
  }

  const content = getContent(size, children, id, dimensions);
  return (
    <div data-id={id} ref={elementRef} className="rdl-container" style={style}>
      {content}
    </div>
  );
};

Container.defaultProps = {
  get id() {
    return createId();
  },
};

export default Container;
