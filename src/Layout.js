import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ROW, COLUMN, STACK, Z_INDEX, OPACITY, DISPLAY, RENDER } from './types';
import { checkParentElement, getSizeProperties } from './utils/components';
import { parseSize, getDiff } from './utils/size';
import store, { actions } from './store';
import Container from './Container';
import Float from './Float';
import Divider from './Divider';

const { updateContainer, updateLayout } = actions;
const obj = {};

obj.propTypes = {
  floats: PropTypes.array,
  containers: PropTypes.array,
  type: PropTypes.oneOf([ROW, COLUMN, STACK]).isRequired,
  hiddenType: PropTypes.oneOf([Z_INDEX, OPACITY, DISPLAY, RENDER]),
  childrenProcess: PropTypes.bool
};


obj.contextTypes = {
  hiddenType: PropTypes.string
};

obj.getDefaultProps = () => ({
  floats: [],
  containers: []
});

const hiddenTypes = {
  [Z_INDEX]: 'rdl-hidden-z-index',
  [OPACITY]: 'rdl-hidden-opacity',
  [DISPLAY]: 'rdl-hidden-display',
  [RENDER]: 'rdl-hidden-render'
};

obj.displayName = 'Layout';

obj.shouldComponentUpdate = function shouldComponentUpdate() {
  const { clientWidth: width, clientHeight: height } = this.refs.el;
  const changeSize = this.state && (this.state.width !== width || this.state.height !== height);
  if (changeSize) {
    this.changeSize({ width, height });
    return false;
  }
  return true;
};

obj.changeSize = function changeSize(size) {
  const { total, portion } = getSizeProperties(this.props.type);
  const diff = getDiff(this.state, size);
  const containers = this.props.containers
    .map(id => store.getContainer(id))
    .filter(container => container.isVariable);
  const sizeChange = diff[portion] / (containers.length || 1 /* avoid 0*/);

  for (let index = 0; index < this.props.containers.length; index++) {
    const container = containers[index];
    store.dispatch(updateContainer(container.id, {
      [portion]: container.isVariable ? container[portion] + sizeChange : container[portion],
      [total]: size[total]
    }), index === this.props.containers.length - 1);
  }
  this.setState(size);
};

obj.childrenProcess = function childrenProcess() {
  const { clientWidth: width, clientHeight: height } = this.refs.el;
  const { total, portion } = getSizeProperties(this.props.type);
  const size = { width, height };

  let totalPortionSize = 100;

  for (let index = 0; index < this.props.containers.length; index++) {
    const container = store.getContainer(this.props.containers[index]);
    const portionSize = parseSize(container.size, size[portion]);
    const containerSize = {
      isVariable: portionSize.isVariable,
      [portion]: portionSize.px,
      [total]: parseSize(100, size[total]).px
    };
    totalPortionSize -= portionSize.percent;
    store.dispatch(updateContainer(container.id, containerSize), false);
  }
  if (totalPortionSize < 0) console.warn('Children size is more than 100% of size');
  if (totalPortionSize > 0) console.warn('Children size is less than 100% of size');
  store.dispatch(updateLayout(this.props.id, { childrenProcess: true }));
  this.setState(size);
};

obj.componentDidMount = function componentDidMount() {
  checkParentElement(this.refs.el);
  this.childrenProcess();
};

obj.getContainers = function getChildren() {
  const children = [];
  for (let index = 0; index < this.props.containers.length; index++) {
    const container = store.getContainer(this.props.containers[index]);
    children.push(
      <Container
        key={container.id}
        id={container.id}
        width={container.width}
        height={container.height}
        tabs={container.tabs}
        components={container.components.map(id => store.getComponent(id))}
      />
    );
    if (this.props.resize && index !== this.props.containers.length - 1) {
      const nextContainer = store.getContainer(this.props.containers[index + 1]);
      const dividerProps = {
        key: container.id + '_' + nextContainer.id,
        type: this.props.type,
        idBefore: container.id,
        idAfter: nextContainer.id
      };
      children.push(
        <Divider {...dividerProps}/>
      );
    }
  }
  return children;
};
obj.getFloats = function getFloats() {
  const children = [];
  for (let index = 0; index < this.props.floats.length; index++) {
    const float = store.getFloat(this.props.floats[index]);
    if (!(this.context.hiddenType === RENDER && !float.open)) {
      children.push(
        <Float
          key={float.id}
          id={float.id}
          width={float.width}
          height={float.height}
          x={float.x}
          y={float.y}
          open={float.open}
          layout={float.layout}
        />
      );
    }
  }
  return children;
};

obj.render = function render() {
  const className = classNames(
    'rdl-layout',
    'rdl-' + this.props.type,
    hiddenTypes[this.props.hiddenType]
  );
  if (!this.props.childrenProcess) {
    return <div ref='el' className={className}>
    </div>;
  }
  return <div ref='el' className={className}>
    {this.getContainers()}
    {this.getFloats()}
  </div>;
};

const Layout = React.createClass(obj);

export default Layout;
