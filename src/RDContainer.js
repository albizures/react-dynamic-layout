import React from 'react';
import PropTypes from 'prop-types';
import { NumberOrString, StringOrFunc } from './types';

const obj = {};

obj.displayName = 'Container';

obj.propTypes = {
  size: NumberOrString.isRequired,
  tabs: PropTypes.bool,
  id: StringOrFunc
};

obj.getDefaultProps = () => ({
  tabs: true
});

obj.render = function render() {
  return <div></div>;
};


export default React.createClass(obj);
