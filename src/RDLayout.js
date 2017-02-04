import React from 'react';

import Layout from './Layout';
import store from './store';
import { ROW, COLUMN, STACK, Z_INDEX, OPACITY, DISPLAY, RENDER, StringOrFunc } from './types';
import { processLayout } from './utils/components';

const obj = {};

obj.propTypes = {
  pojo: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([ROW, COLUMN, STACK]).isRequired,
  hiddenType: React.PropTypes.oneOf([Z_INDEX, OPACITY, DISPLAY, RENDER]),
  resize: React.PropTypes.bool,
  id: StringOrFunc
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
  }, 250);
};

obj.componentDidMount = function componentDidMount() {
  window.addEventListener('resize', this.onResize);
};

obj.childContextTypes = {
  hiddenType: React.PropTypes.string
};

obj.getChildContext = function getChildContext() {
  return {
    hiddenType: this.props.hiddenType
  };
};

obj.getInitialState = function getInitialState() {
  store.subscribe(() => {
    // force render
    if (this.state) {
      this.setState({ id: this.state.id });
    }
  });
  return {
    id: processLayout({
      id: this.props.id,
      name: this.props.name,
      children: this.props.children,
      type: this.props.type,
      hiddenType: this.props.hiddenType,
      resize: this.props.resize
    })
  };
};

obj.render = function render() {
  const layout = store.getLayout(this.state.id);
  return <Layout
    containers={layout.containers}
    floats={layout.floats}
    childrenProcess={layout.childrenProcess}
    type={layout.type}
    hiddenType={layout.hiddenType}
    resize={layout.resize}
    id={this.state.id}
  />;
};

const RDLayout = React.createClass(obj);

export default RDLayout;

