import chalk from 'chalk';
import { Command } from 'commander';

import pkg from '../package.json';

const program = new Command();

program.version(pkg.version).parse(process.argv);

console.log(chalk.greenBright(pkg.version));
