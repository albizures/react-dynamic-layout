
import store from './index';
import { push } from '../utils/store';
import {
  LAYOUTS,
  COMPONENTS,
  CONTAINERS,
  FLOATS,
  ADD,
  REMOVE_CHILD,
  UPDATE
} from '../types';

export function addLayout(layout) {
  const id = store.getState().layouts.length;
  store.dispatch({
    layout,
    type: LAYOUTS,
    name: ADD
  });
  return id;
}

export function addContainer(container) {
  const id = store.getState().containers.length;
  store.dispatch({
    container,
    type: CONTAINERS,
    name: ADD
  });
  return id;
}

export function addFloat(float) {
  const id = store.getState().floats.length;
  store.dispatch({
    float,
    type: FLOATS,
    name: ADD
  });
  return id;
}

export function addComponent(component) {
  const id = store.getState().components.length;
  store.dispatch({
    component,
    type: COMPONENTS,
    name: ADD
  });
  return id;
}

export function addContainerChild(container, component) {
  store.dispatch({
    container,
    data: { components: store.getContainer(container).components.concat(component) },
    type: CONTAINERS,
    name: UPDATE
  });
}

export function addLayoutContainer(layout, container) {
  store.dispatch({
    layout,
    data: {
      containers: push(
        store.getLayout(layout).containers,
        container
      )
    },
    container,
    type: LAYOUTS,
    name: UPDATE
  });
}

export function addLayoutFloat(layout, float) {
  store.dispatch({
    layout,
    data: {
      floats: push(
        store.getLayout(layout).floats,
        float
      )
    },
    type: LAYOUTS,
    name: UPDATE
  });
}

export function removeContainerChild(container, component) {
  store.dispatch({
    container,
    component,
    type: CONTAINERS,
    name: REMOVE_CHILD
  });
}

export function removeLayoutChild(layout, container) {
  store.dispatch({
    layout,
    container,
    type: LAYOUTS,
    name: REMOVE_CHILD
  });
}

export function updateContainer(container, data, event) {
  store.dispatch({
    container,
    data,
    type: CONTAINERS,
    name: UPDATE
  }, event);
}


export function updateLayout(layout, data) {
  store.dispatch({
    layout,
    data,
    type: LAYOUTS,
    name: UPDATE
  });
}

export function updateFloat(float, data) {
  store.dispatch({
    float,
    data,
    type: FLOATS,
    name: UPDATE
  });
}
