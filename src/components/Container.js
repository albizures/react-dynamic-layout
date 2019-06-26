// @ts-check
import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import useSizeProperties from '../hooks/useSizeProperties';
import useContextLayout from '../hooks/useContextLayout';
import { getIdBy } from '../utils/keys';
import { dimensionsAreZero } from '../utils/size';

const { assign } = Object;

const getContent = (dimensions, children, id) => {
  const childrenIsFunction = typeof children === 'function';

  if (dimensionsAreZero(dimensions)) {
    return 'Processing2...';
  }

  if (childrenIsFunction) {
    return children({ dimensions, id });
  }

  return children;
};

const getDimensions = (elementRef) => {
  const { current: element } = elementRef;
  if (element) {
    const { clientWidth: width, clientHeight: height } = element;
    return {
      width,
      height,
    };
  } else {
    return {
      width: 0,
      height: 0,
    };
  }
};

const Container = (props) => {
  const {
    containersEventsRef: { current: containersEvents },
    layoutEventsRef: { current: layoutEvents },
    variableContainersRef: { current: variableContainers },
  } = useContextLayout();
  const [size, setSize] = useState();
  const { children, initialSize } = props;
  const style = {};
  const elementRef = useRef();
  const { portion } = useSizeProperties();
  const id = getIdBy(children);
  const dimensions = getDimensions(elementRef);
  const currentSize = dimensions[portion];

  const onLayoutResize = useCallback(
    (diff) => {
      const containerDiff = diff / variableContainers.length;
      setSize((size) => (size || currentSize) + containerDiff);
    },
    [variableContainers, currentSize],
  );

  const onContainersResize = useCallback(
    ({ diff }) => {
      setSize((size) => (size || currentSize) + diff);
    },
    [currentSize],
  );

  useEffect(() => {
    layoutEvents.fire('resize');
  }, [size, layoutEvents]);

  useEffect(() => {
    containersEvents.on(`resize.${id}`, onContainersResize);
    return () => containersEvents.off(`resize.${id}`, onContainersResize);
  }, [containersEvents, onContainersResize, id]);

  useEffect(() => {
    containersEvents.on('layout-resize', onLayoutResize);
    return () => containersEvents.off('layout-resize', onLayoutResize);
  }, [containersEvents, onLayoutResize]);

  useEffect(() => {
    if (!size && currentSize !== 0) {
      setSize(currentSize);
    }
  }, [size, currentSize]);

  if (size) {
    assign(style, { [portion]: size });
  } else if (initialSize) {
    assign(style, { [portion]: initialSize });
  } else {
    assign(style, { flex: 'auto' });
  }

  const content = getContent(dimensions, children, id);

  return (
    <div ref={elementRef} className="rdl-container" style={style}>
      {content}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  initialSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Container;
