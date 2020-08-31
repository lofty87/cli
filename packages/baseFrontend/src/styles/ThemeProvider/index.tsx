import React from 'react';
import { IconContext } from 'react-icons';
import { CssBaseline as MUICssBaseline } from '@material-ui/core';
import { StylesProvider as MUIStylesProvider, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as SCThemeProvider } from '@styles/styled-components';
import { GlobalStyle, Typography } from '@styles/style';

import { Props } from './ThemeProvider.props';

import { CFC } from '$types/index';

const iconConfig: IconContext = {
  className: 'icon',
  size: '1em',
  style: {
    verticalAlign: 'middle',
  },
};

const ThemeProvider: CFC<Props> = ({
  scTheme,
  muiTheme,
  children
}) => (
  <>
    <MUICssBaseline />
    <MUIStylesProvider
      injectFirst
    >
      <SCThemeProvider
        theme={scTheme}
      >
        <MUIThemeProvider
          theme={muiTheme}
        >
          <GlobalStyle />
          <IconContext.Provider
            value={iconConfig}
          >
            <Typography>
              {children}
            </Typography>
          </IconContext.Provider>
        </MUIThemeProvider>
      </SCThemeProvider>
    </MUIStylesProvider>
  </>
);

export default ThemeProvider;
