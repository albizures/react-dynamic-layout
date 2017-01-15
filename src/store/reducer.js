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

const add = (state, payload) => ({
  ...state,
  [payload.id]: payload
});

const update = (state, payload) => ({
  ...state,
  [payload.id]: {
    ...state[payload.id],
    ...payload
  }
});

const remove = (state, payload) => {
  const newState = {
    ...state
  };
  delete newState[payload];
  return newState;
};

const removeChild = (state, payload, prop) => {
  const item = state[payload.id];
  return {
    ...state,
    [item.id]: {
      ...item,
      [prop]: removeArrayItem(item[prop], item.indexOf(payload.child))
    }
  };
};

const addChild = (state, payload, prop) => {
  const item = state[payload.id];
  return {
    ...state,
    [item.id]: {
      ...item,
      [prop]: push(item[prop], payload.child)
    }
  };
};

function reducerCommon(state, { type, payload }) {
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

function reducerLayouts(state, action) {
  const common = reducerCommon(state, action);
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

function reducerContainers(state, action) {
  const common = reducerCommon(state, action);
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
function reducerFloats(state, action) {
  return reducerCommon(state, action);
}

function reducerComponents(state, action) {
  return reducerCommon(state, action);
}

export default (state, action) => ({
  layouts: reducerLayouts(state.layouts, action),
  containers: reducerContainers(state.containers, action),
  floats: reducerFloats(state.floats, action),
  components: reducerComponents(state.components, action)
});
