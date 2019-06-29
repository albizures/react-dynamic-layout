// @ts-check
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import { debounce } from '../utils';

/**
 * @typedef {object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} lastWidth
 * @property {number} lastHeight
 */

/**
 * @typedef {object} UseDimensions
 * @property {object} dimensions
 * @property {Function} checkDimensions
 * @property {(element: HTMLDivElement) => void} setElement
 */

/**
 *
 * @param {React.RefObject<HTMLElement>} elementRef
 * @param {boolean} isLive
 * @returns {UseDimensions}
 */
const useDimensions = (elementRef, isLive = true) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const lastWidthRef = useRef(0);
  const lastHeightRef = useRef(0);

  const checkDimensions = useMemo(() => {
    return () => {
      const { current: element } = elementRef;
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

export default useDimensions;
