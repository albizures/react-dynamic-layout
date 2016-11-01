const React = require('react');

const obj = {};

obj.displayName = 'Float'; 


obj.getDefaultProps = () => ({
  pos: {},
  size: {},
  resize: true
});

obj.propTypes = {
  size: React.PropTypes.object.isRequired,
  pos: React.PropTypes.object.isRequired,
  resize: React.PropTypes.bool.isRequired
};

obj.generateState = function () {
  return {
    pos: Object.assign({}, this.props.pos),
    size: Object.assign({}, this.props.size)
  };
};

obj.getInitialState = function () {
  return this.generateState();
};

obj.onMouseMove = function (evt) {
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

obj.onMouseUp = function () {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
};

obj.onMouseDown = function (evt) {
  var stats = evt.target.getBoundingClientRect();
  this.diffX = evt.clientX - stats.left;
  this.diffY = evt.clientY - stats.top;
  this.maxLeft = window.innerWidth - evt.target.clientWidth;
  this.maxTop = window.innerHeight - evt.target.clientHeight;
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};

obj.render = function () {
  let style = {
    top: this.state.pos.y,
    left: this.state.pos.x,
    width: this.state.size.width,
    height: this.state.size.height
  };

  return <div className='float' style={style}>
    <div className='drag-bar' onMouseDown={this.onMouseDown}/>
    {
      this.props.resize ? [
        <div key='n' className='resize-bar north'/>,
        <div key='s' className='resize-bar south'/>,
        <div key='e' className='resize-bar east'/>,
        <div key='w' className='resize-bar west'/>,
        <div key='ne' className='resize-bar north-east'/>,
        <div key='nw' className='resize-bar north-west'/>,
        <div key='sw' className='resize-bar south-west'/>,
        <div key='se' className='resize-bar south-east'/>
      ] : null
    }
    <div className='content-float'>
      {this.props.children}
    </div>
  </div>;
};

const Float = React.createClass(obj);

module.exports = Float;