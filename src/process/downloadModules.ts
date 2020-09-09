import { exec } from 'child_process';

import { getProgressBar } from '@lib/index';

const execPromise = (projectDir: string) => {
  const script = `cd ${projectDir} && npm install`;

  return new Promise<string>((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if(error) {
        reject(stderr);
      }

      resolve(stdout);
    });
  });
};

export const downloadModules = async (projectDir: string) => {
  getProgressBar().nextStep();

  await execPromise(projectDir);
};
