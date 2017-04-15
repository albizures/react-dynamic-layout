[![npm version](https://img.shields.io/npm/v/react-dynamic-layout.svg?style=flat-square)](https://www.npmjs.com/package/react-dynamic-layout)
[![Build Status](https://travis-ci.org/albizures/react-dynamic-layout.svg?branch=master)](https://travis-ci.org/albizures/react-dynamic-layout)

# React Dynamic Layout

React Dynamic Layout is a dock layout system inspired by [Golden Layout](https://golden-layout.com), made with react.js

## Features

* Easy way to create layouts
* Multiple levels of hierarchy
* Float windows
* Panel stack
* Multiple themes
* Resizable

## Installation

    $ npm install --save react-dynamic-layout

## Example

```js
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Layout, Register, Container, ROW, COLUMN } from 'react-dynamic-layout';

const Label = ({ text }) => <label>{ text }</label>

const Example = () => <Layout name='Main' type={COLUMN}>
    <Container size={50}>
        <Register type={Label} props={{ text: 'Left' }}/>
    </Container>
    <Container size={50} tabs={false}>
        <Layout type={ROW} name='Right'>
            <Container size={50}>
                <Register type={Label} props={{ text: 'Right top - tab 1' }}/>
                <Register type={Label} props={{ text: 'Right top - tab 2' }}/>
            </Container>
            <Container size={50} >
                <Register type={Label} props={{ text: 'Right bottom - tab 1' }}/>
                <Register type={Label} props={{ text: 'Right bottom - tab 2' }}/>
            </Container>
        </Layout>
    </Container>
</Layout>;
ReactDOM.render(
    <Example/>,
    document.getElementById('root')
);
```
## TODO
* Drag and Drop
* Layout serialization
* Compatibility with redux
* Open and close tabs
* Modals
