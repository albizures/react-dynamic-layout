import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Tab = (props) => {
  const { children, onClick, name, isActive } = props;
  const onClickHandler = useCallback(() => {
    onClick(name);
  }, [onClick, name]);

  const className = classNames({
    'rdl-tabs__title': true,
    'rdl-tabs__title--active': isActive,
  });

  return (
    <li className={className}>
      <button onClick={onClickHandler}>{children}</button>
    </li>
  );
};

Tab.defaultProps = {
  isActive: false,
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default Tab;
