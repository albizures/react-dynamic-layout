import React from 'react';
import PropTypes from 'prop-types';

const components = {};

function Register() {
  return <div></div>;
}

Register.displayName = 'Register';

Register.propTypes = {
  type: PropTypes.any.isRequired,
  name: PropTypes.string,
  props: PropTypes.object
};

function register(component, name, rewrite = false) {
  name = name || component.displayName;

  if (!name) {
    throw new Error('Invalid name: ' + name);
  }

  if (typeof component !== 'function' && typeof component !== 'string') {
    throw new Error(name + ' should be a string or a ReactClass');
  }
  // if (name === 'Layout') throw new Error('You cannot use \'Layout\' as a name');
  if (components[name] && !rewrite) {
    throw new Error('Component \'' + name + '\' already exists');
  }
  components[name] = component;
}

export default Register;

export {
  Register,
  register,
  components
};
