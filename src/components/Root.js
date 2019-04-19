import React from 'react';
import PropTypes from 'prop-types';

import RootContext from '../contexts/RootContext';

const Root = (props) => {
  const { children } = props;
  const contextValue = {};

  return (
    <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
