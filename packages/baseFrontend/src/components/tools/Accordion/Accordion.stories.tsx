import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@components/tools';

export default {
  component: Accordion,
  title: 'Accordion',
};

export const Default = () => (
  <>
    <Accordion
      defaultExpanded
    >
      <AccordionSummary>타이틀 1</AccordionSummary>
      <AccordionDetails>내용 1</AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary>타이틀 2</AccordionSummary>
      <AccordionDetails>내용 2</AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary>타이틀 3</AccordionSummary>
      <AccordionDetails>내용 3</AccordionDetails>
    </Accordion>
    <Accordion
      disabled
    >
      <AccordionSummary>타이틀 4</AccordionSummary>
      <AccordionDetails>내용 4</AccordionDetails>
    </Accordion>
  </>
);
