import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ExampleTemplate } from './modules';

import { NCFC, RRP } from '$types/index';

const ExamplePage: NCFC<RRP> = ({
  match
}) => {
  return (
    <ExampleTemplate>
      <Switch>
        <Route
          path={`${match.path}`}
          render={() => <div>Example-List</div>}
          exact
        />
        <Route
          path={`${match.path}/editor`}
          render={() => <div>Example-Form</div>}
          exact
        />
        <Route
          path={`${match.path}/:id`}
          render={() => <div>Example</div>}
          exact
        />
        <Redirect
          to="/no-match"
        />
      </Switch>
    </ExampleTemplate>
  );
};

export default ExamplePage;
