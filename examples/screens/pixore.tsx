import ReactDOM from 'react-dom';
import React from 'react';
import { Layout, Container } from '../../src';
import CenterName from '../components/CenterName';
import Label from '../components/Label';
import ShowDimensions from '../components/ShowDimensions';

const Pixore: React.FC = () => (
  <Layout type={Layout.COLUMN}>
    <Container isFixedSize={true} initialSize={25}>
      <Label text="Menus" />
    </Container>
    <Container>
      <Layout type={Layout.ROW}>
        <Container initialSize="15%">
          <CenterName name="Palette" />
        </Container>
        <Container initialSize="85%">
          <Layout type={Layout.COLUMN}>
            <Container>
              <Layout type={Layout.ROW}>
                <Container id="canvas">
                  <Layout type={Layout.COLUMN}>
                    <Container isFixedSize={true} initialSize={25}>
                      <Label text="Tabs" />
                    </Container>
                    <Container>
                      <CenterName name="Canvas" />
                    </Container>
                  </Layout>
                </Container>
                <Container id="tools" isFixedSize={true} initialSize={60}>
                  <Label text="Tools" />
                </Container>
              </Layout>
            </Container>
            <Container initialSize={200}>
              {({ dimensions }) => (
                <Layout type={Layout.ROW}>
                  <Container>
                    <CenterName name="Frames and Layers" />
                  </Container>
                  <Container isFixedSize={true} initialSize={dimensions.height}>
                    {({ dimensions: dim }) => (
                      <ShowDimensions width={dim.width} height={dim.height} />
                    )}
                  </Container>
                </Layout>
              )}
            </Container>
          </Layout>
        </Container>
      </Layout>
    </Container>
  </Layout>
);

ReactDOM.render(<Pixore />, document.getElementById('root'));
