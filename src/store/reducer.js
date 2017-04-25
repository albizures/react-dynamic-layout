import { removeArrayItem, push } from '../utils/store';
import {
  ADD_LAYOUT,
  UPDATE_LAYOUT,
  REMOVE_LAYOUT,
  ADD_LAYOUT_CONTAINER,
  REMOVE_LAYOUT_CONTAINER,
  ADD_LAYOUT_FLOAT,
  REMOVE_LAYOUT_FLOAT,
  ADD_CONTAINER,
  REMOVE_CONTAINER,
  UPDATE_CONTAINER,
  ADD_CONTAINER_CHILD,
  REMOVE_CONTAINER_CHILD,
  ADD_FLOAT,
  REMOVE_FLOAT,
  UPDATE_FLOAT,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT,
  UPDATE_COMPONENT_PROPS
} from './actions';

export const add = (state, payload) => ({
  ...state,
  [payload.id]: payload
});

export const update = (state, payload) => ({
  ...state,
  [payload.id]: {
    ...state[payload.id],
    ...payload
  }
});

export const remove = (state, payload) => {
  const newState = {
    ...state
  };
  delete newState[payload];
  return newState;
};

export const removeChild = (state, payload, prop, child = 'child') => {
  const item = state[payload.id];
  return {
    ...state,
    [payload.id]: {
      ...item,
      [prop]: removeArrayItem(item[prop], item[prop].indexOf(payload[child]))
    }
  };
};

export const addChild = (state, payload, prop, child = 'child') => {
  const item = state[payload.id];
  return {
    ...state,
    [payload.id]: {
      ...item,
      [prop]: push(item[prop], payload[child])
    }
  };
};

export function layoutReducer(state, { type, payload }) {
  switch (type) {
    case ADD_LAYOUT:
      return add(state, payload);
    case REMOVE_LAYOUT:
      return remove(state, payload);
    case UPDATE_LAYOUT:
      return update(state, payload);
    case ADD_LAYOUT_CONTAINER:
      return addChild(state, payload, 'containers');
    case REMOVE_LAYOUT_CONTAINER:
      return removeChild(state, payload, 'containers');
    case ADD_LAYOUT_FLOAT:
      return addChild(state, payload, 'floats');
    case REMOVE_LAYOUT_FLOAT:
      return removeChild(state, payload, 'floats');
    default:
      return state;
  }
}

export function containerReducer(state, { type, payload }) {
  switch (type) {
    case ADD_CONTAINER:
      return add(state, payload);
    case REMOVE_CONTAINER:
      return remove(state, payload);
    case UPDATE_CONTAINER:
      return update(state, payload);
    case ADD_CONTAINER_CHILD:
      return addChild(state, payload, 'components');
    case REMOVE_CONTAINER_CHILD:
      return removeChild(state, payload, 'components');
    default:
      return state;
  }
}
export function floatReducer(state, { type, payload }) {
  switch (type) {
    case ADD_FLOAT:
      return add(state, payload);
    case REMOVE_FLOAT:
      return remove(state, payload);
    case UPDATE_FLOAT:
      return update(state, payload);
    default:
      return state;
  }
}

export function reducerComponents(state, { type, payload }) {
  switch (type) {
    case ADD_COMPONENT:
      return add(state, payload);
    case REMOVE_COMPONENT:
      return remove(state, payload);
    case UPDATE_COMPONENT:
      return update(state, payload);
    case UPDATE_COMPONENT_PROPS:
      return update(state, {
        id: payload.id,
        props: {
          ...state[payload.id].props,
          ...payload.props
        }
      });
    default:
      return state;
  }
}

export default (state, action) => ({
  layouts: layoutReducer(state.layouts, action),
  containers: containerReducer(state.containers, action),
  floats: floatReducer(state.floats, action),
  components: reducerComponents(state.components, action)
});
