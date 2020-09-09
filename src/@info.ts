import { author, bin, bugs, description, homepage, license, name, version } from '../package.json';

// * lofty87-cli (command)
const binName = Object.keys(bin)[0];

export default {
  name,
  binName,
  version,
  description,
  author: author.name,
  homepage,
  bugsUrl: bugs.url,
  license,
};
