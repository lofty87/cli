import React from 'react';
import { Accordion as MuiAccordion } from '@material-ui/core';

import { Props } from './AccordionBase.props';

import { CFC, SCP } from '$types/index';

const AccordionBase: CFC<SCP & Props> = ({
  className,
  children,
  ...others
}) => (
  <MuiAccordion
    className={className}
    {...others}
  >
    {children}
  </MuiAccordion>
);

export default AccordionBase;
