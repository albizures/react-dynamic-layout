import React from 'react';
import Layout from './Layout';
import { components } from './register.js';
const obj = {};

const tabHeight = 16;

obj.displayName = 'Stack';

obj.getDefaultProps = () => ({
  tabs: true,
  active: 0
});

obj.propTypes = {
  children: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  tabs: React.PropTypes.bool,
  active: React.PropTypes.number
};

obj.getInitialState = function () {
  return {
    active: this.props.active
  };
};

obj.processChildren = function () {
  let children = [];
  let tabs = [];
  for (let index = 0; index < this.props.children.length; index++) {
    let child = this.props.children[index];
    let activeClass = index === this.state.active ? 'active' : ''; 
    let newChild;
    tabs.push(
      <div onClick={() => this.setState({active: index})} key={index} className={'rdl-tab ' + activeClass}>
        {child.name}
      </div>
    );
    if (Array.isArray(child.children)) {
      newChild = <div className={'rdl-item-body ' + activeClass} key={index}>
        <Layout {...child}/>
      </div>;
    } else {
      let Component = components[child.component];
      newChild = <div className={'rdl-item-body ' + activeClass} key={index}>
        <Component {...child.props}/>
      </div>;
    }
    children.push(newChild);
  }
  return {
    tabs,
    children
  };
};

obj.render = function () {
  let {tabs, children} = this.processChildren();
  let bodyHeight = this.props.height - (this.props.tabs ? tabHeight : 0);
  return <div className='rdl-stack'>
    {this.props.tabs? <div className='rdl-tabs' style={{height: tabHeight}}>{tabs}</div> : null}
    <div className='rdl-body' style={{height: bodyHeight}}>
      {children}
    </div>
  </div>;
};

export default React.createClass(obj);