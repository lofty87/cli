import { styled } from '@styles/styled-components';
import { fontOf, spacingOf } from '@styles/lib';

import Header from './Header';

const StyledHeader = styled(Header)`
  padding: ${spacingOf(4, 0)};

  & > .title,
  & > .sub-title {
    text-align: center;
  }

  & > nav {
    margin-top: ${spacingOf(2)}px;
    text-align: center;

    & > .nav-btn {
      margin-right: ${spacingOf(2)}px;
      font-size: ${fontOf(({ body1 }) => body1.size)}rem;
      font-weight: ${fontOf(({ weight }) => weight.regular)};

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export default StyledHeader;
