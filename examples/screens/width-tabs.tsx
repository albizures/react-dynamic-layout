import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';
import Tabs from '../../src/components/Tabs';

import CenterName from '../components/CenterName';

const WidthTabs: React.FC = () => {
  const [tab, setTab] = useState();

  return (
    <Layout type={Layout.ROW}>
      <Container>
        <Tabs tab={tab} onSelect={(name) => setTab(name)}>
          <Tabs.Item title="Controlled Tab 1" name="controlled-tab-1">
            <CenterName name="Controlled Tab 1" />
          </Tabs.Item>
          <Tabs.Item title="Controlled Tab 2" name="controlled-tab-2">
            <CenterName name="Controlled Tab 2" />
          </Tabs.Item>
        </Tabs>
      </Container>
      <Container>
        <Tabs>
          <Tabs.Item title="Uncontrolled Tab 1" name="uncontrolled-tab-1">
            <CenterName name="Uncontrolled Tab 1" />
          </Tabs.Item>
          <Tabs.Item title="Uncontrolled Tab 2" name="uncontrolled-tab-2">
            <CenterName name="Uncontrolled Tab 2" />
          </Tabs.Item>
        </Tabs>
      </Container>
    </Layout>
  );
};

ReactDOM.render(<WidthTabs />, document.getElementById('root'));
