import { Api } from '@classes/index';
import { TempType } from '@stores/temp/TempType';

const NAME = 'temp';
const PATHNAME = '/temps';

const api = new Api<TempType>(NAME, PATHNAME);

export default {
  ...api,
};
