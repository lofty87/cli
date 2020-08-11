import fs from 'fs';
import { basename } from 'path';

import chalk from 'chalk';

/**
 * @name ensureDirSync
 * * check existing project name.
 * * when not existed, create project dir.
 */
export const ensureDirSync = (projectDir: string) => {
  try {
    fs.accessSync(projectDir, fs.constants.F_OK);

    const projectName = basename(projectDir);
    const errorMsg = chalk.red(`already existed "${chalk.yellow(projectName)}" project`);

    throw new Error(errorMsg);
  } catch(error) {
    const existed = error.code !== 'ENOENT';

    if(existed) {
      throw error;
    } else {
      fs.mkdirSync(projectDir);
    }
  }
};
