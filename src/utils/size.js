// @ts-check

import { layoutTypes } from './enums';

/**
 * @typedef {(string|number)} Size
 */

/**
 *
 * @param {Size} size
 * @returns {boolean}
 */
export const isFloat = (size) => Number(size) === size && size % 1 !== 0;

/**
 *
 * @param {Size} size
 * @returns {size is number}
 */
const isPixel = (size) => typeof size === 'number';

/**
 *
 * @param {string} size
 * @returns {number}
 */
const percentagetoNumber = (size) => Number(size.substring(0, size.length - 1));

/**
 *
 * @param {string} size
 * @returns {boolean}
 */
function isPercentage(size) {
  const hasPercentageSymbol = size[size.length - 1] === '%';
  if (hasPercentageSymbol) {
    return !Number.isNaN(percentagetoNumber(size));
  }

  return false;
}

/**
 *
 * @param {number} px
 * @param {number} totalSize
 * @returns {number}
 */
export const pixelToPercentage = (px, totalSize) => (px * 100) / totalSize;

/**
 * @typedef {Object} SizeDescriptor
 * @property {number} px
 * @property {boolean} isVariable
 */

/**
 *
 * @param {Size} size
 * @param {number} totalSize
 * @param {boolean} isFixedSize
 * @returns {SizeDescriptor}
 */
export function parseSize(size, totalSize, isFixedSize) {
  // NOTE: a interger is interpreted as a percentage
  // 100 == '100%'
  const isVariable = !isFixedSize;

  if (!size) {
    return {
      px: null,
      isVariable,
    };
  }

  if (isPixel(size)) {
    return {
      px: size,
      isVariable,
    };
  }

  if (isPercentage(size)) {
    const percentage = percentagetoNumber(size);
    return {
      px: (totalSize * percentage) / 100,
      isVariable,
    };
  }

  throw new Error(`Incorrect size: '${size}'`);
}

export const getDiff = (actualSize, newSize) => ({
  width: newSize.width - actualSize.width,
  height: newSize.height - actualSize.height,
});

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

// export const getDiff = (actualSize, newSize) => ({
//   width: actualSize.width - newSize.width,
//   height: actualSize.height - newSize.height
// });

export const getPercent = (partSize, totalSize) => ({
  width: (partSize.width * 100) / totalSize.width / 100,
  height: (partSize.height * 100) / totalSize.height / 100,
});
