import React from 'react';

export const ROW = 'row';
export const STACK = 'stack';
export const COLUMN = 'column';

export const Z_INDEX = 'zIndex';
export const OPACITY = 'opacity';
export const DISPLAY = 'diplay';

export const LAYOUTS = 'LAYOUTS';
export const STACKS = 'STAKS';
export const CONTAINERS = 'CONTAINERS';
export const FLOATS = 'FLOATS';
export const COMPONENTS = 'COMPONENTS';


export const ADD = 'ADD';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const UPDATE = 'UPDATE';

export const NumberOrString = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]);
