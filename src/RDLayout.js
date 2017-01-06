import React from 'react';

import Layout from './Layout';
import store from './store';
// import { updateLayout } from './store/actions';
import { ROW, COLUMN, STACK, Z_INDEX, OPACITY, DISPLAY } from './types';
import { processLayout } from './utils/components';

const obj = {};

obj.propTypes = {
  pojo: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([ROW, COLUMN, STACK]).isRequired,
  hiddenType: React.PropTypes.oneOf([Z_INDEX, OPACITY, DISPLAY]),
  resize: React.PropTypes.bool
};

obj.getDefaultProps = () => ({
  hiddenType: DISPLAY,
  resize: true
});


obj.displayName = 'RDLayout';

obj.onResize = function onResize() {
  clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(() => {
    this.setState({ id: this.state.id });
    // updateLayout(this.state.id, { childrenProcess: false });
  }, 250);
};

obj.componentDidMount = function componentDidMount() {
  window.addEventListener('resize', this.onResize);
};

obj.getInitialState = function getInitialState() {
  store.subscribe(() => {
    // force render
    if (this.state) {
      this.setState({ id: this.state.id });
    }
  });
  return {
    id: processLayout(
      this.props.name,
      this.props.children,
      this.props.type,
      this.props.hiddenType,
      this.props.resize
    )
  };
};

obj.render = function render() {
  const layout = store.getLayout(this.state.id);
  return <Layout
    containers={layout.containers.map(id => store.getContainer(id))}
    floats={layout.floats.map(id => store.getFloat(id))}
    childrenProcess={layout.childrenProcess}
    type={layout.type}
    hiddenType={layout.hiddenType}
    resize={layout.resize}
    id={this.state.id}
  />;
};

const RDLayout = React.createClass(obj);

export default RDLayout;

