import React from 'react';
import Container from './Container.js'
import classNames from 'classnames';

const obj = {};

obj.displayName = 'Item';

obj.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  component: React.PropTypes.string.isRequired,
  props: React.PropTypes.object.isRequired
};

obj.render = function () {
  
  return <div className='rdl-item'>
    {this.props.component}
  </div>;
};

export default React.createClass(obj);