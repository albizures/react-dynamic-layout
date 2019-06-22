<h1 align="center">Welcome to react-dynamic-layout 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version- -blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/albizures/react-dynamic-layout#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/albizures/react-dynamic-layout/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/albizures/react-dynamic-layout/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/_albizures">
    <img alt="Twitter: _albizures" src="https://img.shields.io/twitter/follow/_albizures.svg?style=social" target="_blank" />
  </a>
</p>

> React Dynamic Layout is a dock layout system inspired by [Golden Layout](https://golden-layout.com), made with react.js

### 🏠 [Homepage](https://github.com/albizures/react-dynamic-layout)

## Features

- Easy way to create layouts
- Multiple levels of hierarchy
- Float windows
- Panel stack
- Multiple themes
- Resizable

## Install

```sh
npm install --save react-dynamic-layout
```

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { Layout, Container } from 'react-dynamic-layout';

import CenterName from '../components/CenterName';

const SimpleExample = () => (
  <Layout type={Layout.COLUMN}>
    <Container initialSize="30%">
      <CenterName name="Top" />
    </Container>
    <Container>
      <Layout type={Layout.ROW}>
        <Container>
          <CenterName name="Bottom Left" />
        </Container>
        <Container>
          <CenterName name="Bottom Right" />
        </Container>
      </Layout>
    </Container>
  </Layout>
);

ReactDOM.render(<SimpleExample />, document.getElementById('root'));
```

> NOTE: Look into example folder for more advanced usages

## Author

👤 **Jose Albizures**

- Twitter: [@\_albizures](https://twitter.com/_albizures)
- Github: [@albizures](https://github.com/albizures)

## Wishlist

- Drag and Drop
- Layout serialization
- Open and close tabs

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/albizures/react-dynamic-layout/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Jose Albizures](https://github.com/albizures).<br />
This project is [MIT](https://github.com/albizures/react-dynamic-layout/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
