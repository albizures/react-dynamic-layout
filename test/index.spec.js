import React, { Component } from 'react';
import createClass from 'create-react-class';
import { render } from 'react-dom';
import { Layout, ROW } from '../src';
import { components, register } from '../src/Register';
import '../examples/components/Label';

function newValidDiv() {
  const node = document.createElement('div');
  node.style.position = 'absolute';
  node.style.width = '400px';
  node.style.height = '400px';
  return node;
}

describe('register', () => {
  it('unique component name', () => {
    expect(() => register(() => <div>bar</div>, 'sameName')).not.toThrow();
    expect(() => register(() => <div>bar</div>, 'sameName')).toThrow();
    expect(() => register(() => <div>bar</div>, 'otherName')).not.toThrow();
  });

  it('register only components', () => {
    expect(() => register(<button>static button</button>, 'element')).toThrow();
    expect(() => register(1, 'number')).toThrow();
    expect(() => register({}, 'object')).toThrow();
    expect(() => register('div', 'string')).not.toThrow();
    expect(() => register(() => <div>bar</div>, 'stateless')).not.toThrow();
    expect(() =>
      register(
        class MyComponent extends Component {
          render() {
            if (this.state) {
              return <div>NewComponent</div>;
            }
            return <div>NewComponent</div>;
          }
        },
        'class',
      ),
    ).not.toThrow();
  });

  it('use displayName prop as name', () => {
    const name = 'foo';
    const component = () => <div />;

    expect(() => register(component)).toThrow();
    component.displayName = name;
    expect(() => register(component)).not.toThrow();
    expect(components[name]).toBe(component);
  });

  it.skip('register and render a new component', () => {
    const node = newValidDiv();
    document.body.appendChild(node);

    register(
      createClass({
        displayName: 'NewComponent',
        render() {
          return <div>NewComponent</div>;
        },
      }),
    );
    register(
      class MyComponent2 extends Component {
        render() {
          if (this.state) {
            return <div>NewComponent</div>;
          }
          return <div>NewComponent</div>;
        }
      },
      'NewComponent2',
    );

    const config = {
      children: [
        {
          name: 'NewComponent',
          component: 'NewComponent',
          size: 50,
        },
        {
          name: 'NewComponent2',
          component: 'NewComponent2',
          size: 50,
        },
      ],
      type: ROW,
    };
    expect(() => render(<Layout {...config} />, node)).not.toThrow();
  });
});
