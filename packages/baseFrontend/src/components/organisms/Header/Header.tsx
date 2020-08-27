import React from 'react';

import { Props } from './Header.props';

import { NCFC, SCP } from '$types/index';

const Header: NCFC<SCP & Props> = ({
  className,
  $title
}) => (
  <div
    className={className}
  >
    <h1
      className="title"
    >
      {$title}
    </h1>
  </div>
);

export default Header;
