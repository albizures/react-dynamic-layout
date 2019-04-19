import { useLayoutEffect, useState } from 'react';

import { debounce } from '../utils';

/**
 * @typedef {object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} lastWidth
 * @property {number} lastHeight
 */

/**
 *
 * @param {RefObject<HTMLElement>} elementRef
 * @param {boolean} required
 * @returns {Dimensions}
 */
const useDimensions = (elementRef, required = true) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    lastWidth: 0,
    lastHeight: 0,
  });

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

  return dimensions;
};

export default useDimensions;
