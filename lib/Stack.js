'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _register = require('./register');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

var tabHeight = 16;

obj.displayName = 'Stack';

obj.getDefaultProps = function () {
  return {
    tabs: true,
    active: 0
  };
};

obj.propTypes = {
  children: _react2.default.PropTypes.array.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired,
  tabs: _react2.default.PropTypes.bool,
  active: _react2.default.PropTypes.number
};

obj.getInitialState = function getInitialState() {
  return {
    active: this.props.active
  };
};

obj.processChildren = function processChildren() {
  var _this = this;

  var children = [];
  var tabs = [];

  var _loop = function _loop(index) {
    var child = _this.props.children[index];
    var activeClass = index === _this.state.active ? 'active' : '';
    var newChild = void 0;
    tabs.push(_react2.default.createElement(
      'div',
      { onClick: function onClick() {
          return _this.setState({ active: index });
        }, key: index, className: 'rdl-tab ' + activeClass },
      child.name
    ));
    if (Array.isArray(child.children)) {
      newChild = _react2.default.createElement(
        'div',
        { className: 'rdl-item-body ' + activeClass, key: index },
        _react2.default.createElement(_Layout2.default, _extends({ root: false }, child))
      );
    } else {
      var Component = _register.components[child.component];
      newChild = _react2.default.createElement(
        'div',
        { className: 'rdl-item-body ' + activeClass, key: index },
        _react2.default.createElement(Component, child.props)
      );
    }
    children.push(newChild);
  };

  for (var index = 0; index < this.props.children.length; index++) {
    _loop(index);
  }
  return {
    tabs: tabs,
    children: children
  };
};

obj.render = function render() {
  var _processChildren = this.processChildren(),
      tabs = _processChildren.tabs,
      children = _processChildren.children;

  var bodyHeight = this.props.height - (this.props.tabs ? tabHeight : 0);
  return _react2.default.createElement(
    'div',
    { className: 'rdl-stack' },
    this.props.tabs ? _react2.default.createElement(
      'div',
      { className: 'rdl-tabs', style: { height: tabHeight } },
      tabs
    ) : null,
    _react2.default.createElement(
      'div',
      { className: 'rdl-body', style: { height: bodyHeight } },
      children
    )
  );
};

exports.default = _react2.default.createClass(obj);