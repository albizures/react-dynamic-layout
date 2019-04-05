import React from 'react';
import PropTypes from 'prop-types';
import { register } from '../../src';

// NOTE: only for testing
function Label(props) {
  return <label>{props.text}</label>;
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Label;

register(Label, 'Label');
