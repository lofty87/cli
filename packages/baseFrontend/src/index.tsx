import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import 'mobx-react-lite/batchingForReactDom';
// ? https://github.com/mobxjs/mobx-react-lite/#observer-batching

import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'mobx-react';
import moment from 'moment-timezone';
import ThemeProvider from '@styles/ThemeProvider';
import { stores } from '@stores/index';
import { muiTheme, scTheme } from '@constants/theme';
import App from '@pages/App';
import env from '@env';

moment.tz.setDefault(env.timezone);

const renderApp = () => (
  <StoreProvider
    {...stores}
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

render(
  renderApp(),
  document.getElementById('app')
);
