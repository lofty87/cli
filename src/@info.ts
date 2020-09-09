import { author, bin, bugs, description, homepage, license, version } from '../package.json';

// * lofty87-cli (command)
const name = Object.keys(bin)[0];

export default {
  name,
  version,
  description,
  author: author.name,
  homepage,
  bugsUrl: bugs.url,
  license,
};
