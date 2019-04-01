import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import store, { actions } from './store';
import { NumberOrString } from './types';
import ResizeBar from './ResizeBar';
import Layout from './Layout';

const { parseInt } = Number;
const { updateFloat, closeFloat } = actions;

const obj = {};

obj.displayName = 'Float';

obj.getDefaultProps = () => ({
  resize: true,
});

obj.propTypes = {
  id: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  x: NumberOrString.isRequired,
  y: NumberOrString.isRequired,
  width: NumberOrString.isRequired,
  height: NumberOrString.isRequired,
  resize: PropTypes.bool,
  open: PropTypes.bool,
};

obj.onMouseMove = function onMouseMove(evt) {
  const { y, x } = this.getPosition(evt);
  this.refs.el.style.top = y + 'px';
  this.refs.el.style.left = x + 'px';
};

obj.getPosition = function getPosition(evt) {
  let y = evt.clientY - this.diffY;
  let x = evt.clientX - this.diffX;
  if (y < 25) {
    y = 25;
  }
  if (x < 0) {
    x = 0;
  }
  if (x > this.maxLeft) {
    x = this.maxLeft;
  }
  if (y > this.maxTop) {
    y = this.maxTop;
  }
  return { y, x };
};

obj.onMouseUp = function onMouseUp(evt) {
  const { y, x } = this.getPosition(evt);
  store.dispatch(updateFloat(this.props.id, { x, y }));
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
};

obj.onMouseDown = function onMouseDown(evt) {
  const stats = evt.target.getBoundingClientRect();
  this.diffX = evt.clientX - stats.left;
  this.diffY = evt.clientY - stats.top;
  this.maxLeft = window.innerWidth - evt.target.clientWidth;
  this.maxTop = window.innerHeight - evt.target.clientHeight;
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};

obj.setDiff = function setDiff(diff) {
  const x = this.props.x + (diff.x || 0);
  const y = this.props.y + (diff.y || 0);

  const width = parseInt(this.props.width, 10) + (diff.width || 0);
  const height = parseInt(this.props.height, 10) + (diff.height || 0);

  store.dispatch(
    updateFloat(this.props.id, {
      x,
      y,
      width,
      height,
    }),
  );
};

obj.onResize = function onResize(fn) {
  this.resizeLayout = fn;
};

obj.componentDidUpdate = function componentDidUpdate() {
  if (this.resizeLayout) {
    this.resizeLayout();
  }
};

obj.onClose = function onClose(evt) {
  evt.stopPropagation();
  store.dispatch(closeFloat(this.props.id));
};

obj.render = function render() {
  const layout = store.getLayout(this.props.layout);
  const style = {
    top: this.props.y,
    left: this.props.x,
    width: this.props.width,
    height: this.props.height,
  };
  const className = classNames('rdl-float', { active: this.props.open });
  return (
    <div className={className} ref="el" style={style}>
      <div className="rdl-drag-bar" onMouseDown={this.onMouseDown}>
        <button className="close" onMouseDown={this.onClose}>
          &times;
        </button>
      </div>
      {this.props.resize
        ? [
            <ResizeBar setDiff={this.setDiff} key="n" type="n" />,
            <ResizeBar setDiff={this.setDiff} key="s" type="s" />,
            <ResizeBar setDiff={this.setDiff} key="e" type="e" />,
            <ResizeBar setDiff={this.setDiff} key="w" type="w" />,
            <ResizeBar setDiff={this.setDiff} key="ne" type="ne" />,
            <ResizeBar setDiff={this.setDiff} key="nw" type="nw" />,
            <ResizeBar setDiff={this.setDiff} key="sw" type="sw" />,
            <ResizeBar setDiff={this.setDiff} key="se" type="se" />,
          ]
        : null}
      <div className="rdl-content-float">
        <Layout
          containers={layout.containers}
          childrenProcess={layout.childrenProcess}
          type={layout.type}
          hiddenType={layout.hiddenType}
          resize={layout.resize}
          id={layout.id}
        />
      </div>
    </div>
  );
};

const Float = createClass(obj);

export default Float;
