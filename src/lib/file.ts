import fs from 'fs';
import { basename } from 'path';

import chalk from 'chalk';

/**
 * @name ensureDirSync
 * * check existing project name
 */
export const ensureDirSync = (dirPath: string) => {
  try {
    fs.accessSync(dirPath, fs.constants.F_OK);

    const projectName = basename(dirPath);
    const errorMsg = chalk.red(`already existed "${chalk.yellow(projectName)}" project`);

    throw new Error(errorMsg);
  } catch(error) {
    const existed = error.code !== 'ENOENT';

    if(existed) {
      throw error;
    }
  }
};
