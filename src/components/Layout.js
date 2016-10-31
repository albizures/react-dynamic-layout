const React = require('react');
const classNames = require('classnames');

const Stack = require('./Stack.js');
const Divider = require('./Divider.js');
const { isInteger } = Number;
const { isArray } = Array;

const obj = {};
const components = {};

const ROW = 'row';
const STACK = 'stack';
const COLUMN = 'column';

obj.displayName = 'Layout';

obj.getDefaultProps = () => ({
  resize: true
});

obj.propTypes = {
  type: React.PropTypes.oneOf([STACK, ROW, COLUMN]),
  children: React.PropTypes.array.isRequired,
  resize: React.PropTypes.bool
};


obj.getChildren = function () {
  let children = [];
  let classNameDivider = 'divider-' + this.state.type;
  let keys = Object.keys(this.state.children);

  if (this.state.type === STACK) return this.getStack();

  for (var index = 0; index < keys.length; index++) {
    var child = this.state.children[keys[index]];
    children.push(
      this.getComponent(child)
    );
    if (this.state.type !== STACK && this.state.resize && index !== keys.length - 1) {
      children.push(
        <Divider className={classNameDivider} key={'d' + child.key}/>
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
  let {children, type, resize} = this.props;
  let newChildren = {};
  for (let index = 0; index < children.length; index++) {
    let child = children[index];
    newChildren[index] = Object.assign({}, child, {key: index});
  }
  return {
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
  if (this.state.type === STACK) {
    return <Stack {...{type: className, children: this.getChildrenStack()}} />;
  }
  return <div className={className}>
    {this.state.type === STACK ? this.getStack() : this.getChildren()}
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
