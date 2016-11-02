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

obj.displayName = 'Layout';

obj.getDefaultProps = () => ({
  resize: true,
  children: [],
  floats: []
});

obj.propTypes = {
  type: React.PropTypes.oneOf([STACK, ROW, COLUMN]),
  children: React.PropTypes.array.isRequired,
  floats: React.PropTypes.array.isRequired,
  resize: React.PropTypes.bool
};


obj.getFloats = function () {
  let floats = [];
  let keys = Object.keys(this.state.floats);
  for (var index = 0; index < keys.length; index++) {
    var {key, pos, size, type, children} = this.state.floats[keys[index]];
    floats.push(
      <Float {...{key, pos, size}} >
        <Layout {...{type, children, resize: false }} />
      </Float>
    )
  }
  // let {component, size, children, props, key, name, tabs, resize} = data;

  return floats;
};

obj.setDiffSize = function (keyBefore, keyAfter, diff) {
  console.log(keyBefore, keyAfter, diff);
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

obj.getComponent = function (data) {
  let {component, size, type, children, props, key, name, tabs, resize} = data;
  let isLayout = isArray(children);
  let style = {};

  size = isInteger(size) ? size + '%' : size;
  
  if (this.state.type === ROW) {
    style.height = size;
  } else if (this.state.type === COLUMN) {
    style.width = size;
  }

  if (isLayout) {
    tabs = false;
    children = [{
      key, name,
      child: <Layout {...{type, children, resize, key: 'layout' + key}}/>
    }];
  } else {
    let Component = components[component];
    if(!Component) throw new Error('Unknown ' + name + ' component');
    children = [{
      key, name,
      child: <Component {...props} />
    }];
  }

  return <Stack {...{type: this.state.type, tabs, key, children, style}} />;
};

obj.generateState = function () {
  let {children, type, resize, floats} = this.props;
  let key = 0;
  let newChildren = {};
  let newFloast = {};

  for (let index = 0; index < children.length; index++) {
    let child = children[index];
    newChildren[key] = Object.assign({key}, child);
    key++;
  }
  for (let index = 0; index < floats.length; index++) {
    let float = floats[index];
    newFloast[key] = Object.assign({key}, float);
    key++;
  }
  return {
    floats: newFloast,
    children: newChildren,
    type,
    resize
  }
};

obj.getInitialState = function () {
  return this.generateState();
};

obj.getChildrenStack = function () {
  let children = [];
  let keys = Object.keys(this.state.children);
  for (let index = 0; index < keys.length; index++) {
    let {name, props, component, key} = this.state.children[keys[index]];
    let Component = components[component];
    if(!Component) throw new Error('Unknown ' + name + ' component');
    children.push({
      key, name,
      child: <Component {...props} />
    });
  }
  return children;
};

obj.render = function () {
  let className = classNames(
    'layout'
  );
  return <div className={className}>
    {
      this.state.type === STACK ?
        <Stack {...{type: ROW, children: this.getChildrenStack(), style: {height: '100%'}}} /> :
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
