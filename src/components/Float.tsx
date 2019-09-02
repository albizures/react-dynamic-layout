import React, { useRef, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';

import ResizeBar from './ResizeBar';
import { ResizeBarTypes } from '../utils/enums';
import useMouseMove from '../hooks/useMouseMove';
import useContextLayout from '../hooks/useContextLayout';
import FloatContext from './Float/FloatContext';

interface PropTypes {
  initialTop?: number;
  initialLeft?: number;
  initialWidth: number;
  initialHeight: number;
  isOpen?: boolean;
  children: React.ReactNode;
  dragbar?: React.ReactNode;
  isFixedSize?: boolean;
}

const Float: React.FC<PropTypes> = (props) => {
  const {
    layoutEventsRef: { current: layoutEvents },
  } = useContextLayout();

  const addEventListener = useMouseMove();
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    initialTop = 0,
    initialLeft = 0,
    initialWidth,
    initialHeight,
    isOpen,
    children,
    isFixedSize,
    dragbar,
  } = props;

  const [{ top, left }, setPosition] = useState({
    top: initialTop,
    left: initialLeft,
  });

  const [{ width, height }, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const style = {
    top,
    left,
    width,
    height,
  };

  const move = useCallback((position) => {
    setPosition(position);
  }, []);

  const onMouseDown = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      addEventListener(move, {
        offset: {
          left: clientX - left,
          top: clientY - top,
        },
      });
    },
    [addEventListener, move, top, left],
  );

  const onSizeChange = useCallback(
    (diff) => {
      const {
        left: diffLeft = 0,
        right: diffRight = 0,
        top: diffTop = 0,
        bottom: diffBottom = 0,
      } = diff;

      setPosition({
        left: left + diffLeft,
        top: top + diffTop,
      });

      setSize({
        width: width - diffLeft - diffRight,
        height: height - diffTop - diffBottom,
      });

      if (layoutEvents !== null) {
        layoutEvents.fire('resize');
      }
    },
    [width, height, top, left, layoutEvents],
  );

  useEffect(() => {
    if (isOpen && layoutEvents !== null) {
      layoutEvents.fire('resize');
    }
  }, [isOpen, layoutEvents]);

  const className = classNames({
    'rdl-float': true,
    'rdl-float--open': isOpen,
  });

  const contextValue = {
    onMouseDown,
  };

  return (
    <FloatContext.Provider value={contextValue}>
      <div ref={elementRef} style={style} className={className}>
        {dragbar}
        {!isFixedSize ? (
          <>
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.NORTH}
            />
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.SOUTH}
            />
            <ResizeBar onSizeChange={onSizeChange} type={ResizeBarTypes.EAST} />
            <ResizeBar onSizeChange={onSizeChange} type={ResizeBarTypes.WEST} />
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.NORTH_EAST}
            />
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.NORTH_WEST}
            />
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.SOUTH_WEST}
            />
            <ResizeBar
              onSizeChange={onSizeChange}
              type={ResizeBarTypes.SOUTH_EAST}
            />
          </>
        ) : null}
        <div className="rdl-float__content">{children}</div>
      </div>
    </FloatContext.Provider>
  );
};

Float.defaultProps = {
  isOpen: false,
  dragbar: undefined,
  isFixedSize: false,
};

export default Float;
