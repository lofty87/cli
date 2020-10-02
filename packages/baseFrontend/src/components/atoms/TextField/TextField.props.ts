import { PropTypes, TextFieldProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type CustomProps = {
  textAlign?: PropTypes.Alignment;
};

export type Props = CustomProps &
  Omit<TextFieldProps, keyof SCP | keyof CustomProps | 'children' | 'color'>;
