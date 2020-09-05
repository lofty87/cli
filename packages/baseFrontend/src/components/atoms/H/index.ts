import { css, styled } from '@styles/styled-components';
import { colorOf } from '@styles/lib';

import H from './H';
import { Props } from './H.props';

type Color = Exclude<Props['color'], undefined>;
type Thick = Exclude<Props['thick'], undefined>;

const colorStyle = (color: Color, thick: Thick) => {
  switch(color) {
    case 'white': {
      return css`
        color: ${color};
      `;
    }
    default: {
      return css`
        color: ${colorOf((colors) => colors[color][thick])};
      `;
    }
  }
};

const StyledH = styled(H).attrs((props) => ({
  size: props.size || props.type,
  weight: props.weight || 'regular',
  color: props.color || 'dark',
  thick: props.thick || 'thick7',
}))`
  margin: 0;
  font-size: ${(props) => props.theme.font[props.size].size}rem;
  font-weight: ${(props) => props.theme.font.weight[props.weight]};
  line-height: ${(props) => props.theme.font[props.size].lineHeight};

  ${(props) => colorStyle(props.color, props.thick)}
`;

export default StyledH;
