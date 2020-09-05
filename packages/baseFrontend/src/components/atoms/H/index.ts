import { styled } from '@styles/styled-components';

import H from './H';

const StyledH = styled(H).attrs((props) => ({
  size: props.size || props.type,
  weight: props.weight || 'regular',
  color: props.color || 'dark',
  thick: props.thick || 'thick7',
}))`
  margin: 0;
  font-size: ${(props) => props.theme.font[props.size].size}rem;
  font-weight: ${(props) => props.theme.font.weight[props.weight]};
  color: ${(props) => props.theme.colors[props.color][props.thick]};
  line-height: ${(props) => props.theme.font[props.size].lineHeight};
`;

export default StyledH;
