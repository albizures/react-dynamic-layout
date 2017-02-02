
import cuid from '../utils/cuid';

export const ADD_LAYOUT = 'ADD_LAYOUT';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const REMOVE_LAYOUT = 'REMOVE_LAYOUT';
export const ADD_LAYOUT_CONTAINER = 'ADD_LAYOUT_CONTAINER';
export const REMOVE_LAYOUT_CONTAINER = 'REMOVE_LAYOUT_CONTAINER';
export const ADD_LAYOUT_FLOAT = 'ADD_LAYOUT_FLOAT';
export const REMOVE_LAYOUT_FLOAT = 'REMOVE_LAYOUT_FLOAT';

export const ADD_CONTAINER = 'ADD_CONTAINER';
export const REMOVE_CONTAINER = 'REMOVE_CONTAINER';
export const UPDATE_CONTAINER = 'UPDATE_CONTAINER';
export const ADD_CONTAINER_CHILD = 'ADD_CONTAINER_CHILD';
export const REMOVE_CONTAINER_CHILD = 'REMOVE_CONTAINER_CHILD';

export const ADD_FLOAT = 'ADD_FLOAT';
export const REMOVE_FLOAT = 'REMOVE_FLOAT';
export const UPDATE_FLOAT = 'UPDATE_FLOAT';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

export const addLayout = ({
  id = cuid(),
  containers = [],
  floats = [],
  type,
  name,
  hiddenType,
  resize
}) => ({
  type: ADD_LAYOUT,
  payload: { id, type, name, hiddenType, resize, containers, floats }
});

export const addContainer = ({
  id = cuid(),
  components = [],
  size,
  tabs
}) => ({
  type: ADD_CONTAINER,
  payload: { id, size, tabs, components }
});

export const addFloat = ({
  id = cuid(),
  width,
  height,
  x,
  y,
  open,
  layout
}) => ({
  type: ADD_FLOAT,
  payload: { id, width, height, x, y, layout, open }
});

export const addComponent = ({
  id = cuid(),
  isLayout,
  name,
  layout,
  componentName,
  props
}) => ({
  type: ADD_COMPONENT,
  payload: { id, isLayout, name, layout, componentName, props }
});

export const addContainerChild = (id, child) => ({
  type: ADD_CONTAINER_CHILD,
  payload: { id, child }
});

export const addLayoutContainer = (id, child) => ({
  type: ADD_LAYOUT_CONTAINER,
  payload: { id, child }
});

export const addLayoutFloat = (id, child) => ({
  type: ADD_LAYOUT_FLOAT,
  payload: { id, child }
});

export const removeContainerChild = (id, child) => ({
  type: REMOVE_CONTAINER_CHILD,
  payload: { id, child }
});

export const removeLayoutContainer = (id, child) => ({
  type: REMOVE_LAYOUT_CONTAINER,
  payload: { id, child }
});

export const removeLayoutFloat = (id, child) => ({
  type: REMOVE_LAYOUT_FLOAT,
  payload: { id, child }
});

export const updateContainer = (id, container) => ({
  type: UPDATE_CONTAINER,
  payload: { ...container, id }
});

export const updateLayout = (id, layout) => ({
  type: UPDATE_LAYOUT,
  payload: { ...layout, id }
});

export const updateFloat = (id, float) => ({
  type: UPDATE_FLOAT,
  payload: { ...float, id }
});

export const updateComponent = (id, component) => ({
  type: UPDATE_COMPONENT,
  payload: { ...component, id }
});

export const updateComponentProps = (id, props) => ({
  type: UPDATE_COMPONENT,
  payload: { props, id }
});

export const removeLayout = id => ({
  type: REMOVE_LAYOUT,
  payload: id
});

export const removeContainer = id => ({
  type: REMOVE_CONTAINER,
  payload: id
});

export const removeFloat = id => ({
  type: REMOVE_FLOAT,
  payload: id
});

export const removeComponent = id => ({
  type: REMOVE_COMPONENT,
  payload: id
});

export const closeFloat = id => ({
  type: UPDATE_FLOAT,
  payload: { id, open: false }
});

export const openFloat = id => ({
  type: UPDATE_FLOAT,
  payload: { id, open: true }
});
