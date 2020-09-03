import { ButtonProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type CustomProps = {
  color?: 'main' | 'dark' | 'red' | 'green' | 'yellow';
  length?: 'short' | 'medium' | 'long';
};

export type Props = CustomProps & Omit<ButtonProps, keyof SCP | keyof CustomProps>;
