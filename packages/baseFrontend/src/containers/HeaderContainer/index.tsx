import React from 'react';
import { Header } from '@components/organisms';

import { Props } from './HeaderContainer.props';

import { NCFC } from '$types/index';

// * process async, state data
const HeaderContainer: NCFC<Props> = ({
  history
}) => (
  <Header
    title={history.location.pathname}
  />
);

export default HeaderContainer;
