import React from 'react';
import PropTypes from 'prop-types';

import CenterName from './CenterName';

const ShowDimensions = (props) => {
  const { width, height } = props;

  return <CenterName name={`${width} x ${height}`} />;
};

ShowDimensions.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default ShowDimensions;
