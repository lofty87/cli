import { basename } from 'path';

import fs from 'fs-extra';
import paths from '@config/paths';
import { getPackageName } from '@lib/index';

import { PackageJson, ProjectType } from '$types/index';

export const createProject = async (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  const packagesDir = `${paths.buildDir}/${basename(paths.packagesDir)}`;
  const packageName = getPackageName(projectType);
  const packageDir = `${packagesDir}/${packageName}`;

  await fs.copy(packageDir, projectDir);

  console.log(projectDir);
  console.log(packageDir);
  console.log(packageJson);
};
