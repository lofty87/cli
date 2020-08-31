import { AccordionDetailsProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type Props = Omit<AccordionDetailsProps, keyof SCP>;
