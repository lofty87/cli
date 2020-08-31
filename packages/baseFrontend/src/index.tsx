import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@styles/scss/base.scss';

import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'mobx-react';
import ThemeProvider from '@styles/ThemeProvider';
import { stores } from '@stores/index';
import { muiTheme, scTheme } from '@constants/theme';
import App from '@pages/App';

const renderApp = () => (
  <React.StrictMode>
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
  </React.StrictMode>
);

render(
  renderApp(),
  document.getElementById('app')
);
