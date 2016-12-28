'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = exports.COLUMN = exports.STACK = exports.ROW = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Stack = require('./Stack');

var _Stack2 = _interopRequireDefault(_Stack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROW = 'row';
var STACK = 'stack';
var COLUMN = 'column';

var obj = {};

obj.displayName = 'Container';

obj.getDefaultProps = function () {
  return {
    tabs: true
  };
};

obj.propTypes = {
  type: _react2.default.PropTypes.oneOf([ROW, COLUMN]).isRequired,
  children: _react2.default.PropTypes.array.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired,
  tabs: _react2.default.PropTypes.bool
};

obj.render = function render() {
  var className = (0, _classnames2.default)('rdl-container', 'rdl-' + this.props.type);
  var style = {
    width: this.props.width,
    height: this.props.height
  };
  return _react2.default.createElement(
    'div',
    { className: className, style: style },
    _react2.default.createElement(_Stack2.default, {
      tabs: this.props.tabs,
      children: this.props.children,
      width: this.props.width,
      height: this.props.height
    })
  );
};

var Container = _react2.default.createClass(obj);

exports.ROW = ROW;
exports.STACK = STACK;
exports.COLUMN = COLUMN;
exports.Container = Container;
exports.default = Container;