import React from 'react';
import { Link } from 'react-router-dom';

import { Props } from './Header.props';

import { NCFC, SCP } from '$types/index';

const Header: NCFC<SCP & Props> = ({
  className,
  subTitle,
  routerData
}) => (
  <div
    className={className}
  >
    <h1
      className="title"
    >
      Header
    </h1>
    <h3
      className="sub-title"
    >
      pathname:
      {' '}
      {subTitle}
    </h3>
    <nav>
      {routerData.map(({
        title: routerTitle,
        pathname: routerPathname
      }, i) => (
        <Link
          key={i}
          className="nav-btn"
          to={routerPathname}
        >
          {routerTitle}
        </Link>
      ))}
    </nav>
  </div>
);

export default Header;
