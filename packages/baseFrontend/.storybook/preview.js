import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import 'mobx-react-lite/batchingForReactDom';
// ? https://github.com/mobxjs/mobx-react-lite/#observer-batching

import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'mobx-react';
import moment from 'moment-timezone';
import ThemeProvider from '@styles/ThemeProvider';
import { stores } from '@stores/index';
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
        {...stores}
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
