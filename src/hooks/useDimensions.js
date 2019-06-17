// @ts-check
import { useLayoutEffect, useState, useCallback } from 'react';

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

  const { width: currentWidth, height: currentHeight } = dimensions;

  const checkDimensions = useCallback(() => {
    const { current: element } = elementRef;
    const { clientWidth: width, clientHeight: height } = element;
    if (currentWidth !== width || currentHeight !== height) {
      setDimensions((dimensions) => ({
        width,
        height,
        lastWidth: dimensions.width,
        lastHeight: dimensions.height,
      }));
    }
  }, [currentWidth, currentHeight, elementRef]);

  useLayoutEffect(() => {
    const { current: element } = elementRef;
    if (isLive) {
      const saveDimensions = debounce(() => {
        setDimensions((dimensions) => ({
          width: element.clientWidth,
          height: element.clientHeight,
          lastWidth: dimensions.width,
          lastHeight: dimensions.height,
        }));
      }, 300);

      window.addEventListener('resize', saveDimensions);

      saveDimensions();
      return () => {
        window.removeEventListener('resize', saveDimensions);
      };
    }
  }, [isLive, elementRef]);

  return { dimensions, checkDimensions };
};

export default useDimensions;
