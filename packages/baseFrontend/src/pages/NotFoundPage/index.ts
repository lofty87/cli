import { styled } from '@styles/styled-components';
import { colorOf, fontOf, spacingOf } from '@styles/lib';

import NotFoundPage from './NotFoundPage';

const StyledNotFoundPage = styled(NotFoundPage)`
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

    & > .status > .status__message {
      margin-top: ${spacingOf(1.5)}px;
      font-size: ${fontOf(({ h2 }) => h2.size)}rem;
      font-weight: ${fontOf(({ weight }) => weight.regular)};
      color: ${colorOf(({ dark }) => dark.thick8)};
    }

    & > .home-btn {
      margin-top: ${spacingOf(6)}px;
    }
  }
`;

export default StyledNotFoundPage;
