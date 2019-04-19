import React from 'react';
import RDLayout from '../RDLayout';
import RDContainer from '../RDContainer';
import RDFloat from '../RDFloat';
import { COLUMN, ROW } from '../types';
import { Register, components, register } from '../Register';
import store, { actions } from '../store';
import cuid from './cuid';

const {
  addLayout,
  addComponent,
  addContainer,
  addFloat,
  addContainerChild,
  addLayoutFloat,
  addLayoutContainer,
} = actions;

function isFunc(fn) {
  return typeof fn === 'function';
}

function checkId(id) {
  if (isFunc(id)) {
    return cuid(id);
  }
  if (typeof id === 'string') {
    return id;
  }
  return cuid();
}

function checkComponentLayout({ props, type }) {
  const layout = processLayout({
    id: props.id,
    name: props.name || 'Layout',
    children: props.children,
    type: props.type,
    hiddenType: props.hiddenType,
    resize: props.resize,
  });
  const id = cuid();
  store.dispatch(
    addComponent({
      id,
      isLayout: true,
      name: props.name || type.displayName,
      layout,
    }),
  );
  return id;
}

function checkComponent({ props }) {
  const { type } = props;

  const name = type.displayName || type.name || props.name;
  if (!components[name]) {
    register(type, name);
  }
  const id = checkId(props.id);
  store.dispatch(
    addComponent({
      id,
      componentName: type.displayName || name,
      name: name || type.displayName,
      props: props.props,
    }),
  );
  return id;
}

function checkContainerChild(component) {
  if (component.type === RDLayout) {
    return checkComponentLayout(component);
  }
  if (component.type === Register) {
    return checkComponent(component);
  }

  throw createUseComponentError();
}

function createUseComponentError() {
  return new Error('Use component `Register`');
}

function invalidChildrenError() {
  return new Error(
    'Invalid prop `children` supplied to `Layout`. Validation failed.',
  );
}

function invalidFloatChildrenError() {
  return new Error(
    'Invalid prop `children` supplied to `Float`. It must be only a Layout.',
  );
}

function checkContainer({ props }) {
  const id = checkId(props.id);
  store.dispatch(
    addContainer({
      id,
      size: props.size,
      tabs: props.tabs,
    }),
  );
  if (!props || !props.children) {
    return id;
  }

  const eachChild = (child) =>
    store.dispatch(addContainerChild(id, checkContainerChild(child, id)));

  if (Array.isArray(props.children)) {
    props.children.forEach(eachChild);
  } else {
    React.Children.forEach(props.children, eachChild);
  }

  return id;
}
function checkFloat({ props }) {
  const layout = props.children;
  if (React.Children.count(layout) !== 1) {
    return invalidFloatChildrenError();
  }
  const id = checkId(props.id);
  store.dispatch(
    addFloat({
      id,
      open: props.open,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
      layout: processLayout({
        id: layout.props.id,
        name: layout.props.name || 'Layout',
        children: layout.props.children,
        type: layout.props.type,
        hiddenType: layout.props.hiddenType,
        resize: layout.props.resize,
      }),
    }),
  );
  return id;
}

function checkLayoutChild(child, layout) {
  if (child.type === RDContainer) {
    return store.dispatch(addLayoutContainer(layout, checkContainer(child)));
  }
  if (child.type === RDFloat) {
    return store.dispatch(addLayoutFloat(layout, checkFloat(child)));
  }
  throw invalidChildrenError();
}

function checkLayoutChildren(children, layout) {
  if (!children) {
    return;
  }

  const eachChild = (child) => checkLayoutChild(child, layout);

  if (Array.isArray(children)) {
    children.forEach(eachChild);
  } else {
    React.Children.forEach(children, eachChild);
  }
}

function processLayout({
  id,
  name,
  children,
  type = COLUMN,
  hiddenType,
  resize,
}) {
  id = checkId(id);
  store.dispatch(
    addLayout({
      id,
      type,
      name,
      hiddenType,
      resize,
    }),
  );
  checkLayoutChildren(children, id);
  return id;
}

function checkParentElement(element) {
  const { position, width, height } = window.getComputedStyle(
    element.parentElement,
  );

  if (position !== 'absolute' && position !== 'relative') {
    throw new Error("parentElement isn't `relative` or `absolute`");
  }
  if (parseInt(width, 10) < 10 || parseInt(height, 10) < 10) {
    // eslint-disable-next-line
    console.warn('width or height is top small');
  }
}

function getSizeProperties(type) {
  let total = 'height';
  let portion = 'width';

  if (type === COLUMN) {
    total = 'height';
    portion = 'width';
  } else if (type === ROW) {
    total = 'width';
    portion = 'height';
  }
  return {
    total,
    portion,
  };
}

export {
  getSizeProperties,
  checkParentElement,
  processLayout,
  checkComponent,
  checkLayoutChildren,
  checkLayoutChild,
};
