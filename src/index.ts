import { program } from 'commander';

import packageJson from '../package.json';

program.version(packageJson.version);
