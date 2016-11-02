const React = require('react');
const classNames = require('classnames');
const { parseInt } = Number;
const obj = {};
const types = {
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
  type: React.PropTypes.oneOf(Object.keys(types)).isRequired,
  setDiff: React.PropTypes.func.isRequired
};

obj.setN = function ({top}) {
  this.refs.el.style.top = (top - this.initPos.top + this.initRelactivePos.top) + 'px';
};
obj.setS = function ({top}) {
  this.refs.el.style.bottom = - (top - this.initPos.top + this.initRelactivePos.bottom) + 'px';
};
obj.setE = function ({left}) {
  this.refs.el.style.right = - (left - this.initPos.left + this.initRelactivePos.right) + 'px';
};
obj.setW = function ({left}) {
  this.refs.el.style.left = (left - this.initPos.left + this.initRelactivePos.left) + 'px';
};

obj.getN = function ({top}) {
  return {
    y: top - this.initPos.top,
    height: - (top - this.initPos.top)
  };
};
obj.getS = function ({top}) {
  return {
    height: top - this.initPos.top
  };
};
obj.getE = function ({left}) {
  return {
    width: left - this.initPos.left
  };
};
obj.getW = function ({left}) {
  return {
    x: left - this.initPos.left,
    width: - (left - this.initPos.left)
  };
};


obj.getInitialState = function () {
  let types = this.props.type.split('');

  this.setFunctions = types.map(item => this['set' + item.toUpperCase()]);
  this.getFunctions = types.map(item => this['get' + item.toUpperCase()]);
  return null;
};

obj.normalize = function (top, left) {
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
  return {top, left};
}

obj.onMouseMove = function (evt) {
  let diff = this.normalize(
    evt.clientY - this.diffY,
    evt.clientX - this.diffX
  );
  for (var index = 0; index < this.setFunctions.length; index++) {
    this.setFunctions[index](diff);
  }
};

obj.resetPosition = function () {
  this.refs.el.style = {};
  this.refs.el.classList.toggle('active');
};

obj.onMouseUp = function (evt) {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  let diff = this.normalize(
    evt.clientY - this.diffY,
    evt.clientX - this.diffX
  );
  diff = Object.assign.apply(null, this.getFunctions.map(item => item(diff)));
  this.resetPosition();
  this.props.setDiff(diff);
};

obj.onMouseDown = function (evt) {
  let {left, right, bottom, top} = window.getComputedStyle(evt.target);
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


obj.render = function () {
  let className = classNames(
    'resize-bar',
    types[this.props.type]
  );
  return <div ref='el' className={className} onMouseDown={this.onMouseDown}/>;
};

const ResizeBar = React.createClass(obj);

module.exports = ResizeBar;