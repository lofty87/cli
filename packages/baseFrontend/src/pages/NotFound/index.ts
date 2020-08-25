import { styled } from '@styles/styled-components';
import { colorOf, fontOf } from '@styles/lib';

import NotFound from './NotFound';

const StyledNotFound = styled(NotFound)`
  position: relative;
  width: 100%;
  height: 100vh;

  & > article {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    & > .status > .status {
      &__code {
        margin-top: 0;
        font-size: ${fontOf(({ h1 }) => h1.size)}rem;
        font-weight: ${fontOf(({ weight }) => weight.bold)};
        color: ${colorOf(({ main }) => main.thick7)};
      }

      &__message {
        font-size: ${fontOf(({ h2 }) => h2.size)}rem;
        font-weight: ${fontOf(({ weight }) => weight.regular)};
        color: ${colorOf(({ dark }) => dark.thick8)};
      }
    }

    & > .btn {
    }
  }
`;

export default StyledNotFound;
