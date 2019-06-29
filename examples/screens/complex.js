import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';
import Tabs from '../../src/components/Tabs';
import Float from '../../src/components/Float';

import CenterName from '../components/CenterName';

const toggle = (val) => !val;

const Complex = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
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
    </Float>,
  ];
  return (
    <Layout floats={floats} type={Layout.ROW}>
      <Container initialSize="20%">
        <button onClick={() => setIsModalOpen(toggle)}>
          {isModalOpen ? 'Close' : 'Open'}
        </button>
      </Container>
      <Container isFixedSize={true} initialSize="20%">
        {({ dimensions }) => (
          <CenterName
            name={`Tab 1 - ${dimensions.width} x ${dimensions.height}`}
          />
        )}
      </Container>
      <Container>
        <Tabs>
          <Tabs.Item title="Tab 1" name="tab-1">
            {({ dimensions }) => (
              <CenterName
                name={`Tab 1 - ${dimensions.width} x ${dimensions.height}`}
              />
            )}
          </Tabs.Item>
          <Tabs.Item title="Tab 2" name="tab-2">
            {({ dimensions }) => (
              <CenterName
                name={`Tab 2 - ${dimensions.width} x ${dimensions.height}`}
              />
            )}
          </Tabs.Item>
        </Tabs>
      </Container>
    </Layout>
  );
};

ReactDOM.render(<Complex />, document.getElementById('root'));
