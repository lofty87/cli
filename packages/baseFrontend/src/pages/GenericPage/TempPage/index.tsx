import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NCFC, RRP } from '$types/index';

const TempPage: NCFC<RRP> = ({
  match
}) => (
  <Switch>
    <Route
      path={`${match.path}`}
      render={() => <div>temps</div>}
      exact
    />
    <Route
      path={`${match.path}/:id`}
      render={() => <div>temps/:id</div>}
      exact
    />
    <Route
      path={`${match.path}/write`}
      render={() => <div>temps/write</div>}
      exact
    />
    <Redirect
      to="/no-match"
    />
  </Switch>
);

export default TempPage;
