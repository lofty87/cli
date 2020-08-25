import { styled } from '@styles/styled-components';
import { colorOf, fontOf } from '@styles/lib';

import NotFound from './NotFound';

const StyledNotFound = styled(NotFound)`
  & > .status {
    &__code {
      font-size: ${fontOf(({ h2 }) => h2.size)}rem;
      color: ${colorOf(({ main }) => main.thick7)};
    }

    &__message {
      font-size: ${fontOf(({ h4 }) => h4.size)}rem;
      color: ${colorOf(({ dark }) => dark.thick4)};
    }
  }

  & > .btn {
  }
`;

export default StyledNotFound;
