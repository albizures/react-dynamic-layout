import React from 'react';

export const ROW = 'row';
export const STACK = 'stack';
export const COLUMN = 'column';

export const Z_INDEX = 'zIndex';
export const OPACITY = 'opacity';
export const DISPLAY = 'display';
export const RENDER = 'render';

export const NumberOrString = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]);

export const StringOrFunc = React.PropTypes.oneOfType([
  React.PropTypes.func,
  React.PropTypes.string
]);
