import { useCallback, useEffect, useState, useRef } from 'react';
import { Position } from './useMouseDiff';

const getPosition = (event, offset) => {
  const { clientX, clientY } = event;

  if (offset) {
    const { top, left } = offset;
    return {
      left: clientX - left,
      top: clientY - top,
    };
  }

  return {
    left: clientX,
    top: clientY,
  };
};

const useMouseMove = () => {
  const [eventListener, setEventListener] = useState();
  const onRemoveListenerRef = useRef<Function>();
  const [offset, setOffset] = useState<Position>();

  const removeEventListener = useCallback((position) => {
    setEventListener(undefined);
    setOffset(undefined);
    if (onRemoveListenerRef.current) {
      const { current: onRemoveListener } = onRemoveListenerRef;

      onRemoveListenerRef.current = undefined;
      onRemoveListener(position);
    }
  }, []);

  const addEventListener = useCallback(
    (onMouseMove, { offset: newOffset, onRemoveListener } = {}) => {
      // NOTE: the extra arrow function is needed
      // because onMouseMove is a function and
      // if it's only provided to setEventListener,
      // setEventListener is going to use onMouseMove
      // to generate the next state.
      setEventListener(() => onMouseMove);
      onRemoveListenerRef.current = onRemoveListener;
      setOffset(newOffset);
      return removeEventListener;
    },
    [removeEventListener],
  );

  const onMouseMove = useCallback(
    (event) => eventListener(getPosition(event, offset)),
    [eventListener, offset],
  );

  const onMouseUp = useCallback(
    (event) => removeEventListener(getPosition(event, offset)),
    [removeEventListener, offset],
  );

  useEffect(() => {
    if (eventListener) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [eventListener, onMouseMove, onMouseUp]);

  return addEventListener;
};

export default useMouseMove;
