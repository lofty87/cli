import { Api } from '@classes/index';
import { TempType } from '@stores/temp/type';

const NAME = 'temp';
const PATHNAME = '/temps';

const temp = new Api<TempType>(NAME, PATHNAME);

export default {
  ...temp,
};
