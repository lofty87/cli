import { exec } from 'child_process';

import fs from 'fs-extra';

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

export const execScript = (script: string) =>
  new Promise<string>((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if(error) {
        reject(stderr);
      }

      resolve(stdout);
    });
  });
