import React from 'react';
import {
  Layout,
  Float,
  Register,
  Container,
  ROW,
  COLUMN,
  RENDER,
  cuid,
} from '../../src';
import Size from '../components/Size';
import Label from '../components/Label';

const idFloat = cuid();
const idComponent = cuid();

const openModal = (props) => (
  <div>
    <button onClick={() => props.rdOpenFloat(idFloat)}>Open: {idFloat}</button>
    <button onClick={() => props.rdCloseFloat(idFloat)}>
      Close: {idFloat}
    </button>
    <button
      onClick={() => props.rdChangeProps(idComponent, { text: 'New Text' })}
    >
      Update props to :{idComponent}
    </button>
  </div>
);

export default () => (
  <Layout name="Main" type={ROW} hiddenType={RENDER} resize={false}>
    <Float width="200px" height="200px" x="300px" y="100px" id={idFloat}>
      <Layout name="Float" type={ROW} resize={true}>
        <Container size={50}>
          <Register
            id={idComponent}
            type={Label}
            props={{ text: 'Old text', idFloat }}
          />
        </Container>
        <Container size={50}>
          <Register type={Size} props={{ text: 'Float' }} />
        </Container>
      </Layout>
    </Float>
    <Container size="25px" tabs={false}>
      <Register type={Size} props={{ text: 'Top' }} />
    </Container>
    <Container size="calc(100% - 25px)" tabs={false}>
      <Layout type={COLUMN} name="Left">
        <Container size={15}>
          <Register type={Size} props={{ text: 'Left top' }} />
          <Register type={Size} props={{ text: 'Left bottom' }} />
        </Container>
        <Container size={70} tabs={false}>
          <Layout type={ROW} name="Center" resize={false}>
            <Container size="20px" tabs={false}>
              <Register type={Size} props={{ text: 'Center top' }} />
            </Container>
            <Container size="calc(100% - 20px)" tabs={false}>
              <Register
                type={openModal}
                name="openModal"
                props={{ text: 'Center bottom', idFloat }}
              />
            </Container>
          </Layout>
        </Container>
        <Container size={15} tabs={false}>
          <Layout type={ROW} name="Right">
            <Container size={50}>
              <Register type={Size} props={{ text: 'Right top' }} />
            </Container>
            <Container size={50}>
              <Register type={Size} props={{ text: 'Right bottom' }} />
            </Container>
          </Layout>
        </Container>
      </Layout>
    </Container>
  </Layout>
);
