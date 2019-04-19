import { useLayoutEffect, useState, useRef, useEffect } from 'react';

import { debounce } from '../utils';

/**
 * @typedef {object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} lastWidth
 * @property {number} lastHeight
 */

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
  });
  const { width, height } = dimensions;
  const lastDimensions = usePrevious({
    lastWidth: width,
    lastHeight: height,
  });

  useLayoutEffect(() => {
    const { current: element } = elementRef;
    if (required) {
      const saveDimensions = debounce(() => {
        setDimensions({
          width: element.clientWidth,
          height: element.clientHeight,
        });
      }, 300);

      window.addEventListener('resize', saveDimensions);

      saveDimensions();
      return () => {
        window.removeEventListener('resize', saveDimensions);
      };
    }
  }, [required, elementRef]);

  return Object.assign({}, dimensions, lastDimensions);
};

export default useDimensions;
