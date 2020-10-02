import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

import { Props } from './TextField.props';

import { NCFC, SCP } from '$types/index';

const TextField: NCFC<SCP & Props> = ({
  className,
  textAlign = 'left',
  variant = 'outlined',
  ...others
}) => {
  return (
    <MuiTextField
      className={className}
      variant={variant}
      {...others}
    />
  );
};

export default TextField;
