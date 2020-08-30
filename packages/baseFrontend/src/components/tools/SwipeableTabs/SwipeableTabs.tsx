import React, { ChangeEvent, useState } from 'react';
import { Tabs as MuiTabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { Props } from './SwipeableTabs.props';

import { NCFC, SCP } from '$types/index';

/**
 * * @material-ui Tabs 와 react-swipeable-views 를 결합
 *
 * ! 첫 탭 이동은 slide 없이 전환되는 issue 가 있음
 */

const SwipeableTabs: NCFC<SCP & Props> = ({
  className,
  Tabs,
  TabViews,
  tabsProps = {
    variant: 'scrollable',
  },
  tabViewsProps = {
    axis: 'x',
    disabled: true,
    enableMouseEvents: false,
  },
  ...others
}) => {
  const [ index, setIndex ] = useState(0);

  const handleTabsChange = (e: ChangeEvent<{}>, value: number) => {
    setIndex(value);
  };

  const handleTabViewsChange = (value: number) => {
    setIndex(value);
  };

  return (
    <section
      className={className}
    >
      <MuiTabs
        value={index}
        onChange={handleTabsChange}
        {...tabsProps}
        {...others}
      >
        {Tabs}
      </MuiTabs>
      <SwipeableViews
        index={index}
        onChangeIndex={handleTabViewsChange}
        {...tabViewsProps}
      >
        {TabViews.map((TabView, tabViewIndex) => {
          const show = tabViewIndex === index;

          return (
            <section
              key={tabViewIndex}
              hidden={!show}
            >
              {show && TabView}
            </section>
          );
        })}
      </SwipeableViews>
    </section>
  );
};

export default SwipeableTabs;
