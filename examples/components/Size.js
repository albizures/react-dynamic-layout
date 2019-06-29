import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

function Size({ rdWidth, rdHeight }) {
  return <Label text={`${rdWidth}x${rdHeight}`} />;
}

Size.propTypes = {
  rdWidth: PropTypes.any.isRequired,
  rdHeight: PropTypes.any.isRequired,
};

export default Size;
