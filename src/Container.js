import React from 'react';
import { ROW, COLUMN, STACK } from './types';
import Stack from './Stack';

const obj = {};

obj.displayName = 'Container';

obj.propTypes = {
  id: React.PropTypes.any.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  components: React.PropTypes.array.isRequired,
  tabs: React.PropTypes.bool
};

obj.getSize = function getSize() {
  const { width, height } = this.props;
  return { width, height };
};

obj.render = function render() {
  return <div ref='el' className='rdl-container' style={this.getSize()}>
    <Stack
      components={this.props.components}
      width={this.props.width}
      height={this.props.height}
      tabs={this.props.tabs}
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

