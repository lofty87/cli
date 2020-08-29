import React, { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@material-ui/core';

import { Props } from './HideOnScroll.props';

import { CFC } from '$types/index';

/**
 * * use in mobile header
 */
const HideOnScroll: CFC<Props> = ({
  timeout = 500,
  children
}) => {
  const trigger = useScrollTrigger();

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      timeout={timeout}
    >
      {children as ReactElement}
    </Slide>
  );
};

export default HideOnScroll;
