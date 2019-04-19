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

  const onRemoveListener = useCallback(() => {
    onDiffLastChange && onDiffLastChange(diffRef.current);
  }, [onDiffLastChange]);

  const setDiff = useCallback(
    (currentPosition) => {
      const { current: initialPosition } = initialPositionRef;

      diffRef.current = {
        left: currentPosition.left - initialPosition.left,
        top: currentPosition.top - initialPosition.top,
      };
      onDiffChange && onDiffChange(diffRef.current);
    },
    [onDiffChange],
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
