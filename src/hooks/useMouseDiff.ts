import { useCallback, useRef } from 'react';
import useMouseMove from './useMouseMove';

interface Position {
  left: number;
  top: number;
}

interface UseMouseDiffOptions {
  onDiffChange: Function;
  onDiffLastChange: Function;
}

const useMouseDiff = (options: UseMouseDiffOptions) => {
  const { onDiffChange, onDiffLastChange } = options;
  const addEventListener = useMouseMove();
  const diffRef = useRef<Position>({
    left: 0,
    top: 0,
  });
  const initialPositionRef = useRef<Position>();

  const setDiff = useCallback(
    (currentPosition) => {
      const { current: initialPosition } = initialPositionRef;

      diffRef.current = {
        left: currentPosition.left - initialPosition!.left,
        top: currentPosition.top - initialPosition!.top,
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
    (event: React.MouseEvent) => {
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

export { Position };

export default useMouseDiff;
