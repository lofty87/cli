import { PackageJson, ProjectType } from '$types/index';

export const createProject = (projectDir: string, projectType: ProjectType, packageJson: PackageJson) => {
  console.log(projectDir);
  console.log(projectType);
  console.log(packageJson);
};
