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
 * @param {RefObject<HTMLElement>} elementRef
 * @param {boolean} required
 * @returns {UseDimensions}
 */
const useDimensions = (elementRef, required = true) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    lastWidth: 0,
    lastHeight: 0,
  });

  const checkDimensions = useCallback(() => {
    const { current: element } = elementRef;
    const { clientWidth: width, clientHeight: height } = element;
    if (dimensions.width !== width || dimensions.height !== height) {
      setDimensions((dimensions) => ({
        width,
        height,
        lastWidth: dimensions.width,
        lastHeight: dimensions.height,
      }));
    }
  }, [dimensions, elementRef]);

  useLayoutEffect(() => {
    const { current: element } = elementRef;
    if (required) {
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
  }, [required, elementRef]);

  return { dimensions, checkDimensions };
};

export default useDimensions;
