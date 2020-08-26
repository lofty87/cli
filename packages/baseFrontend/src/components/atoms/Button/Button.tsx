import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

import { Props } from './Button.props';

import { CFC, SCP } from '$types/index';

const Button: CFC<SCP & Props> = ({
  className,
  variant = 'contained',
  $color = 'main',
  ...others
}) => (
  <MuiButton
    className={className}
    variant={variant}
    {...others}
  />
);

export default Button;
