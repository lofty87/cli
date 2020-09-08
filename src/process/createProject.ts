import { basename } from 'path';

import fs from 'fs-extra';
import { defaultsDeep } from 'lodash';
import paths from '@config/paths';
import { getPackageJson, getPackageName, getProgressBar, writePackageJson } from '@lib/index';

import { name as moduleName } from '../../package.json';

import { PackageJson, ProjectType } from '$types/index';

const { buildDir, packagesDir, rootDir } = paths;

/**
 * @name createProject
 * * 개발환경과 실제 설치되었을 때 환경이 서로 달라
 * * app-root-path 값이 최상위 node_modules 를 기준으로 하는 특성상
 * * 두 가지 방법으로 copy 를 처리하였다.
 *
 * * build path 차이
 * * development: '~/@lofty87/cli/build'
 * * production : '~/.npm/_npx/{number}/lib/node_modules/@lofty87/cli/build'
 */
export const createProject = async (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  const packageName = getPackageName(projectType);

  try {
    // ? development
    const packageDir = `${buildDir}/${basename(packagesDir)}/${packageName}`;

    await fs.copy(packageDir, projectDir);
  } catch(error) {
    // ? production
    const packageDir = `${rootDir}/node_modules/${moduleName}/${basename(buildDir)}/${basename(packagesDir)}/${packageName}`;

    await fs.copy(packageDir, projectDir);
  }

  getProgressBar().increment();

  let projectPackageJson = await getPackageJson(projectDir);

  projectPackageJson = defaultsDeep(packageJson, projectPackageJson);

  await writePackageJson(projectDir, projectPackageJson);

  getProgressBar().increment();
};
