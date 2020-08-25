import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ModalAlert, ModalConfirm, ModalSpinner } from '@components/organisms';
import { NotFoundContainer } from '@containers/index';
import { GenericPage } from '@pages/index';

import { NCFC, RRP } from '$types/index';

const App: NCFC<RRP> = observer(() => (
  <>
    <Switch>
      <Redirect
        from="/"
        to="/home"
        exact
      />
      <Route
        path={[ '/home', '/temp' ]}
        render={GenericPage}
      />
      <Route
        render={NotFoundContainer}
      />
    </Switch>
    <ModalAlert />
    <ModalConfirm />
    <ModalSpinner />
  </>
));

export default App;
