import React from 'react';
import { AiFillApple, AiFillFacebook, AiFillGoogleCircle } from 'react-icons/ai';
import { Box, Fade, Tab as MuiTab, TabProps } from '@material-ui/core';
import { SwipeableTabs } from '@components/tools';

import { CFC, NCFC } from '$types/index';

const Tab: NCFC<TabProps> = ({
  label,
  ...others
}) => (
  <MuiTab
    label={(
      <Box
        p={1}
      >
        {label}
      </Box>
    )}
    {...others}
  />
);

const TabView: CFC = ({
  children
}) => (
  <Box
    p={2}
  >
    {children}
  </Box>
);

export default {
  component: SwipeableTabs,
  title: 'SwipeableTabs',
};

const Tabs = [ '탭 1', '탭 2', '탭 3' ];
const TabViews = [ '내용 1', '내용 2', '내용 3' ];

export const Default = () => (
  <SwipeableTabs
    Tabs={Tabs.map((label, i) => (
      <Tab
        key={i}
        label={label}
      />
    ))}
    TabViews={TabViews.map((content, i) => (
      <TabView
        key={i}
      >
        {content}
      </TabView>
    ))}
  />
);

export const Disabled = () => (
  <SwipeableTabs
    Tabs={Tabs.map((label, i) => (
      <Tab
        key={i}
        label={label}
        disabled={i === 1}
      />
    ))}
    TabViews={TabViews.map((content, i) => (
      <TabView
        key={i}
      >
        {content}
      </TabView>
    ))}
  />
);

const iconStyle = {
  fontSize: '26px',
};

const tabIcons: Record<number, React.ReactElement> = {
  0: (
    <AiFillGoogleCircle
      style={iconStyle}
    />
  ),
  1: (
    <AiFillApple
      style={iconStyle}
    />
  ),
  2: (
    <AiFillFacebook
      style={iconStyle}
    />
  ),
};

export const IconTab = () => (
  <SwipeableTabs
    Tabs={Tabs.map((label, i) => (
      <Tab
        key={i}
        label={label}
        icon={tabIcons[i]}
      />
    ))}
    TabViews={TabViews.map((content, i) => (
      <TabView
        key={i}
      >
        {content}
      </TabView>
    ))}
  />
);

export const OffTransitions = () => (
  <SwipeableTabs
    Tabs={Tabs.map((label, i) => (
      <Tab
        key={i}
        label={label}
      />
    ))}
    TabViews={TabViews.map((content, i) => (
      <TabView
        key={i}
      >
        <Fade
          in
        >
          <div>
            {content}
          </div>
        </Fade>
      </TabView>
    ))}
    tabViewsProps={{
      animateTransitions: false,
    }}
  />
);
