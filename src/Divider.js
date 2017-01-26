import React from 'react';
import { ROW, COLUMN } from './Container';
import store, { actions } from './store';
import { getSizeProperties } from './utils/components';

const { updateContainer } = actions;

const obj = {};

obj.displayName = 'Divider';

obj.propTypes = {
  type: React.PropTypes.oneOf([ROW, COLUMN]),
  idBefore: React.PropTypes.any.isRequired,
  idAfter: React.PropTypes.any.isRequired
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
  return { top, left };
};

obj.setRow = function setRow({ top }) {
  this.refs.el.style.top = ((top - this.initPos.top) + this.initRelactivePos.top) + 'px';
};
obj.setColumn = function setColumn({ left }) {
  this.refs.el.style.left = ((left - this.initPos.left) + this.initRelactivePos.left) + 'px';
};

obj.getRow = function getRow({ top }) {
  return {
    height: (top - this.initPos.top)
  };
};

obj.getColumn = function getColumn({ left }) {
  return {
    width: (left - this.initPos.left)
  };
};

obj.getInitialState = function getInitialState() {
  const isRow = this.props.type === 'row';

  this.setFunction = isRow ? this.setRow : this.setColumn;
  this.getFunction = isRow ? this.getRow : this.getColumn;
  return null;
};


obj.onMouseMove = function onMouseMove(evt) {
  this.setFunction(
    this.normalize(
      evt.clientY - this.diffY,
      evt.clientX - this.diffX
    )
  );
};

obj.setDiff = function setDiff(diff) {
  const { containers } = store.getState();
  const { portion } = getSizeProperties(this.props.type);
  const before = containers[this.props.idBefore];
  const after = containers[this.props.idAfter];
  store.dispatch(updateContainer(before.id, {
    [portion]: before[portion] + diff[portion]
  }, false));
  store.dispatch(updateContainer(after.id, {
    [portion]: after[portion] - diff[portion]
  }));
};

obj.onMouseUp = function onMouseUp(evt) {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  this.resetPosition();
  this.setDiff(
    this.getFunction(this.normalize(
      evt.clientY - this.diffY,
      evt.clientX - this.diffX
    ))
  );
};

obj.onMouseDown = function onMouseDown(evt) {
  const { left, top } = window.getComputedStyle(evt.target);
  const stats = this.initPos = evt.target.getBoundingClientRect();
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
  const classNameDivider = 'rdl-divider-' + this.props.type;
  return <div className={classNameDivider}>
    <div ref='el' className='rdl-divider-content' onMouseDown={this.onMouseDown}></div>
  </div>;
};

export default React.createClass(obj);
