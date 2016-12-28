'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.COLUMN = exports.ROW = exports.STACK = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Float = require('./Float');

var _Float2 = _interopRequireDefault(_Float);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var globalKey = 0;

var obj = {};

obj.displayName = 'Layout';

obj.getDefaultProps = function () {
  return {
    floats: [],
    resize: true,
    root: true
  };
};

obj.propTypes = {
  type: _react2.default.PropTypes.oneOf([_Container.STACK, _Container.ROW, _Container.COLUMN]).isRequired,
  children: _react2.default.PropTypes.array.isRequired,
  floats: _react2.default.PropTypes.array.isRequired,
  resize: _react2.default.PropTypes.bool,
  root: _react2.default.PropTypes.bool,
  onResize: _react2.default.PropTypes.func
};

obj.render = function render() {
  if (!this.state || this.state.children.length === 0) {
    return _react2.default.createElement('div', { className: 'rdl-layout', ref: 'el' });
  }
  var style = {
    width: this.state.width,
    height: this.state.height
  };
  return _react2.default.createElement(
    'div',
    { className: 'rdl-layout', ref: 'el', style: style },
    this.getChildren(),
    this.getFloats()
  );
};

obj.forChildren = function forChildren() {
  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  for (var index = 0; index < this.props.children.length; index++) {
    cb(this.state.children[index], index);
  }
};

obj.getChildren = function getChildren() {
  var _this = this;

  if (this.state.type === _Container.STACK) {
    return _react2.default.createElement(_Container2.default, {
      type: _Container.COLUMN,
      height: this.state.height,
      width: this.state.width,
      children: this.state.children
    });
  }
  var children = [];

  this.forChildren(function (child, index) {
    var props = {
      key: index,
      children: [{
        component: child.component,
        name: child.name,
        props: child.props,
        children: child.children,
        type: child.type,
        resize: child.resize
      }],
      tabs: child.tabs,
      type: _this.state.type,
      width: child.width,
      height: child.height
    };
    children.push(_react2.default.createElement(_Container2.default, props));
    if (_this.state.resize && index !== _this.state.children.length - 1) {
      var dividerProps = {
        key: 'd' + index,
        type: _this.state.type,
        indexBefore: index,
        indexAfter: index + 1,
        setDiff: _this.setDiffSize
      };
      children.push(_react2.default.createElement(_Divider2.default, dividerProps));
    }
  });
  return children;
};

obj.setDiffSize = function setDiffSize(indexBefore, indexAfter, diff) {
  var children = this.state.children;

  children = [].concat(children);
  var prop = void 0;
  if (this.state.type === _Container.ROW) {
    prop = 'height';
  } else {
    prop = 'width';
  }
  children[indexBefore][prop] += diff[prop];
  children[indexAfter][prop] -= diff[prop];

  this.setState({ children: children });
};

obj.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
  var rect = this.refs.el.parentElement.getBoundingClientRect();
  var width = rect.width,
      height = rect.height,
      top = rect.top,
      left = rect.left;

  var prop = void 0;
  var secondProp = void 0;
  var diff = void 0;
  if (nextProps.type === _Container.ROW) {
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
  var children = this.state.children.map(function (child) {
    child[prop] = rect[prop];
    child[secondProp] *= diff;
    return child;
  });

  this.setState({ width: width, height: height, top: top, left: left, children: children });
};

obj.getFloats = function getFloats() {
  var floats = [];
  for (var index = 0; index < this.state.floats.length; index++) {
    var _state$floats$index = this.state.floats[index],
        pos = _state$floats$index.pos,
        size = _state$floats$index.size,
        layout = _objectWithoutProperties(_state$floats$index, ['pos', 'size']);

    floats.push(_react2.default.createElement(_Float2.default, _extends({ key: index }, { pos: pos, size: size, layout: layout })));
  }
  return floats;
};

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
function parseSizeChild(size, maxSize) {
  var newSize = void 0;
  if (Number.isInteger(size) || isFloat(size)) {
    newSize = {
      px: maxSize * size / 100,
      percent: size
    };
  } else if (size.indexOf('calc') !== -1) {
    var match = size.match(/[0-9]+(px|%)/g);
    size = parseInt(match[0], 10) - parseSizeChild(match[1], maxSize).percent;
    newSize = parseSizeChild(size, maxSize);
  } else if (size.indexOf('px') !== -1) {
    size = parseInt(size, 10);
    newSize = {
      percent: size * 100 / maxSize,
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
  var _props = props,
      children = _props.children,
      type = _props.type;

  var totalSize = 100;
  var newChildren = [];
  var childWithSize = 0;
  var eachItemSize = 0;

  var defaultSize = 'height';
  var dynamicSize = 'width';

  if (type === _Container.COLUMN) {
    defaultSize = 'height';
    dynamicSize = 'width';
  } else if (type === _Container.ROW) {
    defaultSize = 'width';
    dynamicSize = 'height';
  }

  for (var index = 0; index < children.length; index++) {
    var child = children[index];
    var newChild = _extends({ key: globalKey }, child);
    if (child.size) {
      newChild.size = parseSizeChild(child.size, size[dynamicSize]);
      totalSize -= newChild.size.percent;
      childWithSize++;
    }
    newChildren.push(newChild);
    globalKey++;
  }

  if (totalSize < 0) console.warn('children size is more than 100% of size');

  eachItemSize = totalSize / (children.length - childWithSize) / 100;

  for (var _index = 0; _index < newChildren.length; _index++) {
    var _child = newChildren[_index];
    if (!_child.size) {
      _child[defaultSize] = size[defaultSize];
      _child[dynamicSize] = size[dynamicSize] * eachItemSize;
    } else {
      _child[defaultSize] = size[defaultSize];
      _child[dynamicSize] = _child.size.px;
    }
    delete _child.size;
  }
  return newChildren;
};
obj.getFloatState = function getFloatState(props) {
  props = props || this.props;
  var _props2 = props,
      floats = _props2.floats;

  var newFloast = [];
  for (var index = 0; index < floats.length; index++) {
    var _floats$index = floats[index],
        children = _floats$index.children,
        type = _floats$index.type,
        pos = _floats$index.pos,
        size = _floats$index.size,
        name = _floats$index.name;

    newFloast.push({
      pos: pos,
      size: size,
      children: children,
      name: name,
      type: type,
      key: globalKey
    });
    globalKey++;
  }
  return newFloast;
};

obj.generateState = function generateState(props) {
  props = props || this.props;

  var _refs$el$parentElemen = this.refs.el.parentElement.getBoundingClientRect(),
      width = _refs$el$parentElemen.width,
      height = _refs$el$parentElemen.height,
      top = _refs$el$parentElemen.top,
      left = _refs$el$parentElemen.left;

  return {
    type: props.type,
    resize: props.resize,
    width: width,
    height: height,
    top: top,
    left: left,
    floats: this.getFloatState(props),
    children: this.getChildrenState({ width: width, height: height }, props)
  };
};

obj.onResize = function onResize() {
  var _this2 = this;

  clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(function () {
    _this2.setState(_this2.generateState());
  }, 250);
};

obj.componentDidMount = function componentDidMount() {
  var _window$getComputedSt = window.getComputedStyle(this.refs.el.parentElement),
      position = _window$getComputedSt.position,
      width = _window$getComputedSt.width,
      height = _window$getComputedSt.height;

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
  this.setState(this.generateState());
};
obj.componentWillUnmount = function componentWillUnmount() {
  window.removeEventListener('resize', this.onResize);
};

exports.STACK = _Container.STACK;
exports.ROW = _Container.ROW;
exports.COLUMN = _Container.COLUMN;
exports.register = _register2.default;


var Layout = _react2.default.createClass(obj);

exports.default = Layout;