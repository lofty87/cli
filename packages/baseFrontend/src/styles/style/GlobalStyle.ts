import { createGlobalStyle } from '@styles/styled-components';
import { breakpoints } from '@styles/lib';

import externalStyles from './externalStyles';

export default createGlobalStyle`
  html {
    font-size: 16px;

    ${breakpoints.down('sm')} {
      font-size: 14px;
    }

    ${breakpoints.down('xs')} {
      font-size: 3.8vw;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ${externalStyles}
`;
