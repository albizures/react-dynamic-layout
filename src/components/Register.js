import React from 'react';
import { isValidElementType } from 'react-is';
import PropTypes from 'prop-types';

const Register = (props) => {
  const { component: Component, props: componentProps } = props;
  return <Component {...componentProps} />;
};

Register.propTypes = {
  component: (props, propName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        `Invalid prop 'component' supplied to 'Route': the prop is not a valid React component`,
      );
    }
  },
  name: PropTypes.string,
  props: PropTypes.object,
};

export default Register;
