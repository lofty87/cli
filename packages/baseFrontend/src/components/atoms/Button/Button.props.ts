import { ButtonProps } from '@material-ui/core';

import { SCP } from '$types/index';

export type CustomProps = {
  color?: 'main' | 'dark' | 'red' | 'green' | 'yellow';
};

export type Props = CustomProps & Omit<ButtonProps, keyof CustomProps | keyof SCP>;
