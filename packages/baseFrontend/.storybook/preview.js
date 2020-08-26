import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'mobx-react';
import ThemeProvider from '@styles/ThemeProvider';
import { stores } from '@stores/index';
import { muiTheme, scTheme } from '@constants/theme';

export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*",
  },
}

export const decorators = [
  (Story) => (
    <React.StrictMode>
      <StoreProvider
        {...stores}
      >
        <ThemeProvider
          $muiTheme={muiTheme}
          $scTheme={scTheme}
        >
          <Router>
            <Route
              component={Story}
            />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </React.StrictMode>
  )
];
