'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseInt = Number.parseInt;

var obj = {};
var types = {
  n: 'north',
  s: 'south',
  e: 'east',
  w: 'west',
  ne: 'north-east',
  nw: 'north-west',
  sw: 'south-west',
  se: 'south-east'
};

obj.displayName = 'ResizeBar';

obj.propTypes = {
  type: _react2.default.PropTypes.oneOf(Object.keys(types)).isRequired,
  setDiff: _react2.default.PropTypes.func.isRequired
};

obj.setN = function setN(_ref) {
  var top = _ref.top;

  this.refs.el.style.top = top - this.initPos.top + this.initRelactivePos.top + 'px';
};
obj.setS = function setS(_ref2) {
  var top = _ref2.top;

  this.refs.el.style.bottom = -(top - this.initPos.top + this.initRelactivePos.bottom) + 'px';
};
obj.setE = function setE(_ref3) {
  var left = _ref3.left;

  this.refs.el.style.right = -(left - this.initPos.left + this.initRelactivePos.right) + 'px';
};
obj.setW = function setW(_ref4) {
  var left = _ref4.left;

  this.refs.el.style.left = left - this.initPos.left + this.initRelactivePos.left + 'px';
};

obj.getN = function getN(_ref5) {
  var top = _ref5.top;

  return {
    y: top - this.initPos.top,
    height: -(top - this.initPos.top)
  };
};
obj.getS = function getS(_ref6) {
  var top = _ref6.top;

  return {
    height: top - this.initPos.top
  };
};
obj.getE = function getE(_ref7) {
  var left = _ref7.left;

  return {
    width: left - this.initPos.left
  };
};
obj.getW = function getW(_ref8) {
  var left = _ref8.left;

  return {
    x: left - this.initPos.left,
    width: -(left - this.initPos.left)
  };
};

obj.getInitialState = function getInitialState() {
  var _this = this;

  var types = this.props.type.split('');

  this.setFunctions = types.map(function (item) {
    return _this['set' + item.toUpperCase()];
  });
  this.getFunctions = types.map(function (item) {
    return _this['get' + item.toUpperCase()];
  });
  return null;
};

obj.normalize = function normalize(top, left) {
  if (top < 25) {
    top = 25;
  }
  if (left < 0) {
    left = 0;
  }
  if (left > this.maxLeft) {
    left = this.maxLeft;
  }
  if (top > this.maxTop) {
    top = this.maxTop;
  }
  return { top: top, left: left };
};

obj.onMouseMove = function onMouseMove(evt) {
  var diff = this.normalize(evt.clientY - this.diffY, evt.clientX - this.diffX);
  for (var index = 0; index < this.setFunctions.length; index++) {
    this.setFunctions[index](diff);
  }
};

obj.resetPosition = function resetPosition() {
  this.refs.el.style = {};
  this.refs.el.classList.toggle('active');
};

obj.onMouseUp = function onMouseUp(evt) {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  var diff = this.normalize(evt.clientY - this.diffY, evt.clientX - this.diffX);
  diff = Object.assign.apply(null, this.getFunctions.map(function (item) {
    return item(diff);
  }));
  this.resetPosition();
  this.props.setDiff(diff);
};

obj.onMouseDown = function onMouseDown(evt) {
  var _window$getComputedSt = window.getComputedStyle(evt.target),
      left = _window$getComputedSt.left,
      right = _window$getComputedSt.right,
      bottom = _window$getComputedSt.bottom,
      top = _window$getComputedSt.top;

  var stats = this.initPos = evt.target.getBoundingClientRect();
  this.refs.el.classList.toggle('active');
  this.initRelactivePos = {
    left: parseInt(left, 10),
    right: parseInt(right, 10),
    bottom: parseInt(bottom, 10),
    top: parseInt(top, 10)
  };
  this.diffX = evt.clientX - stats.left;
  this.diffY = evt.clientY - stats.top;
  this.maxLeft = window.innerWidth - evt.target.clientWidth;
  this.maxTop = window.innerHeight - evt.target.clientHeight;
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};

obj.render = function render() {
  var className = (0, _classnames2.default)('rdl-resize-bar', types[this.props.type]);
  return _react2.default.createElement('div', { ref: 'el', className: className, onMouseDown: this.onMouseDown });
};

var ResizeBar = _react2.default.createClass(obj);

exports.default = ResizeBar;