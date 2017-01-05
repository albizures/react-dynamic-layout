import React from 'react';


const obj = {};

obj.displayName = 'Container';

obj.propTypes = {
  size: React.PropTypes.any.isRequired,
  tabs: React.PropTypes.bool
};

obj.getDefaultProps = () => ({
  tabs: true
});

obj.render = function render() {
  return <div></div>;
};


export default React.createClass(obj);
