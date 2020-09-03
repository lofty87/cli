import { SCP } from '$types/index';

type CustomProps = {
  type?: 'circle-line' | 'circle' | 'line';
  color?: 'main' | 'dark' | 'red' | 'blue' | 'green' | 'yellow';
  verticalPadding?: number;
  reqState: 'pending' | 'done';
  isLastData?: boolean;
};

export type Props = CustomProps & Omit<CustomProps, keyof SCP>;
