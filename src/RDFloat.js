import React from 'react';

import { NumberOrString } from './types';

const obj = {};

obj.displayName = 'Float';

obj.propTypes = {
  x: NumberOrString.isRequired,
  y: NumberOrString.isRequired,
  width: NumberOrString.isRequired,
  height: NumberOrString.isRequired,
  resize: React.PropTypes.bool
};

obj.getDefaultProps = () => ({
  resize: true
});

obj.render = function render() {
  return <div></div>;
};

export default React.createClass(obj);
