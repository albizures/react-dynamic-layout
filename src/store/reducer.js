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
  UPDATE_COMPONENT
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

function commonReducer(state, { type, payload }) {
  switch (type) {
    case ADD_LAYOUT:
    case ADD_CONTAINER:
    case ADD_FLOAT:
    case ADD_COMPONENT:
      return add(state, payload);
    case REMOVE_LAYOUT:
    case REMOVE_CONTAINER:
    case REMOVE_FLOAT:
    case REMOVE_COMPONENT:
      return remove(state, payload);
    case UPDATE_LAYOUT:
    case UPDATE_CONTAINER:
    case UPDATE_FLOAT:
    case UPDATE_COMPONENT:
      return update(state, payload);
    default:
      return state;
  }
}

export function layoutReducer(state, action) {
  const common = commonReducer(state, action);
  if (common !== state) return common;

  const { type, payload } = action;
  switch (type) {
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

export function containerReducer(state, action) {
  const common = commonReducer(state, action);
  if (common !== state) return common;

  const { type, payload } = action;
  switch (type) {
    case ADD_CONTAINER_CHILD:
      return addChild(state, payload, 'components');
    case REMOVE_CONTAINER_CHILD:
      return removeChild(state, payload, 'components');
    default:
      return state;
  }
}
export function floatReducer(state, action) {
  return commonReducer(state, action);
}

export function reducerComponents(state, action) {
  return commonReducer(state, action);
}

export default (state, action) => ({
  layouts: layoutReducer(state.layouts, action),
  containers: containerReducer(state.containers, action),
  floats: floatReducer(state.floats, action),
  components: reducerComponents(state.components, action)
});
