import React from 'react';
import { Layout, Float, Register, Container, ROW, COLUMN, OPACITY } from '../src';
import './index.styl';
// import Label from './components/Label';
import Size from './components/Size';

export default () => <Layout name='Main' type={ROW} hiddenType={OPACITY} resize={false}>
  <Float width='200px' height='200px' x='300px' y='100px'>
    <Layout name='Float' type={ROW} resize={true}>
      <Container size={50}>
        <Register type={Size} props={{ text: 'Float' }}/>
      </Container>
       <Container size={50}>
        <Register type={Size} props={{ text: 'Float' }}/>
      </Container>
    </Layout>
  </Float>
  <Container size='25px' tabs={false}>
    <Register type={Size} props={{ text: 'Top' }}/>
  </Container>
  <Container size='calc(100% - 25px)' tabs={false}>
    <Layout type={COLUMN} name='Left'>
      <Container size={15}>
        <Register type={Size} props={{ text: 'Left top' }}/>
        <Register type={Size} props={{ text: 'Left bottom' }}/>
      </Container>
      <Container size={70} tabs={false}>
        <Layout type={ROW} name='Center' resize={false}>
          <Container size='20px' tabs={false}>
            <Register type={Size} props={{ text: 'Center top' }}/>
          </Container>
          <Container size='calc(100% - 20px)' tabs={false}>
            <Register type={Size} props={{ text: 'Center bottom' }}/>
          </Container>
        </Layout>
      </Container>
      <Container size={15} tabs={false}>
        <Layout type={ROW} name='Right'>
          <Container size={50}>
            <Register type={Size} props={{ text: 'Right top' }}/>
          </Container>
          <Container size={50}>
            <Register type={Size} props={{ text: 'Right bottom' }}/>
          </Container>
        </Layout>
      </Container>
    </Layout>
  </Container>
</Layout>;
