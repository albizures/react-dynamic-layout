import React from 'react';

import Divider from './Divider';
import Float from './Float';
import Container, { STACK, ROW, COLUMN } from './Container';
import register from './register';


const Z_INDEX = 'zIndex';
const OPACITY = 'opacity';
const DISPLAY = 'diplay';

const hiddenTypes = {
  [Z_INDEX]: 'rdl-hidden-z-index',
  [OPACITY]: 'rdl-hidden-opacity',
  [DISPLAY]: 'rdl-hidden-display'
};

let globalKey = 0;

const obj = {};

obj.displayName = 'Layout';

obj.getDefaultProps = () => ({
  floats: [],
  resize: true,
  root: true
});

obj.propTypes = {
  type: React.PropTypes.oneOf([STACK, ROW, COLUMN]).isRequired,
  children: React.PropTypes.array.isRequired,
  floats: React.PropTypes.array.isRequired,
  resize: React.PropTypes.bool,
  root: React.PropTypes.bool,
  onResize: React.PropTypes.func,
  active: React.PropTypes.number,
  hiddenType: React.PropTypes.oneOf([Z_INDEX, OPACITY, DISPLAY])
};

obj.render = function render() {
  if (!this.state || this.state.children.length === 0) {
    return <div className='rdl-layout' ref='el'></div>;
  }
  const style = {
    width: this.state.width,
    height: this.state.height
  };
  let className = 'rdl-layout ';
  if (this.props.root) {
    if (this.props.hiddenType) {
      className += hiddenTypes[this.props.hiddenType];
    } else {
      className += hiddenTypes[DISPLAY];
    }
  }
  return <div className={className} ref='el' style={style}>
    {this.getChildren()}
    {this.getFloats()}
  </div>;
};

obj.forChildren = function forChildren(cb = () => {}) {
  for (let index = 0; index < this.props.children.length; index++) {
    cb(this.state.children[index], index);
  }
};

obj.getChildren = function getChildren() {
  if (this.state.type === STACK) {
    return <Container
      type={COLUMN}
      height={this.state.height}
      width={this.state.width}
      children={this.state.children}
      active={this.state.active}
    />;
  }
  const children = [];

  this.forChildren((child, index) => {
    const props = {
      key: index,
      children: [{
        component: child.component,
        name: child.name,
        props: child.props,
        children: child.children,
        type: child.type,
        active: child.active,
        resize: child.resize
      }],
      tabs: child.tabs,
      type: this.state.type,
      width: child.width,
      height: child.height
    };
    children.push(
      <Container {...props}/>
    );
    if (this.state.resize && index !== this.state.children.length - 1) {
      const dividerProps = {
        key: 'd' + index,
        type: this.state.type,
        indexBefore: index,
        indexAfter: index + 1,
        setDiff: this.setDiffSize
      };
      children.push(
        <Divider {...dividerProps}/>
      );
    }
  });
  return children;
};

obj.setDiffSize = function setDiffSize(indexBefore, indexAfter, diff) {
  let { children } = this.state;
  children = [].concat(children);
  let prop;
  if (this.state.type === ROW) {
    prop = 'height';
  } else {
    prop = 'width';
  }
  children[indexBefore][prop] += diff[prop];
  children[indexAfter][prop] -= diff[prop];

  this.setState({ children });
};

obj.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
  const rect = this.refs.el.parentElement.getBoundingClientRect();
  const { width, height, top, left } = rect;
  let prop;
  let secondProp;
  let diff;
  if (nextProps.type === ROW) {
    prop = 'width';
    secondProp = 'height';
    diff = height / this.state.height;
  } else {
    prop = 'height';
    secondProp = 'width';
    diff = width / this.state.width;
  }
  // diff = 1;
  // let prop = nextProps.type === ROW ? : ;
  const children = this.state.children
    .map(child => {
      child[prop] = rect[prop];
      child[secondProp] *= diff;
      return child;
    });

  this.setState({ width, height, top, left, children });
};

obj.getFloats = function getFloats() {
  const floats = [];
  for (let index = 0; index < this.state.floats.length; index++) {
    const { pos, size, ...layout } = this.state.floats[index];
    floats.push(<Float key={index} {...{ pos, size, layout }} />);
  }
  return floats;
};

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
function parseSizeChild(size, maxSize) {
  let newSize;
  if (Number.isInteger(size) || isFloat(size)) {
    newSize = {
      px: (maxSize * size) / 100,
      percent: size
    };
  } else if (size.indexOf('calc') !== -1) {
    const match = size.match(/[0-9]+(px|%)/g);
    size = parseInt(match[0], 10) - parseSizeChild(match[1], maxSize).percent;
    newSize = parseSizeChild(size, maxSize);
  } else if (size.indexOf('px') !== -1) {
    size = parseInt(size, 10);
    newSize = {
      percent: (size * 100) / maxSize,
      px: size
    };
  } else if (size.indexOf('%') !== -1) {
    newSize = parseSizeChild(parseInt(size, 10), maxSize);
  }
  if (!newSize || Number.isNaN(newSize.percent) || Number.isNaN(newSize.px)) {
    throw new Error('Incorrect size: ' + size);
  }
  return newSize;
}

obj.getChildrenState = function getChildrenState(size, props) {
  props = props || this.props;
  const { children, type } = props;
  let totalSize = 100;
  const newChildren = [];
  let childWithSize = 0;
  let eachItemSize = 0;

  let defaultSize = 'height';
  let dynamicSize = 'width';

  if (type === COLUMN) {
    defaultSize = 'height';
    dynamicSize = 'width';
  } else if (type === ROW) {
    defaultSize = 'width';
    dynamicSize = 'height';
  }

  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const newChild = Object.assign({ key: globalKey }, child);
    if (child.size) {
      newChild.size = parseSizeChild(child.size, size[dynamicSize]);
      totalSize -= newChild.size.percent;
      childWithSize++;
    }
    newChildren.push(newChild);
    globalKey++;
  }

  if (totalSize < 0) console.warn('children size is more than 100% of size');

  eachItemSize = (totalSize / (children.length - childWithSize)) / 100;

  for (let index = 0; index < newChildren.length; index++) {
    const child = newChildren[index];
    if (!child.size) {
      child[defaultSize] = size[defaultSize];
      child[dynamicSize] = size[dynamicSize] * eachItemSize;
    } else {
      child[defaultSize] = size[defaultSize];
      child[dynamicSize] = child.size.px;
    }
    delete child.size;
  }
  return newChildren;
};
obj.getFloatState = function getFloatState(props) {
  props = props || this.props;
  const { floats } = props;
  const newFloast = [];
  for (let index = 0; index < floats.length; index++) {
    const { children, type, pos, size, name } = floats[index];
    newFloast.push({
      pos,
      size,
      children,
      name,
      type,
      key: globalKey
    });
    globalKey++;
  }
  return newFloast;
};

obj.generateState = function generateState(props) {
  props = props || this.props;
  const { width, height, top, left } = this.refs.el.parentElement.getBoundingClientRect();
  return {
    active: props.active,
    type: props.type,
    resize: props.resize,
    width,
    height,
    top,
    left,
    floats: this.getFloatState(props),
    children: this.getChildrenState({ width, height }, props)
  };
};

obj.onResize = function onResize() {
  clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(() => {
    this.setState(
      this.generateState()
    );
  }, 250);
};

obj.componentDidMount = function componentDidMount() {
  const { position, width, height } = window.getComputedStyle(this.refs.el.parentElement);
  if (position !== 'absolute' && position !== 'relative') {
    throw new Error('parentElement isn\'t `relative` or `absolute`');
  }
  if (parseInt(width, 10) < 10 || parseInt(height, 10) < 10) {
    console.warn('width or height is very small');
  }
  if (this.props.root) window.addEventListener('resize', this.onResize);
  if (this.props.onResize) {
    this.props.onResize(this.onResize);
  }
  this.setState(
    this.generateState()
  );
};
obj.componentWillUnmount = function componentWillUnmount() {
  window.removeEventListener('resize', this.onResize);
};

export {
  STACK,
  ROW,
  COLUMN,
  Z_INDEX,
  DISPLAY,
  OPACITY,
  register
};

const Layout = React.createClass(obj);

export default Layout;
