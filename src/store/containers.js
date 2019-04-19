const INIT = 'INIT';
const CHANGE_SIZE = 'CHANGE_SIZE';
const RESIZE = 'RESIZE';

const { assign, keys } = Object;
/**
 * @typedef {import('../utils/size').SizeDescriptor} SizeDescriptor
 */

/**
 * @typedef {object} Container
 * @property {number} children
 * @property {SizeDescriptor} size
 */

/**
 * @typedef {object} Container
 * @property {number} children
 * @property {SizeDescriptor} size
 */

/**
 * @typedef {object.<(string|numeber), Container>} MapContainers
 */

/**
 * @typedef {Object} ContainersState
 * @property {MapContainers} map
 * @property {string[]} [keyList]
 * @property {string[]} [variableSizes]
 */

/**
 * @typedef {Object} Action
 * @property {ContainersState} payload
 * @property {string} action
 */
/**
 *
 * @param {ContainersState} state
 * @return {ContainersState}
 */
const resize = (state, diff) => {
  const diffByElement = diff / state.variableSizes.length;

  const map = state.variableSizes.reduce((map, key) => {
    map[key].size.px = map[key].size.px + diffByElement;

    return map;
  }, state.map);

  return {
    map,
    keyList: state.keyList,
    variableSizes: state.variableSizes,
  };
};

/**
 *
 * @param {ContainersState} state
 * @param {Action} action
 * @returns {ContainersState}
 */
export const reducer = (state, action) => {
  const { payload, type } = action;
  const { map, keyList } = state;

  if (Array.isArray(action)) {
    return action.reduce((state, action) => reducer(state, action), state);
  }

  switch (type) {
    case INIT: {
      return {
        map: payload.map,
        variableSizes: payload.variableSizes,
        keyList: keys(payload.map),
      };
    }
    case RESIZE: {
      return resize(state, payload);
    }
    case CHANGE_SIZE: {
      const currentContainer = map[payload.key];
      const { size: orinalSize, children } = currentContainer;
      return {
        map: assign({}, map, {
          [payload.key]: {
            children,
            size: assign({}, orinalSize, { px: payload.size }),
          },
        }),
        keyList,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  /**
   *
   * @param {ContainersState} payload
   * @returns {Action}
   */
  init(payload) {
    return {
      type: INIT,
      payload,
    };
  },

  /**
   *
   * @param {(string|number)} key
   * @param {number} size
   * @returns {Action}
   */
  changeSize(key, size) {
    return {
      type: CHANGE_SIZE,
      payload: {
        key,
        size,
      },
    };
  },

  /**
   *
   * @param {Action[]} actions
   * @returns {Action[]}
   */
  batch(actions) {
    return actions;
  },

  /**
   *
   * @param {number} diff
   * @returns {Action}
   */
  resize(diff) {
    return {
      type: RESIZE,
      payload: diff,
    };
  },
};
