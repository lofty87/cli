import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';

import { NCFC, RRP } from '$types/index';

const App: NCFC<RRP> = () => (
  <Switch>
    <Route
      path={[ '/', '/home/*' ]}
      render={() => <div>generic page</div>}
      exact
    />
    <Route
      component={NotFound}
    />
  </Switch>
);

export default App;
