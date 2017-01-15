
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
  addLayoutContainer
} = actions;


function checkComponentLayout(component) {
  const layout = processLayout(
    component.props.name || 'Layout',
    component.props.children,
    component.props.type,
    component.props.hiddenType,
    component.props.resize
  );
  const id = cuid();
  store.dispatch(addComponent({
    id,
    isLayout: true,
    name: component.props.name || component.type.displayName,
    layout
  }));
  return id;
}

function checkComponent(component) {
  const type = component.props.type;
  if (!components[type.displayName]) {
    register(type);
  }
  const id = cuid();
  store.dispatch(addComponent({
    id,
    componentName: type.displayName,
    name: component.props.name || type.displayName,
    props: component.props.props
  }));
  return id;
}

function checkContainerChild(component) {
  if (component.type === RDLayout) {
    return checkComponentLayout(component);
  }
  if (component.type === Register) {
    return checkComponent(component);
  }
  throw useComponent();
}

function useComponent() {
  return new Error('Use component `Register`');
}

function invalidChildrenError() {
  return new Error('Invalid prop `children` supplied to `Layout`. Validation failed.');
}

function invalidFloatChildrenError() {
  return new Error('Invalid prop `children` supplied to `Float`. It must be only a Layout.');
}


function checkContainer({ props }) {
  const id = cuid();
  store.dispatch(addContainer({
    id,
    size: props.size,
    tabs: props.tabs
  }));
  if (!props || !props.children) {
    return id;
  }
  React.Children.forEach(
    props.children,
    child => store.dispatch(addContainerChild(
      id,
      checkContainerChild(child, id)
    ))
  );
  return id;
}
function checkFloat(float) {
  const layout = float.props.children;
  if (React.Children.count(layout) !== 1) {
    return invalidFloatChildrenError();
  }
  const id = cuid();
  store.dispatch(addFloat({
    id,
    width: float.props.width,
    height: float.props.height,
    x: float.props.x,
    y: float.props.y,
    layout: processLayout(
      layout.props.name || 'Layout',
      layout.props.children,
      layout.props.type,
      layout.props.hiddenType,
      layout.props.resize
    )
  }));
  return id;
}

function checkLayoutChild(child, layout) {
  if (child.type === RDContainer) {
    return store.dispatch(addLayoutContainer(
      layout,
      checkContainer(child, layout)
    ));
  }
  if (child.type === RDFloat) {
    return store.dispatch(addLayoutFloat(
      layout,
      checkFloat(child)
    ));
  }
  throw invalidChildrenError();
}

function checkLayoutChildren(children, layout) {
  if (!children) {
    return;
  }
  React.Children.forEach(
    children,
    child => checkLayoutChild(child, layout)
  );
}

function processLayout({ name, children, type = COLUMN, hiddenType, resize }) {
  const id = cuid();
  store.dispatch(addLayout({
    id,
    type,
    name,
    hiddenType,
    resize
  }));
  checkLayoutChildren(children, id);
  return id;
}

function checkParentElement(element) {
  const { position, width, height } = window.getComputedStyle(element.parentElement);
  if (position !== 'absolute' && position !== 'relative') {
    throw new Error('parentElement isn\'t `relative` or `absolute`');
  }
  if (parseInt(width, 10) < 10 || parseInt(height, 10) < 10) {
    console.warn('width or height is very small');
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
    portion
  };
}

export {
  getSizeProperties,
  checkParentElement,
  processLayout,
  checkComponent,
  checkLayoutChildren,
  checkLayoutChild
};
