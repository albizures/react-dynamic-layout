import React, { useCallback, useState, Children, useMemo } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import Item from './Item';
import Content from './Content';

const eachChildFactory = ({ onClickTab, currentTab, defaultTab, tab }) => (
  result,
  child,
  index,
) => {
  const { title, name, children } = child.props;
  const isFirst = index === 0;
  const isCurrentTab =
    tab === name ||
    currentTab === name ||
    (!result.contentTab && isFirst) ||
    defaultTab === name;

  result.tabList.unshift(
    <Tab isActive={isCurrentTab} name={name} onClick={onClickTab} key={name}>
      {title}
    </Tab>,
  );

  if (isCurrentTab) {
    result.contentTab = <Content key={name}>{children}</Content>;
  }

  return result;
};

const Tabs = (props) => {
  const { children, defaultTab, tab, onSelect } = props;
  const [currentTab, selectTab] = useState(defaultTab);
  const style = {
    position: 'relative',
  };

  if (tab && !onSelect) {
    // eslint-disable-next-line no-console
    console.error(
      'Warning: Failed prop type: You provided a `tab` prop to a Tabs component without an `onSelect` handler.' +
        'This will render a group of tabs with a fixed tab. Use `defaultTab` instead, otherwise, set either `onSelect`',
    );
  }

  const childrenArr = Children.toArray(children);
  const onClickTab = useCallback(
    (name) => {
      if (onSelect) {
        onSelect(name);
      } else {
        selectTab(name);
      }
    },
    [selectTab, onSelect],
  );

  const eachChild = useMemo(
    () =>
      eachChildFactory({
        currentTab,
        onClickTab,
        defaultTab,
        tab,
      }),
    [currentTab, onClickTab, defaultTab, tab],
  );

  const { tabList, contentTab } = childrenArr.reduceRight(eachChild, {
    tabList: [],
  });

  return (
    <div className="rdl-tabs" style={style}>
      <ul className="rdl-tabs__list">{tabList}</ul>
      {contentTab}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  tab: PropTypes.string,
  onSelect: PropTypes.func,
  defaultTab: PropTypes.string,
};

Tabs.Item = Item;

export default Tabs;
