import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import { debounce } from '../utils';

interface Dimensions {
  width: number;
  height: number;
  lastWidthRef: React.MutableRefObject<number>;
  lastHeightRef: React.MutableRefObject<number>;
}

interface UseDimensions {
  dimensions: Dimensions;
  checkDimensions: Function;
  setElement: (element: HTMLDivElement) => void;
}

const useDimensions = (
  elementRef: React.RefObject<HTMLElement>,
  isLive: boolean = true,
): UseDimensions => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const lastWidthRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);

  const checkDimensions = useMemo(() => {
    return () => {
      const { current: element } = elementRef;

      if (element === null) {
        return;
      }

      const {
        clientWidth: currentWidth,
        clientHeight: currentHeight,
      } = element;

      setWidth((lastWidth) => {
        if (lastWidth !== currentWidth) {
          lastWidthRef.current = lastWidth;
        }

        return currentWidth;
      });
      setHeight((lastHeight) => {
        if (lastHeight !== currentWidth) {
          lastHeightRef.current = lastHeight;
        }
        return currentHeight;
      });
    };
  }, [elementRef]);

  useEffect(() => {
    if (isLive) {
      const saveDimensions = debounce(checkDimensions, 300);

      window.addEventListener('resize', saveDimensions);

      saveDimensions();
      return () => {
        window.removeEventListener('resize', saveDimensions);
      };
    }
  }, [isLive, checkDimensions]);

  const setElement = useCallback(
    (element) => {
      if (element) {
        // @ts-ignore
        elementRef.current = element;
        checkDimensions();
      }
    },
    [elementRef, checkDimensions],
  );

  const dimensions = {
    width,
    height,
    lastWidthRef,
    lastHeightRef,
  };

  return { dimensions, checkDimensions, setElement };
};

export { Dimensions };
export default useDimensions;
