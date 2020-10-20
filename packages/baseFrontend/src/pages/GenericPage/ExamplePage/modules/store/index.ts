import { DomainStore } from '@classes/index';
import { Stores } from '@stores/index';

import { ExampleType } from '$types/example(delete)';

export default class ExampleStore extends DomainStore<ExampleType, Stores> {}
