import { styled } from '@styles/styled-components';
import { colorOf, fontOf } from '@styles/lib';

import AccordionDetails from './AccordionDetails';

const StyledAccordionDetails = styled(AccordionDetails)`
  font-size: ${fontOf(({ body1 }) => body1.size)}rem;
  font-weight: ${fontOf(({ weight }) => weight.regular)};
  line-height: ${fontOf(({ body1 }) => body1.lineHeight)};
  color: ${colorOf(({ dark }) => dark.thick7)};
  border-top: 1px solid ${colorOf(({ dark }) => dark.thick4)};
`;

export default StyledAccordionDetails;
