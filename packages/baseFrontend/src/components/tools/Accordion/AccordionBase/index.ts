import { styled } from '@styles/styled-components';
import { colorOf } from '@styles/lib';

import AccordionBase from './AccordionBase';

const StyledAccordionBase = styled(AccordionBase)`
  margin-bottom: -1px;
  width: 100%;
  border: 1px solid ${colorOf(({ dark }) => dark.thick4)};
  overflow: hidden;
  box-shadow: none;
`;

export default StyledAccordionBase;
