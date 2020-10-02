import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TempTemplate } from '@components/templates';

import { NCFC, RRP } from '$types/index';

const TempPage: NCFC<RRP> = ({
  match
}) => {
  return (
    <TempTemplate>
      <Switch>
        <Route
          path={`${match.path}`}
          render={() => <div>Temp-List</div>}
          exact
        />
        <Route
          path={`${match.path}/write`}
          render={() => <div>Temp-Form</div>}
          exact
        />
        <Route
          path={`${match.path}/:id`}
          render={() => <div>Temp</div>}
          exact
        />
        <Redirect
          to="/no-match"
        />
      </Switch>
    </TempTemplate>
  );
};

export default TempPage;
