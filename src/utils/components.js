
import React from 'react';
import RDLayout from '../RDLayout';
import RDContainer from '../RDContainer';
import Float from '../Float';
import { COLUMN, ROW } from '../types';
import { Register, components, register } from '../Register';
import {
  addLayout,
  addComponent,
  addContainer,
  addFloat,
  addContainerChild,
  addLayoutFloat,
  addLayoutContainer
} from '../store/actions';

function checkComponentLayout(component) {
  const layout = processLayout(
    component.props.name || 'Layout',
    component.props.children,
    component.props.type,
    component.props.hiddenType,
    component.props.resize
  );
  return addComponent({
    isLayout: true,
    name: component.props.name || component.type.displayName,
    layout
  });
}

function checkComponent(component) {
  const type = component.props.type;
  if (!components[type.displayName]) {
    register(type);
  }
  return addComponent({
    componentName: type.displayName,
    name: component.props.name || type.displayName,
    props: component.props.props
  });
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


function checkContainer(container) {
  const id = addContainer({
    size: container.props.size,
    tabs: container.props.tabs
  });
  if (!container.props || !container.props.children) {
    return id;
  }
  React.Children.forEach(
    container.props.children,
    child => addContainerChild(
      id,
      checkContainerChild(child, id)
    )
  );
  return id;
}

function checkLayoutChild(child, layout) {
  if (child.type === RDContainer) {
    return addLayoutContainer(
      layout,
      checkContainer(child, layout)
    );
  }
  if (child.type === Float) {
    return addLayoutFloat(
      layout,
      addFloat(layout)
    );
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

function processLayout(name, children, type = COLUMN, hiddenType, resize) {
  const id = addLayout({
    type,
    name,
    hiddenType,
    resize
  });
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
