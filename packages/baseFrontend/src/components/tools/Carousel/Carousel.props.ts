import { Settings } from 'react-slick';

import { SCP } from '$types/index';

export type Props = Omit<Settings, keyof SCP>;
