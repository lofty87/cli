import { styled } from '@styles/styled-components';
import { fontOf, spacingOf } from '@styles/lib';

import Header from './Header';

const StyledHeader = styled(Header)`
  padding: ${spacingOf(4, 0)};
  text-align: center;

  & > .title {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    font-size: ${fontOf(({ h3 }) => h3.size)}rem;
    font-weight: ${fontOf(({ weight }) => weight.bold)};
  }
`;

export default StyledHeader;
