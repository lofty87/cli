import { merge } from 'lodash';
import { createMuiTheme } from '@material-ui/core';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import { SpacingOptions } from '@material-ui/core/styles/createSpacing';

/**
 * * apply theme partially.
 *
 * * material-ui: breakpoints, spacing
 * * styled-components: colors, font, breakpoints, shadows, spacing, transitions, zIndex
 */

/**
 * * font: spoqa-han-sans
 * * font-size unit: rem
 * ? https://github.com/spoqa/spoqa-han-sans
 */

const colors = {
  main: {
    thick0: '#e6fcf5',
    thick1: '#c3fae8',
    thick2: '#96f2d7',
    thick3: '#63e6be',
    thick4: '#38d9a9',
    thick5: '#20c997',
    thick6: '#12b886',
    thick7: '#0ca678',
    thick8: '#099268',
    thick9: '#087f5b',
  },
  dark: {
    thick0: '#f8f9fa',
    thick1: '#f1f3f5',
    thick2: '#e9ecef',
    thick3: '#dee2e6',
    thick4: '#ced4da',
    thick5: '#adb5bd',
    thick6: '#868e96',
    thick7: '#495057',
    thick8: '#343a40',
    thick9: '#212529',
  },
  red: {
    thick0: '#fff5f5',
    thick1: '#ffe3e3',
    thick2: '#ffc9c9',
    thick3: '#ffa8a8',
    thick4: '#ff8787',
    thick5: '#ff6b6b',
    thick6: '#fa5252',
    thick7: '#f03e3e',
    thick8: '#e03131',
    thick9: '#c92a2a',
  },
  green: {
    thick0: '#ebfbee',
    thick1: '#d3f9d8',
    thick2: '#b2f2bb',
    thick3: '#8ce99a',
    thick4: '#69db7c',
    thick5: '#51cf66',
    thick6: '#40c057',
    thick7: '#37b24d',
    thick8: '#2f9e44',
    thick9: '#2b8a3e',
  },
  yellow: {
    thick0: '#fff9db',
    thick1: '#fff3bf',
    thick2: '#ffec99',
    thick3: '#ffe066',
    thick4: '#ffd43b',
    thick5: '#fcc419',
    thick6: '#fab005',
    thick7: '#f59f00',
    thick8: '#f08c00',
    thick9: '#e67700',
  },
  others: {
    background: {
      white: '#ffffff',
      gray: '#f5f5f5',
    },
  },
  white: 'white',
  black: 'black',
};

const font = {
  h1: {
    size: 6,
    lineHeight: 1.167,
  },
  h2: {
    size: 3.75,
    lineHeight: 1.2,
  },
  h3: {
    size: 3,
    lineHeight: 1.167,
  },
  h4: {
    size: 2.125,
    lineHeight: 1.235,
  },
  h5: {
    size: 1.5,
    lineHeight: 1.334,
  },
  h6: {
    size: 1.25,
    lineHeight: 1.6,
  },
  subtitle1: {
    size: 1,
    lineHeight: 1.75,
  },
  subtitle2: {
    size: 0.875,
    lineHeight: 1.57,
  },
  body1: {
    size: 1,
    lineHeight: 1.5,
  },
  body2: {
    size: 0.875,
    lineHeight: 1.43,
  },
  button: {
    size: 0.875,
    lineHeight: 1.75,
  },
  caption: {
    size: 0.75,
    lineHeight: 1.66,
  },
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    bold: 700,
  },
};

const breakpoints: BreakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const spacing: SpacingOptions = 8;

// ? material-ui
const muiTheme = createMuiTheme({
  breakpoints: {
    values: breakpoints,
  },
  spacing,
  typography: {
    fontFamily: [
      '"Spoqa Han Sans"',
      '"spoqahansans"',
      '"Apple SD Gothic Neo"',
      '"Nanum Gothic"',
      '"Malgun Gothic"',
      'Dotum',
      'sans-serif'
    ].join(','),
  },
});

const {
  breakpoints: muiBreakpoints,
  shadows: muiShadows,
  spacing: muiSpacing,
  transitions: muiTransitions,
  zIndex: muiZIndex
} = muiTheme;

// ? styled-components
const scTheme = merge(
  {
    breakpoints: muiBreakpoints,
    shadows: muiShadows,
    spacing: muiSpacing,
    transitions: muiTransitions,
    zIndex: muiZIndex,
  },
  {
    colors,
    font,
  }
);

export {
  scTheme,
  muiTheme
};
