import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';
import Float from '../../src/components/Float';
import Dragbar from '../../src/components/Float/Dragbar';

const toggle = (val: boolean): boolean => !val;

const WithFloats: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = (): void => setIsModalOpen(toggle);

  const dragbar = <Dragbar onClose={onClose} />;

  const floats = [
    <Float
      dragbar={dragbar}
      isOpen={isModalOpen}
      initialWidth={300}
      initialHeight={300}
      initialTop={100}
      initialLeft={100}
      key="1"
    >
      <Layout type={Layout.COLUMN}>
        <Container>
          <button onClick={onClose}>{isModalOpen ? 'Close' : 'Open'}</button>
        </Container>
      </Layout>
    </Float>,
  ];
  return (
    <Layout floats={floats} type={Layout.COLUMN}>
      <Container>
        <button onClick={onClose}>{isModalOpen ? 'Close' : 'Open'}</button>
      </Container>
    </Layout>
  );
};

ReactDOM.render(<WithFloats />, document.getElementById('root'));
