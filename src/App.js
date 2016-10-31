import React from 'react';
import { Layout, ROW, COLUMN, STACK } from './components/Layout.js';

const config = {
  type: ROW,
  resize: false,
  children: [{
    component: 'Label',
    name: 'Menu',
    tabs: false,
    props: {text: 'Menu'},
    size: '25px'
  }, {
    type: COLUMN,
    tabs: false,
    name: 'body',
    size: 'calc(100% - 25px)',
    children: [{
      name: 'Left',
      type: STACK,
      tabs: false,
      props: {text: 'Left'},
      size: 15,
      children: [{
        name: 'Frames',
        component: 'Label',
        props: {text: 'Frames'}
      }, {
        name: 'Layers',
        component: 'Label',
        props: {text: 'Layers'}
      }]
    }, {
      name: 'Center',
      type: ROW,
      tabs: false,
      size: 70,
      children: [{
        name: 'Sprites',
        tabs: false,
        component: 'Label',
        props: {text: 'Sprites'},
        size: '20px'
      }, {
        name: 'Canvas',
        tabs: false,
        component: 'Label',
        props: {text: 'Canvas'},
        size: 'calc(100% - 20px)'
      }]
    }, {
      name: 'Right',
      size: 15,
      tabs: false,
      type: ROW,
      children: [{
        name: 'Right Top',
        component: 'Label',
        props: {text: 'Right Top'},
        size: 50
      }, {
        name: 'Right Bottom',
        component: 'Label',
        props: {text: 'Right Bottom'},
        size: 50
      }]
    }]
  }]
};

export default () => <Layout {...config}/>;