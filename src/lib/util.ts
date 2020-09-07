import { ProjectType } from '$types/index';

export const getPackageName = (projectType: ProjectType) => {
  const startChar = projectType.slice(0, 1).toUpperCase();
  const restChars = projectType.slice(1, projectType.length).toLowerCase();

  return `base${startChar}${restChars}`;
};
