import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Footer } from '@components/organisms';

import { GenericTemplate, HeaderContainer } from './modules';
import { HomePage } from './HomePage';
import ExamplePage from './ExamplePage';

import { NCFC, RRP } from '$types/index';

const GenericPage: NCFC<RRP> = ({
  history
}) => {
  return (
    <GenericTemplate
      Header={(
        <HeaderContainer
          history={history}
        />
      )}
      Footer={<Footer />}
    >
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact
        />
        <Route
          path="/examples"
          component={ExamplePage}
        />
        <Redirect
          to="/no-match"
        />
      </Switch>
    </GenericTemplate>
  );
};

export default GenericPage;
