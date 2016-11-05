const React = require('react');
const classNames = require('classnames');

const Stack = require('./Stack.js');
const Float = require('./Float.js');
const Divider = require('./Divider.js');
const { isInteger } = Number;
const { isArray } = Array;

const obj = {};
const components = {};

const ROW = 'row';
const STACK = 'stack';
const COLUMN = 'column';
const FLOAT = 'float';

let globalKey = 0;

obj.displayName = 'Layout';

obj.getDefaultProps = () => ({
  resize: true,
  children: [],
  floats: []
});

obj.propTypes = {
  type: React.PropTypes.oneOf([STACK, ROW, COLUMN]).isRequired,
  children: React.PropTypes.array.isRequired,
  floats: React.PropTypes.array.isRequired,
  resize: React.PropTypes.bool
};

obj.componentDidMount = function () {
  let {width, height} = this.refs.el.getBoundingClientRect();
  this.setState({width, height});
};

obj.getFloats = function () {
  let floats = [];
  let keys = Object.keys(this.state.floats);
  for (let index = 0; index < keys.length; index++) {
    let {pos, size, ...float} = this.state.floats[keys[index]];
    floats.push(
      <Float {...{key: float.key, pos, size}} >
        <Layout {...float} />
      </Float>
    )
  }
  // let {component, size, children, props, key, name, tabs, resize} = data;

  return floats;
};

obj.setDiffSize = function (keyBefore, keyAfter, diff) {
  let { children } = this.state;
  children = Object.assign({}, children);
  let dimension;
  if (this.state.type === ROW) {
    dimension = 'height';
  } else {
    dimension = 'width';
  }
  children[keyBefore].size[dimension] += diff[dimension];
  children[keyAfter].size[dimension] -= diff[dimension];
  this.setState({children});
};

obj.getChildren = function () {
  let children = [];
  
  let keys = Object.keys(this.state.children);

  for (let index = 0; index < keys.length; index++) {
    let child = this.state.children[keys[index]];
    children.push(
      this.getComponent(child)
    );
    if (this.state.resize && index !== keys.length - 1) {
      let props = {
        key: 'd' + child.key,
        type: this.state.type,
        keyBefore: child.key,
        keyAfter: this.state.children[keys[index + 1]].key,
        setDiff: this.setDiffSize
      };
      children.push(
        <Divider {...props}/>
      );
    }
  }
  return children;
};

obj.setSizeChild = function (key, size) {
  let children = Object.assign({}, this.state.children);
  children[key].size = size;
  this.setState({children});
};

obj.getComponent = function (data) {
  let {component, size, type, children, props, key, name, tabs, resize} = data;
  let isLayout = isArray(children);
  let style = {};

  if (typeof size === 'object') {
    style = Object.assign(style, size);
  } else {
    size = isInteger(size) ? size + '%' : size;
    if (this.state.type === ROW) {
      style.height = size;
    } else if (this.state.type === COLUMN) {
      style.width = size;
    }
  }
  if (type === STACK) {
    children = this.getChildrenStack(children);
  } else if (isLayout) {
    tabs = false;
    children = [{
      key, name,
      child: <Layout {...{type, children, resize, key: 'layout' + key}}/>
    }];
  } else {
    let Component = components[component];
    if(!Component) throw new Error('Unknown ' + component + ' component');
    children = [{
      key, name,
      child: <Component {...props} />
    }];
  }

  return <Stack {...{setSize: this.setSizeChild, type: this.state.type, tabs, key, children, style, id: key}} />;
};

obj.generateState = function () {
  let {children, type, resize, floats} = this.props;
  let newChildren = {};
  let newFloast = {};

  for (let index = 0; index < children.length; index++) {
    let child = children[index];
    newChildren[globalKey] = Object.assign({key: globalKey}, child);
    globalKey++;
  }
  for (let index = 0; index < floats.length; index++) {
    let {children, type, pos, size} = floats[index];
    console.log();
    newFloast[globalKey] = {
      resize: false,
      tabs: false,
      pos,
      size,
      key: globalKey,
      type: ROW,
      children: [{
        size: 100,
        type,
        children,
        name: 'float' + globalKey,
      }]
    }
    globalKey++;
  }
  return {
    floats: newFloast,
    children: newChildren,
    type,
    resize
  }
};

obj.getInitialState = function () {
  let temp = this.generateState();
  // console.log(temp);
  return temp
};

obj.getChildrenStack = function (children) {
  let newChildren = [];

  for (var index = 0; index < children.length; index++) {
    var {name, props, component} = children[index];
    let Component = components[component];
    if(!Component) throw new Error('Unknown ' + name + ' component');
    newChildren.push({
      key: globalKey, name,
      child: <Component {...props} />
    });
    globalKey++;
  }
  return newChildren;
};

obj.render = function () {
  let className = classNames(
    'layout'
  );
  let style = {
    width: this.state.width,
    height: this.state.height,
  };
  return <div ref='el' className={className} style={style}>
    {
      // this.state.type === STACK ?
        // <Stack {...{type: ROW, children: this.getChildrenStack(), style: {height: '100%'}}} /> :
        this.getChildren()
    }
    {this.getFloats()}
  </div>;
};

const Layout = React.createClass(obj);

function register(component, name) {
  name = name || component.displayName;
  if(name === 'Layout') throw new Error('You cannot use \'Layout\' as a name');
  if (components[name]) {
    throw new Error('Component \'' + name + '\' already exists');
  }
  components[name] = component;
}

exports.Layout = Layout;
exports.register = register;

exports.ROW = ROW;
exports.STACK = STACK;
exports.COLUMN = COLUMN;
exports.FLOAT = FLOAT;
