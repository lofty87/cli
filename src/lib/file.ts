import fs from 'fs';

import chalk from 'chalk';

/**
 * @name ensureDirSync
 * * check existing project's name
 */
export const ensureDirSync = (path: string) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);

    const splittedPath = path.split('/');
    const projectName = splittedPath[splittedPath.length - 1];

    throw new Error(chalk.red(`existed ${projectName}`));
  } catch(error) {
    // ? not existed
  }
};
