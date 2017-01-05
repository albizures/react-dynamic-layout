import { updateArrayItem, removeArrayItem } from '../utils/store';
import {
  LAYOUTS,
  COMPONENTS,
  CONTAINERS,
  FLOATS,
  ADD,
  ADD_CHILD,
  REMOVE_CHILD,
  UPDATE
} from '../types';

const { assign } = Object;

function reducerLayouts(state, { name, ...action }) {
  switch (name) {
    case ADD:
      return state.concat(
        assign({ containers: [], floats: [] }, action.layout, { id: state.length })
      );
    case UPDATE:
      return updateArrayItem(
        state,
        action.layout,
        assign({}, state[action.layout], action.data)
      );
    case ADD_CHILD:
      return updateArrayItem(
        state,
        action.layout,
        assign({}, state[action.layout], {
          containers: state[action.layout].concat(action.container)
        })
      );
    case REMOVE_CHILD:
      return updateArrayItem(
        state,
        action.layout,
        assign({}, state[action.layout], {
          containers: removeArrayItem(state[action.layout].indexOf(action.container))
        })
      );
    default:
      return state;
  }
}

function reducerContainers(state, { name, ...action }) {
  switch (name) {
    case ADD:
      return state.concat(
        assign({ components: [] }, action.container, { id: state.length })
      );
    case UPDATE:
      return updateArrayItem(
        state,
        action.container,
        assign({}, state[action.container], action.data)
      );
    case ADD_CHILD:
      return updateArrayItem(
        state,
        action.container,
        assign({}, state[action.container], {
          components: state[action.container].concat(action.component)
        })
      );
    case REMOVE_CHILD:
      return updateArrayItem(
        state,
        action.container,
        assign({}, state[action.container], {
          components: removeArrayItem(state[action.container].indexOf(action.component))
        })
      );
    default:
      return state;
  }
}

function reducerFloats(state, { name, ...action }) {
  switch (name) {
    case ADD:
      return state.concat(
        assign({}, action.floats, { id: state.length })
      );
    case UPDATE:
      return updateArrayItem(
        state,
        action.float,
        assign({}, state[action.float], action.data)
      );
    default:
      return state;
  }
}

function reducerComponents(state, { name, ...action }) {
  switch (name) {
    case ADD:
      return state.concat(
        assign({}, action.component, { id: state.length })
      );
    case UPDATE:
      return updateArrayItem(
        state,
        action.component,
        assign({}, state[action.component], action.data)
      );
    default:
      return state;
  }
}

export default function reducer({ layouts, containers, floats, components }, { type, ...action }) {
  switch (type) {
    case LAYOUTS:
      return {
        layouts: reducerLayouts(layouts, action),
        containers,
        floats,
        components
      };
    case CONTAINERS:
      return {
        layouts,
        containers: reducerContainers(containers, action),
        floats,
        components
      };
    case FLOATS:
      return {
        layouts,
        containers,
        floats: reducerFloats(floats, action),
        components
      };
    case COMPONENTS:
      return {
        layouts,
        containers,
        floats,
        components: reducerComponents(components, action)
      };
    default:
      return { layouts, containers, components, floats };
  }
}

