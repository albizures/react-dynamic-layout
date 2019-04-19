import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useDimensions from '../../hooks/useDimensions';

const Content = (props) => {
  const { children } = props;
  const childrenIsFunction = typeof children === 'function';

  const elementRef = useRef();
  const { dimensions } = useDimensions(elementRef, childrenIsFunction);

  const content = childrenIsFunction ? children({ dimensions }) : children;

  return (
    <div ref={elementRef} className="rdl-tabs__content">
      {content}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Content;
