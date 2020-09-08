import { basename } from 'path';

import fs from 'fs-extra';
import paths from '@config/paths';
import { getPackageName } from '@lib/index';

import { name as moduleName } from '../../package.json';

import { PackageJson, ProjectType } from '$types/index';

const { buildDir, packagesDir, rootDir } = paths;

/**
 * @name createProject
 * * development 와 production 환경의 경로 구조가 달라서
 * * package 를 copy 할 때 서로 다르게 처리했다.
 *
 * * build dir (use app-root-path)
 * * development: '~/module/build'
 * * production : '~/.npm/_npx/{random}/lib/node_modules/module/build'
 */
export const createProject = async (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  let packageDir;

  const packageName = getPackageName(projectType);

  try {
    // ? development
    packageDir = `${buildDir}/${basename(packagesDir)}/${packageName}`;

    await fs.copy(packageDir, projectDir);
  } catch(error) {
    // ? production
    packageDir = `${rootDir}/node_modules/${moduleName}/${basename(buildDir)}/${basename(packagesDir)}}/${packageName}`;

    await fs.copy(packageDir, projectDir);
  }

  console.log(packageJson);
};
