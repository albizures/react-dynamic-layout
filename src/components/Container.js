import React from 'react';
import classNames from 'classnames';

import Stack from './Stack.js';
export const ROW = 'row';
export const STACK = 'stack';
export const COLUMN = 'column';

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
  tabs: React.PropTypes.bool
};

obj.render = function () {
  let className = classNames(
    'rdl-container',
    'rdl-' + this.props.type
  );
  let style = {
    width: this.props.width,
    height: this.props.height
  };
  return <div className={className} style={style}>
    <Stack
      tabs={this.props.tabs}
      children={this.props.children}
      width={this.props.width}
      height={this.props.height}
    />
  </div>;
};

export default React.createClass(obj);
