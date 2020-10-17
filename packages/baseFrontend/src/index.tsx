import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment-timezone';
import StoreProvider from '@stores/StoreProvider';
import ThemeProvider from '@styles/ThemeProvider';
import stores from '@stores/index';
import { muiTheme, scTheme } from '@constants/theme';
import App from '@pages/App';
import env from '@env';

moment.tz.setDefault(env.timezone);

const renderApp = () => {
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
            component={App}
          />
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

render(
  renderApp(),
  document.getElementById('app')
);
