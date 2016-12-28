'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('./Container');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

obj.displayName = 'Divider';

obj.propTypes = {
  type: _react2.default.PropTypes.oneOf([_Container.ROW, _Container.COLUMN]),
  setDiff: _react2.default.PropTypes.func.isRequired,
  indexBefore: _react2.default.PropTypes.any.isRequired,
  indexAfter: _react2.default.PropTypes.any.isRequired
};

obj.resetPosition = function resetPosition() {
  this.refs.el.style = {};
  this.refs.el.classList.toggle('active');
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

obj.setRow = function setRow(_ref) {
  var top = _ref.top;

  this.refs.el.style.top = top - this.initPos.top + this.initRelactivePos.top + 'px';
};
obj.setColumn = function setColumn(_ref2) {
  var left = _ref2.left;

  this.refs.el.style.left = left - this.initPos.left + this.initRelactivePos.left + 'px';
};

obj.getRow = function getRow(_ref3) {
  var top = _ref3.top;

  return {
    height: top - this.initPos.top
  };
};

obj.getColumn = function getColumn(_ref4) {
  var left = _ref4.left;

  return {
    width: left - this.initPos.left
  };
};

obj.getInitialState = function getInitialState() {
  var isRow = this.props.type === 'row';

  this.setFunction = isRow ? this.setRow : this.setColumn;
  this.getFunction = isRow ? this.getRow : this.getColumn;
  return null;
};

obj.onMouseMove = function onMouseMove(evt) {
  this.setFunction(this.normalize(evt.clientY - this.diffY, evt.clientX - this.diffX));
};

obj.onMouseUp = function onMouseUp(evt) {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  this.resetPosition();
  this.props.setDiff(this.props.indexBefore, this.props.indexAfter, this.getFunction(this.normalize(evt.clientY - this.diffY, evt.clientX - this.diffX)));
};

obj.onMouseDown = function onMouseDown(evt) {
  var _window$getComputedSt = window.getComputedStyle(evt.target),
      left = _window$getComputedSt.left,
      top = _window$getComputedSt.top;

  var stats = this.initPos = evt.target.getBoundingClientRect();
  this.refs.el.classList.toggle('active');
  this.initRelactivePos = {
    left: parseInt(left, 10),
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
  var classNameDivider = 'rdl-divider-' + this.props.type;
  return _react2.default.createElement(
    'div',
    { className: classNameDivider },
    _react2.default.createElement('div', { ref: 'el', className: 'rdl-divider-content', onMouseDown: this.onMouseDown })
  );
};

exports.default = _react2.default.createClass(obj);