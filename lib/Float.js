import React from 'react';

import ResizeBar from './ResizeBar';
import Layout from './Layout';

const obj = {};
const { parseInt } = Number;
obj.displayName = 'Float';


obj.getDefaultProps = () => ({
  pos: {},
  size: {},
  resize: true
});

obj.propTypes = {
  size: React.PropTypes.object.isRequired,
  pos: React.PropTypes.object.isRequired,
  resize: React.PropTypes.bool.isRequired,
  layout: React.PropTypes.object.isRequired
};

obj.generateState = function generateState() {
  return {
    pos: Object.assign({}, this.props.pos),
    size: Object.assign({}, this.props.size)
  };
};

obj.getInitialState = function getInitialState() {
  return this.generateState();
};

obj.onMouseMove = function onMouseMove(evt) {
  let top = evt.clientY - this.diffY;
  let left = evt.clientX - this.diffX;
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
  const stats = evt.target.getBoundingClientRect();
  this.diffX = evt.clientX - stats.left;
  this.diffY = evt.clientY - stats.top;
  this.maxLeft = window.innerWidth - evt.target.clientWidth;
  this.maxTop = window.innerHeight - evt.target.clientHeight;
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};

obj.setDiff = function setDiff(diff) {
  const pos = {};
  const size = {};
  pos.x = this.state.pos.x + (diff.x || 0);
  pos.y = this.state.pos.y + (diff.y || 0);

  size.width = parseInt(this.state.size.width, 10) + (diff.width || 0);
  size.height = parseInt(this.state.size.height, 10) + (diff.height || 0);

  this.setState({ pos, size });
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
  const style = {
    top: this.state.pos.y,
    left: this.state.pos.x,
    width: this.state.size.width,
    height: this.state.size.height
  };
  return <div className='rdl-float' style={style}>
    <div className='rdl-drag-bar' onMouseDown={this.onMouseDown}/>
    {
      this.props.resize ? [
        <ResizeBar setDiff={this.setDiff} key='n' type='n' />,
        <ResizeBar setDiff={this.setDiff} key='s' type='s' />,
        <ResizeBar setDiff={this.setDiff} key='e' type='e' />,
        <ResizeBar setDiff={this.setDiff} key='w' type='w' />,
        <ResizeBar setDiff={this.setDiff} key='ne' type='ne' />,
        <ResizeBar setDiff={this.setDiff} key='nw' type='nw' />,
        <ResizeBar setDiff={this.setDiff} key='sw' type='sw' />,
        <ResizeBar setDiff={this.setDiff} key='se' type='se' />
      ] : null
    }
    <div className='rdl-content-float'>
      <Layout onResize={this.onResize} root={false} {...this.props.layout} />
    </div>
  </div>;
};

const Float = React.createClass(obj);

export default Float;
