import React from 'react';

import { Layout, Register, Container, ROW, COLUMN, RENDER } from '../../src';
import Label from '../components/Label';

export default () => <Layout name='Main' type={COLUMN} hiddenType={RENDER}>
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
