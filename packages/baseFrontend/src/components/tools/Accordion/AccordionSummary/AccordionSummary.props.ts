import { AccordionSummaryProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type Props = Omit<AccordionSummaryProps, keyof SCP>;
