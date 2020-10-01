import { execScript, getProgressBar } from '@lib/index';

export const downloadModules = (projectDir: string) => {
  getProgressBar()
    .nextStep();

  return execScript(`cd ${projectDir} && npm install`);
};
