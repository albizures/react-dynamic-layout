import React, { useRef } from 'react';

import useDimensions, { Dimensions } from '../../hooks/useDimensions';

type RenderChildren = (options: { dimensions: Dimensions }) => React.ReactNode;

interface PropTypes {
  children: RenderChildren | React.ReactNode;
}
const Content: React.FC<PropTypes> = (props) => {
  const { children } = props;
  const childrenIsFunction = typeof children === 'function';

  const elementRef = useRef<HTMLDivElement>(null);
  const { dimensions } = useDimensions(elementRef, childrenIsFunction);

  const content = childrenIsFunction
    ? (children as RenderChildren)({ dimensions })
    : children;

  return (
    <div ref={elementRef} className="rdl-tabs__content">
      {content}
    </div>
  );
};

export default Content;
