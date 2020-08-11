import chalk from 'chalk';
import validateProjectName from 'validate-npm-package-name';

/**
 * @name checkProjectName
 * * npm naming rules
 * ? https://github.com/npm/validate-npm-package-name#naming-rules
 */
export const checkProjectName = (projectName: string) => {
  const { validForNewPackages, errors, warnings } = validateProjectName(projectName);

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
