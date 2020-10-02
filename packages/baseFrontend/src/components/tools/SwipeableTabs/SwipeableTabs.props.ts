import { HTMLProps, ReactElement } from 'react';
import { TabsProps } from '@material-ui/core/Tabs';
import { SwipeableViewsProps } from 'react-swipeable-views';

export type Props = {
  Tabs: ReactElement[];
  TabViews: ReactElement[];
  tabsProps?: Omit<Partial<TabsProps>, 'value' | 'onChange'>;
  tabViewsProps?: Omit<
    Partial<SwipeableViewsProps>,
    keyof HTMLProps<HTMLDivElement> | 'index' | 'onChangeIndex'
  >;
};
