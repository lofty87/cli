import inquirer from 'inquirer';
import { execScript, getProgressBar } from '@lib/index';

export const git = async () => {
  type Answer = {
    useGit: boolean;
  };

  const answer = await inquirer.prompt<Answer>([
    {
      type: 'confirm',
      name: 'useGit',
      message: 'use git?',
      default: true,
    },
  ]);

  return answer.useGit;
};

export const initializeGit = (projectDir: string) => {
  getProgressBar().nextStep();

  return execScript(`cd ${projectDir} && git init`);
};
