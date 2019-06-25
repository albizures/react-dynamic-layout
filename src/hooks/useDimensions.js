// @ts-check
import { useEffect, useState, useCallback } from 'react';

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
 * @property {Dimensions} dimensions
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
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    lastWidth: 0,
    lastHeight: 0,
  });

  const checkDimensions = useCallback(() => {
    const { current: element } = elementRef;
    const { clientWidth: width, clientHeight: height } = element;

    setDimensions((dimensions) => {
      const { width: currentWidth, height: currentHeight } = dimensions;
      if (currentWidth !== width || currentHeight !== height) {
        return {
          width,
          height,
          lastWidth: dimensions.width,
          lastHeight: dimensions.height,
        };
      }
      return dimensions;
    });
  }, [elementRef]);

  useEffect(() => {
    const { current: element } = elementRef;
    if (isLive) {
      const saveDimensions = debounce(() => {
        const { clientWidth, clientHeight } = element;
        setDimensions(({ width, height }) => ({
          width: clientWidth,
          height: clientHeight,
          lastWidth: width === 0 ? clientWidth : width,
          lastHeight: height === 0 ? clientHeight : height,
        }));
      }, 300);

      window.addEventListener('resize', saveDimensions);

      saveDimensions();
      return () => {
        window.removeEventListener('resize', saveDimensions);
      };
    }
  }, [isLive, elementRef]);

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

  return { dimensions, checkDimensions, setElement };
};

export default useDimensions;
