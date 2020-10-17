import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import { ModalAlert, ModalConfirm, ModalSpinner } from '@components/organisms';
import env from '@env';

import GenericPage from './GenericPage';
import NotFoundPage from './NotFoundPage';

import { NCFC, RRP } from '$types/index';

const App: NCFC<RRP> = () => {
  return (
    <>
      <Switch>
        <Route
          path="/"
          component={GenericPage}
          exact
        />
        <Route
          path={[
            '/examples'
          ]}
          component={GenericPage}
        />
        <Route
          component={NotFoundPage}
        />
      </Switch>
      <ModalAlert />
      <ModalConfirm />
      <ModalSpinner />
    </>
  );
};

export default env.isDev ? hot(App) : App;
