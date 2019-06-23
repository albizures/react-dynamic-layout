import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import useDimensions from '../hooks/useDimensions';
import useSizeProperties from '../hooks/useSizeProperties';
import useContextLayout from '../hooks/useContextLayout';
import { getIdBy } from '../utils/keys';

const { assign } = Object;

const Container = (props) => {
  const {
    containersEventsRef: { current: containersEvents },
    variableContainersRef: { current: variableContainers },
  } = useContextLayout();
  const [size, setSize] = useState();
  const { children, initialSize } = props;
  const childrenIsFunction = typeof children === 'function';
  const style = {};

  const elementRef = useRef();
  const { dimensions } = useDimensions(elementRef, !size);
  const { portion } = useSizeProperties();
  const id = getIdBy(children);

  const onLayoutResize = useCallback(
    (diff) => {
      const containerDiff = diff / variableContainers.length;

      setSize((size) => size + containerDiff);
    },
    [variableContainers],
  );

  const onContainersResize = useCallback(
    ({ containers, diff }) => {
      const [before, after] = containers;

      if (id === before) {
        setSize((size) => size + diff);
      }

      if (id === after) {
        setSize((size) => size - diff);
      }
    },
    [id],
  );

  useEffect(() => {
    containersEvents.on('resize', onContainersResize);
    return () => containersEvents.off('resize', onContainersResize);
  }, [containersEvents, onContainersResize]);

  useEffect(() => {
    containersEvents.on('layout-resize', onLayoutResize);
    return () => containersEvents.off('layout-resize', onLayoutResize);
  }, [containersEvents, onLayoutResize]);

  if (size) {
    assign(style, { [portion]: size });
  } else if (initialSize) {
    assign(style, { [portion]: initialSize });
  } else {
    assign(style, { flex: 'auto' });
  }

  const content = childrenIsFunction ? children({ dimensions, id }) : children;

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
