import hex2rgba from 'hex2rgba';
import { css, styled } from '@styles/styled-components';
import { colorOf, fontOf, mappedBy, selectedBy, spacingOf } from '@styles/lib';

import Button from './Button';
import { Props } from './Button.props';

const variantTextColorStyle = css<Required<Props>>`
  color: ${(props) => props.theme.colors[props.color].thick7};

  &:hover {
    background-color: ${(props) => hex2rgba(props.theme.colors[props.color].thick7, 0.1)};
  }
`;

const variantOutlinedColorStyle = css<Required<Props>>`
  color: ${(props) => props.theme.colors[props.color].thick7};
  border: 1px solid ${(props) => props.theme.colors[props.color].thick6};

  &:hover {
    border: 1px solid ${(props) => props.theme.colors[props.color].thick9};
    background-color: ${(props) => hex2rgba(props.theme.colors[props.color].thick7, 0.1)};
  }
`;

const variantContainedColorStyle = css<Required<Props>>`
  color: ${colorOf(({ white }) => white)};
  background-color: ${(props) => props.theme.colors[props.color].thick7};

  &:hover {
    background-color: ${(props) => props.theme.colors[props.color].thick9};
  }
`;

const variantStyle = {
  text: css<Props>`
    ${(props) => selectedBy(variantTextColorStyle, props.color)};
  `,
  outlined: css<Props>`
    ${(props) => selectedBy(variantOutlinedColorStyle, props.color)};
  `,
  contained: css<Props>`
    ${(props) => selectedBy(variantContainedColorStyle, props.color)};
  `,
};

const lengthStyle = {
  short: css`
    padding-left: ${spacingOf(1)}px;
    padding-right: ${spacingOf(1)}px;
    min-width: 44px;
  `,
  medium: css`
    padding-left: ${spacingOf(4)}px;
    padding-right: ${spacingOf(4)}px;
    min-width: 92px;
  `,
  long: css`
    padding-left: ${spacingOf(11)}px;
    padding-right: ${spacingOf(11)}px;
    min-width: 204px;
  `,
};

const StyledButton = styled(Button).attrs((props) => ({
  color: props.color || 'main',
  length: props.length || undefined,
  variant: props.variant || 'contained',
}))`
  font-size: ${fontOf(({ subtitle1 }) => subtitle1.size)}rem;
  font-weight: ${fontOf(({ weight }) => weight.bold)};

  ${({ variant }) => mappedBy(variantStyle, variant)};

  ${({ length }) => mappedBy(lengthStyle, length)};
`;

export default StyledButton;
