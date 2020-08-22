import * as styledComponents from 'styled-components';
import { scTheme } from '@constants/theme';

/**
 * * custom theme 타입이 적용된 styled-components 사용을 위해
 * ? ${props => props.theme} 타입 설정
 */

type Theme = typeof scTheme;

type ThemedStyledComponents = styledComponents.ThemedStyledComponentsModule<Theme>;

const themedStyledComponents = styledComponents as ThemedStyledComponents;

export const {
  ThemeProvider,
  default: styled,
  css,
  keyframes,
  createGlobalStyle
} = themedStyledComponents;
