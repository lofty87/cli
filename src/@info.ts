import { author, bin, description, version } from '../package.json';

// * lofty87-cli (command)
const name = Object.keys(bin)[0];

export default {
  name,
  version,
  description,
  author: author.name,
};
