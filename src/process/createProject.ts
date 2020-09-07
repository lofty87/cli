import fs from 'fs-extra';
// import paths from '@config/paths';
import { getPackageName } from '@lib/index';
// import info from '@info';

import { PackageJson, ProjectType } from '$types/index';

export const createProject = (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  const packageDir = `packages/${getPackageName(projectType)}`;

  fs.copySync(packageDir, projectDir);

  console.log(projectDir);
  console.log(packageDir);
  console.log(packageJson);
};
