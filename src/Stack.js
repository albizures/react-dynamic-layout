import React from 'react';
import Layout from './Layout';
import { components } from './Register';
import store, { actions } from './store';
import { RENDER } from './types';

const { closeFloat, openFloat, updateComponentProps } = actions;

const obj = {};

const tabHeight = 16;

obj.displayName = 'Stack';

obj.contextTypes = {
  hiddenType: React.PropTypes.string
};

obj.getDefaultProps = () => ({
  tabs: true,
  active: 0
});

obj.propTypes = {
  components: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  tabs: React.PropTypes.bool,
  active: React.PropTypes.number
};

obj.getInitialState = function getInitialState() {
  this.components = {};
  if (this.props.active > -1 && this.props.active < this.props.components.length) {
    return {
      active: this.props.active
    };
  }
  return {
    active: 0
  };
};

obj.getLayout = function getLayout(component, className) {
  const layout = store.getLayout(component.layout);
  return <div className={'rdl-item-body ' + className} key={component.id}>
    <Layout
      containers={layout.containers}
      childrenProcess={layout.childrenProcess}
      type={layout.type}
      resize={layout.resize}
      id={component.layout}
    />
  </div>;
};

obj.getComponent = function getComponent(data, className) {
  const Component = components[data.componentName];
  return <div className={'rdl-item-body ' + className} key={data.id}>
    <Component
      {...data.props}
      rdWidth={this.props.width}
      rdHeight={this.props.height + tabHeight}
      rdCloseFloat={id => store.dispatch(closeFloat(id))}
      rdOpenFloat={id => store.dispatch(openFloat(id))}
      rdChangeProps={(id, props) => store.dispatch(updateComponentProps(id, props))}
    />
  </div>;
};

obj.getChild = function getChild(component, className) {
  if (component.isLayout) {
    return this.getLayout(component, className);
  }
  return this.getComponent(component, className);
};

obj.processChildren = function processChildren() {
  const children = [];
  const tabs = [];
  for (let index = 0; index < this.props.components.length; index++) {
    const component = this.props.components[index];
    const isActive = index === this.state.active;
    const activeClass = isActive ? 'active' : '';
    tabs.push(
      <div onClick={() => this.setState({ active: index })} key={component.id} className={'rdl-tab ' + activeClass}>
        {component.name}
      </div>
    );
    if (!(this.context.hiddenType === RENDER && !isActive)) {
      children.push(
        this.getChild(component, activeClass)
      );
    }
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
