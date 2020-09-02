import { PropTypes } from '@material-ui/core';
import { DatePickerProps } from '@material-ui/pickers';

import { SCP } from '$types/index';

type CustomProps = {
  textAlign?: PropTypes.Alignment;
};

export type Props = CustomProps & Omit<DatePickerProps, keyof SCP | keyof CustomProps>;
