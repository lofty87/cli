import { styled } from '@styles/styled-components';
import { fontOf, spacingOf } from '@styles/lib';

import Footer from './Footer';

const StyledFooter = styled(Footer)`
  padding: ${spacingOf(4, 0)};
  font-size: ${fontOf(({ h3 }) => h3.size)}rem;
  font-weight: ${fontOf(({ weight }) => weight.bold)};
  text-align: center;
`;

export default StyledFooter;
