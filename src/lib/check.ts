import fs from 'fs';
import { basename } from 'path';

import validateNpmPackageName from 'validate-npm-package-name';
import chalk from 'chalk';

/**
 * @name validateProjectName
 * * npm package naming rules
 * ? https://github.com/npm/validate-npm-package-name#naming-rules
 */
export const validateProjectName = (projectName: string) => {
  const { validForNewPackages, errors, warnings } = validateNpmPackageName(projectName);

  if(!validForNewPackages) {
    const errorMsg = `
${chalk.red(`project cannot named "${chalk.yellow(projectName)}"`)}
${chalk.red('because of npm naming restrictions:')}

${(errors || [])
    .concat(warnings || [])
    .map((msg: string) => chalk.redBright(` * ${msg}\n`))
    .join('')}
${chalk.red('please, create a different project name.')}
`;

    throw new Error(errorMsg);
  }
};

/**
 * @name checkDirExistsSync
 * * check project exists
 */
export const checkDirExistsSync = (projectDir: string) => {
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
      // fs.mkdirSync(dir);
    }
  }
};
