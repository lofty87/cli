import { basename } from 'path';

import fs from 'fs-extra';
import { map } from 'lodash';
import chalk from 'chalk';
import info from '@info';

import { name as moduleName } from '../../package.json';

import { PackageJson, ProjectType } from '$types/index';

const PACKAGE_JSON = 'package.json';

export const getPackageName = (projectType: ProjectType) => {
  const startChar = projectType.slice(0, 1).toUpperCase();
  const restChars = projectType.slice(1, projectType.length).toLowerCase();

  return `base${startChar}${restChars}`;
};

export const getPackageJson = async (projectDir: string) => {
  const packageJson = await fs.readJson(`${projectDir}/${PACKAGE_JSON}`);

  return packageJson;
};

export const writePackageJson = async (projectDir: string, packageJson: PackageJson) => {
  await fs.remove(`${projectDir}/${PACKAGE_JSON}`);

  await fs.writeJson(`${projectDir}/${PACKAGE_JSON}`, packageJson, {
    spaces: 2,
    EOL: '\n',
  });
};

export const printEpilogue = async (projectDir: string) => {
  const projectDirBasename = basename(projectDir);
  const packageJson = await getPackageJson(projectDir);
  const { name } = packageJson;
  const scripts = map(packageJson.scripts, (value, key) => `          ${chalk.cyan(key)}`);

  console.log(`


      Success! Created '${chalk.green(name)}' at ${projectDir}

      Thank you for using ${chalk.yellowBright(moduleName)}

      homepage: ${info.homepage}
      bugs    : ${info.bugsUrl}
      license : ${info.license}


      ${chalk.yellowBright(`cd ${projectDirBasename}`)}


      scripts:

${scripts.join('\n\n')}


  `);
};
