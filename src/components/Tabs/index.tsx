import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import Item from './Item';
import Content from './Content';

interface PropTypes {
  children: React.ReactNode;
  defaultTab?: string;
  tab?: string;
  onSelect?: Function;
}

type Tabs = React.FC<PropTypes> & {
  Item: Item;
};

const Tabs: Tabs = (props) => {
  const { children, defaultTab, tab, onSelect } = props;
  const [currentTab, selectTab] = React.useState<string | undefined>(
    defaultTab,
  );
  const style: React.CSSProperties = {
    position: 'relative',
  };

  if (tab && !onSelect) {
    // eslint-disable-next-line no-console
    console.error(
      'Warning: Failed prop type: You provided a `tab` prop to a Tabs component without an `onSelect` handler.' +
        'This will render a group of tabs with a fixed tab. Use `defaultTab` instead, otherwise, set either `onSelect`',
    );
  }

  const childrenArr = React.Children.toArray(children);
  const onClickTab = React.useCallback(
    (name) => {
      if (onSelect) {
        onSelect(name);
      } else {
        selectTab(name);
      }
    },
    [selectTab, onSelect],
  );

  interface ReducerResult {
    tabList: React.ReactNode[];
    contentTab?: React.ReactNode;
  }
  const reducer = (
    result: ReducerResult,
    child: { props: any },
    index: number,
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

  const { tabList, contentTab } = childrenArr.reduceRight<ReducerResult>(
    reducer,
    {
      tabList: [],
    },
  );

  return (
    <div className="rdl-tabs" style={style}>
      <ul className="rdl-tabs__list">{tabList}</ul>
      {contentTab}
    </div>
  );
};

Tabs.Item = Item;

export default Tabs;
