const React = require('react');
const obj = {};

obj.displayName = 'Divider';

obj.propTypes = {
  type: React.PropTypes.oneOf(['row', 'column']),
  setDiff: React.PropTypes.func.isRequired,
  keyBefore: React.PropTypes.any.isRequired,
  keyAfter: React.PropTypes.any.isRequired,
};

obj.resetPosition = function () {
  this.refs.el.style = {};
  this.refs.el.classList.toggle('active');
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

obj.setRow = function ({top}) {
  this.refs.el.style.top = (top - this.initPos.top + this.initRelactivePos.top) + 'px';
};
obj.setColumn = function ({left}) {
  this.refs.el.style.left = (left - this.initPos.left + this.initRelactivePos.left) + 'px';
};

obj.getRow = function ({top}) {
  return {
    height: (top - this.initPos.top)
  };
};

obj.getColumn = function ({left}) {
  return {
    width: (left - this.initPos.left)
  };
};

obj.getInitialState = function () {
  let isRow = this.props.type === 'row';

  this.setFunction = isRow ? this.setRow : this.setColumn;
  this.getFunction = isRow ? this.getRow : this.getColumn;
  return null;
};


obj.onMouseMove = function (evt) {
  this.setFunction(
    this.normalize(
      evt.clientY - this.diffY,
      evt.clientX - this.diffX
    )
  );
};

obj.onMouseUp = function (evt) {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  this.resetPosition();
  this.props.setDiff(
    this.props.keyBefore,
    this.props.keyAfter,
    this.getFunction(this.normalize(
      evt.clientY - this.diffY,
      evt.clientX - this.diffX
    ))
  );
};

obj.onMouseDown = function (evt) {
  let {left, top} = window.getComputedStyle(evt.target);
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


obj.render = function () {
  let classNameDivider = 'divider-' + this.props.type;
  return <div className={classNameDivider}>
    <div ref='el' className='divider-content' onMouseDown={this.onMouseDown}></div>
  </div>;
};

const Divider = React.createClass(obj);

module.exports = Divider;