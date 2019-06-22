// @ts-check
import React from 'react';

/**
 * @typedef {import('../hooks/useDimensions').Dimensions} Dimensions
 * @typedef {import('../utils/events').EventSystem} EventSystem
 */

/**
 * @typedef EventSystemRef
 * @property {EventSystem} current
 */
/**
 * @typedef variableContainersRef
 * @property {array} current
 */

/**
 * @typedef {object} LayoutContextType
 * @property {Dimensions} dimensions
 * @property {string} [type]
 * @property {boolean} isRoot
 * @property {EventSystemRef} [layoutEventsRef]
 * @property {EventSystemRef} [containersEventsRef]
 * @property {variableContainersRef} [variableContainersRef]
 */

/** @type {LayoutContextType} */
const initialValue = {
  dimensions: {
    width: 0,
    height: 0,
    lastWidth: 0,
    lastHeight: 0,
  },
  isRoot: true,
};

const LayoutContext = React.createContext(initialValue);

export default LayoutContext;
