import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useDimensions from '../hooks/useDimensions';
import useSizeProperties from '../hooks/useSizeProperties';

const { assign } = Object;

const Container = (props) => {
  const { children, size } = props;
  const childrenIsFunction = typeof children === 'function';
  const style = {};

  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, childrenIsFunction);
  const { portion } = useSizeProperties();

  if (size) {
    assign(style, { [portion]: size });
  } else {
    assign(style, { flex: 'auto' });
  }

  const content = childrenIsFunction ? children({ dimensions }) : children;

  return (
    <div ref={elementRef} className="rdl-container" style={style}>
      {content}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Container;
