import { Api } from '@classes/index';

import { ExampleType } from '$types/example(delete)';

const NAME = 'example';
const PATHNAME = '/examples';

export default new Api<ExampleType>(NAME, PATHNAME);
