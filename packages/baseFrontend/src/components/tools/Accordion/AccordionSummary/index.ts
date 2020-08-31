import { styled } from '@styles/styled-components';
import { colorOf, fontOf } from '@styles/lib';
import { AccordionSummaryProps } from '@material-ui/core';

import AccordionSummary from './AccordionSummary';

const classes: AccordionSummaryProps['classes'] = {
  content: 'summary-content',
  expanded: 'expanded',
};

const IconButtonProps: AccordionSummaryProps['IconButtonProps'] = {
  classes: {
    root: 'summary-indicator',
  },
};

const StyledAccordionSummary = styled(AccordionSummary).attrs((props) => ({
  classes,
  IconButtonProps,
}))`
  font-size: ${fontOf(({ subtitle1 }) => subtitle1.size)}rem;
  font-weight: ${fontOf(({ weight }) => weight.bold)};
  line-height: ${fontOf(({ subtitle1 }) => subtitle1.lineHeight)};
  color: ${colorOf(({ dark }) => dark.thick7)};
  background-color: ${colorOf(({ others }) => others.background.gray)};

  &.expanded {
    min-height: 48px;
  }

  & > .summary-content.expanded {
    margin: 12px 0;
  }

  & > .summary-indicator {
    color: ${colorOf(({ dark }) => dark.thick6)};
  }
`;

export default StyledAccordionSummary;
