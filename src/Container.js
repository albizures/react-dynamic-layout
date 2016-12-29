import React from 'react';
import classNames from 'classnames';

import Stack from './Stack';

const ROW = 'row';
const STACK = 'stack';
const COLUMN = 'column';

const obj = {};

obj.displayName = 'Container';

obj.getDefaultProps = () => ({
  tabs: true
});

obj.propTypes = {
  type: React.PropTypes.oneOf([ROW, COLUMN]).isRequired,
  children: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  tabs: React.PropTypes.bool,
  active: React.PropTypes.number
};

obj.render = function render() {
  const className = classNames(
    'rdl-container',
    'rdl-' + this.props.type
  );
  const style = {
    width: this.props.width,
    height: this.props.height
  };
  return <div className={className} style={style}>
    <Stack
      tabs={this.props.tabs}
      children={this.props.children}
      width={this.props.width}
      height={this.props.height}
      active={this.props.active}
    />
  </div>;
};

const Container = React.createClass(obj);

export {
  ROW,
  STACK,
  COLUMN,
  Container
};

export default Container;

