import React from 'react';
import ReactDOM from 'react-dom';

import Layout from '../../src/components/Layout';
import Container from '../../src/components/Container';

import ShowDimensions from '../components/ShowDimensions';
import { LayoutType } from '../../src/types';
import { Dimensions } from '../../src/hooks/useDimensions';

interface PropTypes {
  deep: number;
  type: LayoutType;
  dimensions?: Dimensions;
}

const Part: React.FC<PropTypes> = (props) => {
  const { deep, type, dimensions: currentDimensions } = props;
  if (deep >= 4 && currentDimensions) {
    return (
      <ShowDimensions
        width={currentDimensions.width}
        height={currentDimensions.height}
      />
    );
  }

  const nextType = type === Layout.ROW ? Layout.COLUMN : Layout.ROW;

  return (
    <Layout type={type}>
      <Container>
        {({ dimensions }) => (
          <ShowDimensions width={dimensions.width} height={dimensions.height} />
        )}
      </Container>
      <Container>
        {({ dimensions }) => (
          <Part deep={deep + 1} type={nextType} dimensions={dimensions} />
        )}
      </Container>
    </Layout>
  );
};

const Nested: React.FC = () => {
  return <Part deep={0} type={Layout.ROW} />;
};

ReactDOM.render(<Nested />, document.getElementById('root'));
