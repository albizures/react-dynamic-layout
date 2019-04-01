import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ROW, COLUMN, STACK } from './types';
import Stack from './Stack';

const obj = {};

obj.displayName = 'Container';

obj.propTypes = {
  id: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  tabs: PropTypes.bool,
};

obj.getSize = function getSize() {
  const { width, height } = this.props;
  return { width, height };
};

obj.render = function render() {
  return (
    <div ref="el" className="rdl-container" style={this.getSize()}>
      <Stack
        components={this.props.components}
        width={this.props.width}
        height={this.props.height}
        tabs={this.props.tabs}
      />
    </div>
  );
};

const Container = createClass(obj);

export { ROW, STACK, COLUMN, Container };

export default Container;
