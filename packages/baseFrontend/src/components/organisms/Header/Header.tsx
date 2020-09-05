import React from 'react';
import { Link } from 'react-router-dom';
import { H } from '@components/atoms';

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
    <H
      className="title"
      type="h1"
      size="h5"
      weight="bold"
    >
      Header
    </H>
    <H
      className="sub-title"
      type="h3"
      size="subtitle1"
    >
      pathname:
      {' '}
      {subTitle}
    </H>
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
