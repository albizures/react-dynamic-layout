import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

function Size(props) {
  return <Label text={props.rdWidth + 'x' + props.rdHeight} />;
}

Size.propTypes = {
  rdWidth: PropTypes.any.isRequired,
  rdHeight: PropTypes.any.isRequired,
};

export default Size;
