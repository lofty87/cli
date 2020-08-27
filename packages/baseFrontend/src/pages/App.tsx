import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import env from '@env';

import GenericPage from './GenericPage';
import NotFoundPage from './NotFoundPage';

import { NCFC, RRP } from '$types/index';

const App: NCFC<RRP> = () => (
  <Switch>
    <Route
      path="/"
      component={GenericPage}
      exact
    />
    <Route
      path={[
        '/temps'
      ]}
      component={GenericPage}
    />
    <Route
      component={NotFoundPage}
    />
  </Switch>
);

export default env.isDev ? hot(App) : App;
