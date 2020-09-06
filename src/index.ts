import chalk from 'chalk';
import { program } from 'commander';
import paths from '@config/paths';
import { checkProjectName, ensureDirSync } from '@lib/index';

import info from './info';

const { rootDir } = paths;

try {
  program
    .version(chalk.greenBright(info.version))
    .name(chalk.green(info.name))
    .usage(chalk.greenBright('<project-name>'))
    .description(chalk.yellow(info.description))
    .arguments('<project-name>')
    .action((projectName: string) => {
      const projectDir = `${rootDir}/${projectName}`;

      checkProjectName(projectName);
      ensureDirSync(projectDir);
    })
    .parse(process.argv);
} catch(error) {
  console.error(error);
}
