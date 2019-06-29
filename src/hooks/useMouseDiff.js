import { useCallback, useRef } from 'react';
import useMouseMove from './useMouseMove';

const useMouseDiff = (options) => {
  const { onDiffChange, onDiffLastChange } = options;
  const addEventListener = useMouseMove();
  const diffRef = useRef({
    left: 0,
    top: 0,
  });
  const initialPositionRef = useRef();

  const setDiff = useCallback(
    (currentPosition) => {
      const { current: initialPosition } = initialPositionRef;

      diffRef.current = {
        left: currentPosition.left - initialPosition.left,
        top: currentPosition.top - initialPosition.top,
      };
      if (onDiffChange) {
        onDiffChange(diffRef.current);
      }
    },
    [onDiffChange],
  );

  const onRemoveListener = useCallback(
    (currentPosition) => {
      setDiff(currentPosition);
      if (onDiffLastChange) {
        onDiffLastChange(diffRef.current);
      }
    },
    [onDiffLastChange, setDiff],
  );

  const onMouseDown = useCallback(
    (event) => {
      const { clientX, clientY } = event;

      initialPositionRef.current = {
        left: clientX,
        top: clientY,
      };

      addEventListener(setDiff, {
        onRemoveListener,
      });
    },
    [addEventListener, setDiff, onRemoveListener],
  );

  return onMouseDown;
};

export default useMouseDiff;
