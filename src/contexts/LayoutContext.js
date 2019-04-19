import React from 'react';

/**
 * @typedef {import('../store/containers').ContainersState} ContainersState
 */

/**
 * @typedef {LayoutContext}
 * @property {ContainersState} [containers]
 * @property {Function[]} resizeListeners
 * @property {string} [type]
 */
const LayoutContext = React.createContext({
  // eslint-disable-next-line no-unused-vars
  addResizeListeners(listener) {
    window.console.error('Invalid context usage of root layout');
  },
  // eslint-disable-next-line no-unused-vars
  removeResizeListener(listener) {
    window.console.error('Invalid context usage of root layout');
  },
  fireResizeEvent() {
    window.console.error('Invalid context usage of root layout');
  },

  isRoot: true,
});

export default LayoutContext;
