import React from 'react';
import { Header } from '@components/organisms';
import { routerData } from '@constants/router';

import { Props } from './HeaderContainer.props';

import { NCFC } from '$types/index';

// * async, static data
const HeaderContainer: NCFC<Props> = ({
  history
}) => {
  return (
    <Header
      subTitle={history.location.pathname}
      routerData={routerData}
    />
  );
};

export default HeaderContainer;
