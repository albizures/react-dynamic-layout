import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';
import Float from '../../src/components/Float';

const toggle = (val) => !val;

const WithFloats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const floats = [
    <Float
      isOpen={isModalOpen}
      initialWidth={300}
      initialHeight={300}
      initialTop={100}
      initialLeft={100}
      key="1"
    >
      <Layout type={Layout.COLUMN}>
        <Container>
          <button onClick={() => setIsModalOpen(toggle)}>
            {isModalOpen ? 'Close' : 'Open'}
          </button>
        </Container>
      </Layout>
    </Float>,
  ];
  return (
    <Layout floats={floats} type={Layout.COLUMN}>
      <Container>
        <button onClick={() => setIsModalOpen(toggle)}>
          {isModalOpen ? 'Close' : 'Open'}
        </button>
      </Container>
    </Layout>
  );
};

ReactDOM.render(<WithFloats />, document.getElementById('root'));
