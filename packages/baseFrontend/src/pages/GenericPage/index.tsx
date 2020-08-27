import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Footer } from '@components/organisms';
import { GenericTemplate } from '@components/templates';
import { HeaderContainer, HomeContainer } from '@containers/index';

import TempPage from './TempPage';

import { NCFC, RRP } from '$types/index';

const GenericPage: NCFC<RRP> = ({
  match
}) => (
  <GenericTemplate
    $Header={(
      <HeaderContainer
        match={match}
      />
    )}
    $Footer={<Footer />}
  >
    <Switch>
      <Route
        path="/"
        component={HomeContainer}
        exact
      />
      <Route
        path="/temps"
        component={TempPage}
      />
      <Redirect
        to="/no-match"
      />
    </Switch>
  </GenericTemplate>
);

export default GenericPage;
