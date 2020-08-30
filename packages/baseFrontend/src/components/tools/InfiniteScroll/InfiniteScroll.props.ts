import { RefObject } from 'react';
import { Function } from '@lofty87/types';

type RefElements = HTMLBodyElement | HTMLDivElement;

export type Props = {
  onBottom: Function;
  pause?: boolean;
  targetRef?: RefObject<RefElements>;
};
