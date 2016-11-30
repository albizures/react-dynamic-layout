
import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Layout, ROW } from '../lib';
import '../examples/components/Label';

describe('renders without crashing', () => {
  let node;
  beforeEach(() => {
    node = document.createElement('div');
    node.style.position = 'absolute';
    node.style.width = '300px';
    node.style.height = '300px';
    document.body.appendChild(node);
  });

  it('renders an empty layout', () => {
    const config = {
      children: [],
      type: ROW
    };
    expect(() => ReactDOM.render(<Layout {...config} />, node)).to.not.throw(Error);
  });


  it('renders an layout with children', () => {
    const config = {
      children: [

      ],
      type: ROW
    };
    expect(() => ReactDOM.render(<Layout {...config} />, node)).to.not.throw(Error);
  });
});


describe('has classes', () => {
  let node;
  beforeEach(() => {
    node = document.createElement('div');
    node.style.position = 'absolute';
    node.style.width = '300px';
    node.style.height = '300px';
    document.body.appendChild(node);
  });

  it('has `rdl-layout` class', () => {
    const config = {
      children: [{
        name: 'Left',
        component: 'Label',
        props: { text: 'Left' },
        size: 50
      }],
      type: ROW
    };
    const wrapper = mount(<Layout {...config} />, { attachTo: node }).first();
    console.log(wrapper.hasClass('rdl-layout'), wrapper.html());
    expect(wrapper.find('Layout').hasClass('rdl-layout')).to.be.true;
  });
});

describe('register components', () => {

});
