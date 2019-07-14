import React from 'react';

import CenterName from './CenterName';

interface PropTypes {
  width: number;
  height: number;
}

const ShowDimensions: React.FC<PropTypes> = (props) => {
  const { width, height } = props;

  return <CenterName name={`${width} x ${height}`} />;
};

export default ShowDimensions;
