import { basename } from 'path';

import fs from 'fs-extra';
import { defaultsDeep } from 'lodash';
import paths from '@config/paths';
import { getPackageJson, getPackageName, getProgressBar, writePackageJson } from '@lib/index';
import info from '@info';

import { PackageJson, ProjectType } from '$types/index';

const { buildDir, packagesDir, rootDir } = paths;

/**
 * @name createProject
 * * 개발환경과 실제 설치되었을 때의 cli 경로가 서로 다르고
 * * npx 사용과 global install 또한 app-root-path 값이 서로 다르고
 * * 이리저리 테스트 후 총 세 가지 방법으로 copy 를 처리하였다.
 *
 * ? development          : paths 를 사용해서 build 경로를 직접 설정
 * ? app-root-path(build) : app-root-path 가 바로 build 경로를 가리킬 때
 * ? app-root-path(module): app-root-path 가 module 을 가리키고 node_modules 아래에 cli 가 설치되어 있을 때
 */
export const createProject = async (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  // ? step 1
  getProgressBar().nextStep();

  const packageName = getPackageName(projectType);

  try {
    // ? development
    const packageDir = `${buildDir}/${basename(packagesDir)}/${packageName}`;

    await fs.copy(packageDir, projectDir);
  } catch(devError) {
    try {
      // ? app-root-path(build)
      const packageDir = `${rootDir}/${basename(packagesDir)}/${packageName}`;

      await fs.copy(packageDir, projectDir);
    } catch(prodError) {
      // ? app-root-path(module)
      const packageDir = `${rootDir}/node_modules/${info.name}/${basename(buildDir)}/${basename(packagesDir)}/${packageName}`;

      await fs.copy(packageDir, projectDir);
    }
  }

  // ? step 2
  getProgressBar().nextStep();

  let projectPackageJson = await getPackageJson(projectDir);

  projectPackageJson = defaultsDeep(packageJson, projectPackageJson);

  await writePackageJson(projectDir, projectPackageJson);
};
