import { styled } from '@styles/styled-components';

import GenericTemplate from './GenericTemplate';

const StyledGenericTemplate = styled(GenericTemplate)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;

  & > header,
  & > section,
  & > footer {
    width: 100%;
  }

  & > header,
  & > footer {
    flex: 0 0 auto;
  }

  & > section {
    flex: 1 1 auto;
  }
`;

export default StyledGenericTemplate;
