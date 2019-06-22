// @ts-check

import { layoutTypes } from './enums';

/**
 * @typedef {import('../hooks/useDimensions').Dimensions} Dimensions
 */

/**
 * @typedef {Object} SizeDescriptor
 * @property {number} px
 * @property {boolean} isVariable
 */

/**
 * @typedef {Object} SizeProperty
 * @property {string} portion
 * @property {string} total
 */

/**
 *
 * @param {string} type
 * @returns {SizeProperty}
 */
export const getSizeProperty = (type) => {
  if (type === layoutTypes.ROW) {
    return { portion: 'width', total: 'height' };
  }

  return { portion: 'height', total: 'width' };
};

/**
 *
 * @param {Dimensions} dimensions
 * @returns {boolean}
 */
export const dimensionsAreZero = (dimensions) =>
  dimensions.height === 0 && dimensions.width === 0;
