import React from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';

import CenterName from '../components/CenterName';

const SimpleExample = () => (
  <Layout type={Layout.COLUMN}>
    <Container>
      <CenterName name="Top" />
    </Container>
    <Container>
      <Layout type={Layout.COLUMN}>
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
