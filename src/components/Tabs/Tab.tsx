import React, { useCallback } from 'react';
import classNames from 'classnames';

interface PropTypes {
  children: React.ReactNode;
  onClick: Function;
  name: string;
  isActive?: boolean;
}

const Tab: React.FC<PropTypes> = (props) => {
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

export default Tab;
