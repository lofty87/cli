import React from 'react';
import { AccordionDetails as MuiAccordionDetails } from '@material-ui/core';

import { Props } from './AccordionDetails.props';

import { CFC, SCP } from '$types/index';

const AccordionDetails: CFC<SCP & Props> = ({
  className,
  children,
  ...others
}) => {
  return (
    <MuiAccordionDetails
      className={className}
      {...others}
    >
      {children}
    </MuiAccordionDetails>
  );
};

export default AccordionDetails;
