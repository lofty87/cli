import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import { AccordionSummary as MuiAccordionSummary } from '@material-ui/core';

import { Props } from './AccordionSummary.props';

import { CFC, SCP } from '$types/index';

const AccordionSummary: CFC<SCP & Props> = ({
  className,
  expandIcon = <MdExpandMore />,
  children,
  ...others
}) => {
  return (
    <MuiAccordionSummary
      className={className}
      expandIcon={expandIcon}
      {...others}
    >
      {children}
    </MuiAccordionSummary>
  );
};

export default AccordionSummary;
