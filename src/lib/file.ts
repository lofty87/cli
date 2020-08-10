import fs from 'fs';
import { basename } from 'path';

import chalk from 'chalk';

/**
 * @name ensureDirSync
 * * check existing project name
 */
export const ensureDirSync = (dirPath: string) => {
  fs.accessSync(dirPath, fs.constants.F_OK);

  const projectName = basename(dirPath);

  throw new Error(chalk.yellow(`existed '${chalk.red(projectName)}' project name`));
};
