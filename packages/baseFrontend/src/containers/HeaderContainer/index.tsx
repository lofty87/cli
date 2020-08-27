import React from 'react';
import { Header } from '@components/organisms';

import { Props } from './HeaderContainer.props';

import { NCFC } from '$types/index';

// * process async, state data
const HeaderContainer: NCFC<Props> = ({
  match
}) => (
  <Header
    $title={match.url}
  />
);

export default HeaderContainer;
