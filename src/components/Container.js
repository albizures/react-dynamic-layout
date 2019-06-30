// @ts-check
import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import useSizeProperties from '../hooks/useSizeProperties';
import useContextLayout from '../hooks/useContextLayout';
import useDimensions from '../hooks/useDimensions';
import { createId } from '../utils/keys';

const { assign } = Object;

const getContent = (size, children, id, dimensions) => {
  const childrenIsFunction = typeof children === 'function';

  if (!size) {
    return 'Processing2...';
  }

  if (childrenIsFunction) {
    return children({ dimensions, id });
  }

  return children;
};

const Container = (props) => {
  const {
    containersEventsRef: { current: containersEvents },
    layoutEventsRef: { current: layoutEvents },
    variableContainersRef: { current: variableContainers },
  } = useContextLayout();
  const { children, initialSize, id } = props;
  const [size, setSize] = useState(initialSize);
  const style = {};
  const elementRef = useRef();
  const { portion } = useSizeProperties();
  const { dimensions, checkDimensions } = useDimensions(elementRef, false);
  const currentSize = dimensions[portion];
  const { width, height } = dimensions;

  const onLayoutResize = useCallback(
    (diff) => {
      const containerDiff = diff / variableContainers.length;

      if (diff !== 0) {
        setSize((lastSize) => (lastSize || currentSize) + containerDiff);
      }

      checkDimensions();
    },
    [variableContainers, currentSize, checkDimensions],
  );

  const onContainersResize = useCallback(
    ({ diff }) => {
      setSize((lastSize) => (lastSize || currentSize) + diff);
    },
    [currentSize],
  );

  useEffect(() => {
    layoutEvents.fire('resize');
  }, [width, height, layoutEvents]);

  useEffect(() => {
    containersEvents.on(`resize.${id}`, onContainersResize);
    return () => containersEvents.off(`resize.${id}`, onContainersResize);
  }, [containersEvents, onContainersResize, id]);

  useEffect(() => {
    containersEvents.on('layout-resize', onLayoutResize);
    return () => containersEvents.off('layout-resize', onLayoutResize);
  }, [containersEvents, onLayoutResize]);

  useEffect(() => {
    if ((!size || typeof size === 'string') && currentSize !== 0) {
      setSize(currentSize);
    }
  }, [size, currentSize]);

  useEffect(() => {
    checkDimensions();
  }, [size, checkDimensions]);

  if (typeof size === 'number') {
    assign(style, { flex: `0 0 ${size}px` });
  } else if (typeof size === 'string') {
    assign(style, { flex: `0 0 ${size}` });
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

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  id: PropTypes.string,
  initialSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Container;
