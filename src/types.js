import PropTypes from 'prop-types';

export const ROW = 'row';
export const STACK = 'stack';
export const COLUMN = 'column';

export const Z_INDEX = 'zIndex';
export const OPACITY = 'opacity';
export const DISPLAY = 'display';
export const RENDER = 'render';

export const NumberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export const StringOrFunc = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string
]);
