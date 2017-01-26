import React from 'react';
import { NumberOrString, StringOrFunc } from './types';

const obj = {};

obj.displayName = 'Float';

obj.propTypes = {
  x: NumberOrString.isRequired,
  y: NumberOrString.isRequired,
  width: NumberOrString.isRequired,
  height: NumberOrString.isRequired,
  resize: React.PropTypes.bool,
  open: React.PropTypes.bool,
  id: StringOrFunc
};

obj.getDefaultProps = () => ({
  resize: true,
  open: true
});

obj.render = function render() {
  return <div></div>;
};

export default React.createClass(obj);
