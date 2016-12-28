'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ResizeBar = require('./ResizeBar');

var _ResizeBar2 = _interopRequireDefault(_ResizeBar);

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};
var parseInt = Number.parseInt;

obj.displayName = 'Float';

obj.getDefaultProps = function () {
  return {
    pos: {},
    size: {},
    resize: true
  };
};

obj.propTypes = {
  size: _react2.default.PropTypes.object.isRequired,
  pos: _react2.default.PropTypes.object.isRequired,
  resize: _react2.default.PropTypes.bool.isRequired,
  layout: _react2.default.PropTypes.object.isRequired
};

obj.generateState = function generateState() {
  return {
    pos: _extends({}, this.props.pos),
    size: _extends({}, this.props.size)
  };
};

obj.getInitialState = function getInitialState() {
  return this.generateState();
};

obj.onMouseMove = function onMouseMove(evt) {
  var top = evt.clientY - this.diffY;
  var left = evt.clientX - this.diffX;
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
  this.setState({
    pos: {
      y: top,
      x: left
    }
  });
};

obj.onMouseUp = function onMouseUp() {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
};

obj.onMouseDown = function onMouseDown(evt) {
  var stats = evt.target.getBoundingClientRect();
  this.diffX = evt.clientX - stats.left;
  this.diffY = evt.clientY - stats.top;
  this.maxLeft = window.innerWidth - evt.target.clientWidth;
  this.maxTop = window.innerHeight - evt.target.clientHeight;
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};

obj.setDiff = function setDiff(diff) {
  var pos = {};
  var size = {};
  pos.x = this.state.pos.x + (diff.x || 0);
  pos.y = this.state.pos.y + (diff.y || 0);

  size.width = parseInt(this.state.size.width, 10) + (diff.width || 0);
  size.height = parseInt(this.state.size.height, 10) + (diff.height || 0);

  this.setState({ pos: pos, size: size });
};

obj.onResize = function onResize(fn) {
  this.resizeLayout = fn;
};

obj.componentDidUpdate = function componentDidUpdate() {
  if (this.resizeLayout) {
    this.resizeLayout();
  }
};
obj.render = function render() {
  var style = {
    top: this.state.pos.y,
    left: this.state.pos.x,
    width: this.state.size.width,
    height: this.state.size.height
  };
  return _react2.default.createElement(
    'div',
    { className: 'rdl-float', style: style },
    _react2.default.createElement('div', { className: 'rdl-drag-bar', onMouseDown: this.onMouseDown }),
    this.props.resize ? [_react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'n', type: 'n' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 's', type: 's' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'e', type: 'e' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'w', type: 'w' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'ne', type: 'ne' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'nw', type: 'nw' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'sw', type: 'sw' }), _react2.default.createElement(_ResizeBar2.default, { setDiff: this.setDiff, key: 'se', type: 'se' })] : null,
    _react2.default.createElement(
      'div',
      { className: 'rdl-content-float' },
      _react2.default.createElement(_Layout2.default, _extends({ onResize: this.onResize, root: false }, this.props.layout))
    )
  );
};

var Float = _react2.default.createClass(obj);

exports.default = Float;