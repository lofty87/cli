import { bin, description, version } from '../package.json';

// * lofty87-cli (command)
const name = Object.keys(bin)[0];

export default {
  version,
  name,
  description,
};
