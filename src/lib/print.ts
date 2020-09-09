import { basename } from 'path';

import { map } from 'lodash';
import chalk from 'chalk';
import { getPackageJson } from '@lib/index';
import info from '@info';

import { PackageJson, ProjectType } from '$types/index';

export const printPackageJson = (packageJson: PackageJson) => {
  console.log(`
will create a ${chalk.yellow('package.json')} as follows:
  
{
  "name": "${packageJson.name}",
  "version": "${packageJson.version}",
  "description": "${packageJson.description}",
  "author": "${packageJson.author}"
}
  `);
};

export const printProcess = (projectType: ProjectType) => {
  console.log(`
Creating...
    ${chalk.yellow(`
1. copy ${projectType} base
2. create a package.json
3. download modules (npm install)
  `)}`);
};

export const printEpilogue = async (projectDir: string) => {
  const packageJson = await getPackageJson(projectDir);
  const projectName = packageJson.name;
  const scripts = map(packageJson.scripts, (value, key) => `          ${chalk.cyan(key)}`);

  console.log(`


      Success! Created '${chalk.green(projectName)}' at ${projectDir}

      Thank you for using ${chalk.yellowBright(info.name)}

      homepage: ${info.homepage}
      bugs    : ${info.bugsUrl}
      license : ${info.license}


      ${chalk.yellowBright(`cd ${basename(projectDir)}`)}


      scripts:

${scripts.join('\n\n')}


  `);
};
