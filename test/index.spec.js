
import { expect } from 'chai';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Layout, ROW } from '../src';
import { components, register } from '../src/Register';
import '../examples/components/Label';
import '../src/style/base/index.styl';

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
