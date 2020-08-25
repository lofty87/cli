import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import env from '@env';

import NotFound from './NotFound';

import { NCFC, RRP } from '$types/index';

const App: NCFC<RRP> = ({ history }) => (
  <Switch>
    <Route
      path="/"
      render={() => <div>index page</div>}
      exact
    />
    <Route
      path="/temp*"
      render={() => <div>temp pages</div>}
    />
    <Route
      component={NotFound}
    />
  </Switch>
);

export default env.isDev ? hot(App) : App;
