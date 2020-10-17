import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment-timezone';
import StoreProvider from '@stores/StoreProvider';
import ThemeProvider from '@styles/ThemeProvider';
import stores from '@stores/index';
import { muiTheme, scTheme } from '@constants/theme';
import env from '@env';

moment.tz.setDefault(env.timezone);

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
};

export const decorators = [
  (Story) => {
    return (
      <StoreProvider
        stores={stores}
      >
        <ThemeProvider
          muiTheme={muiTheme}
          scTheme={scTheme}
        >
          <Router>
            <Route
              component={Story}
            />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    );
  },
];
