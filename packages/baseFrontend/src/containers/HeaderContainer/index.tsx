import React, { useMemo, useState } from 'react';
import { Header } from '@components/organisms';

import { Props } from './HeaderContainer.props';

import { NCFC } from '$types/index';

let count = 0;

// * process async, state data
const HeaderContainer: NCFC<Props> = ({
  match
}) => {
  const url = useMemo(() => match.url, [ match.url ]);
  const [ countUrl, setCountUrl ] = useState(`${url} ${count}`);

  setTimeout(() => {
    count++;

    setCountUrl(`${url} ${count}`);
  }, 1000);

  return (
    <Header
      $title={countUrl}
    />
  );
};

export default HeaderContainer;
