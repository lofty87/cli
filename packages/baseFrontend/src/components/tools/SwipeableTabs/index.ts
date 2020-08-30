import { styled } from '@styles/styled-components';
import { TabsProps } from '@material-ui/core/Tabs';
import { colorOf } from '@styles/lib';

import SwipeableTabs from './SwipeableTabs';

const tabsClasses: TabsProps['classes'] = {
  root: 'tabs',
  indicator: 'tabs__indicator',
  scrollButtons: 'tabs__scroll-btns',
};

const StyledSwipeableTabs = styled(SwipeableTabs).attrs((props) => ({
  classes: tabsClasses,
}))`
  .tabs {
    border-bottom: 1px solid ${colorOf(({ dark }) => dark.thick4)};

    .tabs {
      &__indicator {
        height: 4px;
        background-color: ${colorOf(({ main }) => main.thick7)};
      }

      &__scroll-btns {
        width: 26px;
      }
    }

    .Mui-selected {
      color: ${colorOf(({ main }) => main.thick7)};
    }
  }
`;

export default StyledSwipeableTabs;
