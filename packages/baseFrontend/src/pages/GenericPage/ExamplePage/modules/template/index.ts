import { styled } from '@styles/styled-components';
import { colorOf, fontOf, spacingOf } from '@styles/lib';

import ExampleTemplate from './ExampleTemplate';

const StyledExampleTemplate = styled(ExampleTemplate)`
  padding: ${spacingOf(8, 0)};
  font-size: ${fontOf(({ h3 }) => h3.size)}rem;
  font-weight: ${fontOf(({ weight }) => weight.regular)};
  color: ${colorOf(({ main }) => main.thick7)};
  text-align: center;
`;

export default StyledExampleTemplate;
