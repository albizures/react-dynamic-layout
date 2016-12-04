
import { expect } from 'chai';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { mount } from 'enzyme';
import Float from '../lib/Float';
import ResizeBar from '../lib/ResizeBar';
import { Layout, ROW, COLUMN, STACK } from '../lib';
import Container from '../lib/Container';
import Stack from '../lib/Stack';
import { components, register } from '../lib/register';
import '../examples/components/Label';
import '../lib/style/base/index.styl';

function newValidDiv() {
  const node = document.createElement('div');
  node.style.position = 'absolute';
  node.style.width = '400px';
  node.style.height = '400px';
  return node;
}

describe('register', () => {
  it('unique component name', () => {
    expect(() => register(() => <div>bar</div>, 'sameName')).to.not.throw(Error);
    expect(() => register(() => <div>bar</div>, 'sameName')).to.throw(Error);
    expect(() => register(() => <div>bar</div>, 'otherName')).to.not.throw(Error);
  });

  it('register only components', () => {
    expect(() => register(<button>static button</button>, 'element')).to.throw(Error);
    expect(() => register(1, 'number')).to.throw(Error);
    expect(() => register({}, 'object')).to.throw(Error);
    expect(() => register('div', 'string')).to.not.throw(Error);
    expect(() => register(() => <div>bar</div>, 'stateless')).to.not.throw(Error);
    expect(() => register(class MyComponent extends Component {
      render() {
        if (this.state) {
          return <div>NewComponent</div>;
        }
        return <div>NewComponent</div>;
      }
    }, 'class')).to.not.throw(Error);
  });

  it('use displayName prop as name', () => {
    const name = 'foo';
    const component = () => <div></div>;

    expect(() => register(component)).to.throw(Error);
    component.displayName = name;
    expect(() => register(component)).to.not.throw(Error);
    expect(components[name]).to.be.equal(component);
  });
  it('register and render a new component', () => {
    const node = newValidDiv();
    document.body.appendChild(node);

    register(React.createClass({
      displayName: 'NewComponent',
      render() {
        return <div>NewComponent</div>;
      }
    }));
    register(class MyComponent2 extends Component {
      render() {
        if (this.state) {
          return <div>NewComponent</div>;
        }
        return <div>NewComponent</div>;
      }
    }, 'NewComponent2');

    const config = {
      children: [{
        name: 'NewComponent',
        component: 'NewComponent',
        size: 50
      }, {
        name: 'NewComponent2',
        component: 'NewComponent2',
        size: 50
      }],
      type: ROW
    };
    expect(() => render(<Layout {...config} />, node)).to.not.throw(Error);
  });
});

describe('renders without crashing', () => {
  let node;
  beforeEach(() => {
    node = newValidDiv();
    document.body.appendChild(node);
  });
  afterEach(() => {
    node.remove();
  });

  it('renders an empty layout', () => {
    const config = {
      children: [],
      type: ROW
    };
    let wrapper;
    expect(() => {
      wrapper = mount(<Layout {...config} />, { attachTo: node });
    }).to.not.throw(Error);

    expect([
      wrapper.find(Container).length,
      wrapper.find(ResizeBar).length,
      wrapper.find(Float).length,
      wrapper.find(Stack).length
    ]).to.eql([0, 0, 0, 0]);
  });

  it('renders an layout with children', () => {
    const config = {
      children: [{
        name: 'Left',
        component: 'Label',
        props: { text: 'Left' },
        size: 50
      }, {
        name: 'Right',
        type: COLUMN,
        children: [{
          name: 'Test',
          component: 'Label',
          props: { text: 'Left Top' },
          size: 50
        }, {
          name: 'Test',
          type: STACK,
          children: [{
            name: 'Right Button 1',
            component: 'Label',
            props: { text: 'Right Button 1' },
            size: 50
          }, {
            name: 'Right Button 2',
            component: 'Label',
            props: { text: 'Right Button 2' },
            size: 50
          }],
          size: 50
        }],
        size: 50
      }],
      type: ROW
    };
    render(<Layout {...config} />, node);
    // return new Promise(resolve => setTimeout(resolve, 1000));
  });

  it('render element with one child', () => {
    const config = {
      children: [{
        name: 'Test',
        component: 'Label',
        props: { text: 'Test' },
        size: 50
      }],
      type: ROW
    };
    const wrapper = mount(<Layout {...config} />, { attachTo: node });
    expect([
      wrapper.find(Container).length,
      wrapper.find(ResizeBar).length,
      wrapper.find(Float).length,
      wrapper.find(Stack).length
    ]).to.eql([1, 0, 0, 1]);
    // return new Promise(resolve => setTimeout(resolve, 500));
  });
});

