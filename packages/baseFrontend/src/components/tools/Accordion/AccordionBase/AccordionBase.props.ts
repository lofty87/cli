import { AccordionProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type Props = Omit<AccordionProps, keyof SCP>;
