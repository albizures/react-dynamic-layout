import React from 'react';
import Layout from './Layout';
import { components } from './register';

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

obj.getInitialState = function getInitialState() {
  return {
    active: this.props.active
  };
};

obj.processChildren = function processChildren() {
  const children = [];
  const tabs = [];
  for (let index = 0; index < this.props.children.length; index++) {
    const child = this.props.children[index];
    const activeClass = index === this.state.active ? 'active' : '';
    let newChild;
    tabs.push(
      <div onClick={() => this.setState({ active: index })} key={index} className={'rdl-tab ' + activeClass}>
        {child.name}
      </div>
    );
    if (Array.isArray(child.children)) {
      newChild = <div className={'rdl-item-body ' + activeClass} key={index}>
        <Layout root={false} {...child}/>
      </div>;
    } else {
      const Component = components[child.component];
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

obj.render = function render() {
  const { tabs, children } = this.processChildren();
  const bodyHeight = this.props.height - (this.props.tabs ? tabHeight : 0);
  return <div className='rdl-stack'>
    {this.props.tabs ? <div className='rdl-tabs' style={{ height: tabHeight }}>{tabs}</div> : null}
    <div className='rdl-body' style={{ height: bodyHeight }}>
      {children}
    </div>
  </div>;
};

export default React.createClass(obj);
