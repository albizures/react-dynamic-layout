import React from 'react';

/**
 * @typedef {import('../store/containers').ContainersState} ContainersState
 */

/**
 * @typedef {RootLayoutContext}
 * @property {Function} onAddResizeListener
 * @property {Function[]} resizeListeners
 */
const RootLayoutContext = React.createContext();

export default RootLayoutContext;
