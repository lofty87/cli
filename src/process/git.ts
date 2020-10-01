import fs from 'fs';

import fse from 'fs-extra';
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
      message: 'use git? (required git install)',
      default: true,
    },
  ]);

  return answer.useGit;
};

export const initializeGit = (projectDir: string) => {
  getProgressBar()
    .nextStep();

  return execScript(`cd ${projectDir} && git init`);
};

/**
 * @name distinguishFileName
 * @returns gitignoreExists
 * * development 환경과 npm 환경에 잘 대응할 수 있도록
 * * .gitignore 또는 .npmignore 를 판별할 수 있는 함수 작성
 *
 * ! npm 이슈인지 아니면 일부러 그런 것인지 모르겠지만
 * ! .gitignore 파일을 .npmignore 파일로 명을 변경한다.
 */
const distinguishFileName = async (projectDir: string) => {
  const npmignoreFilePath = `${projectDir}/.npmignore`;
  const gitignoreFilePath = `${projectDir}/.gitignore`;

  try {
    fs.accessSync(npmignoreFilePath);

    await fse.move(npmignoreFilePath, gitignoreFilePath);

    return true;
  } catch(npmignoreError) {
    try {
      fs.accessSync(gitignoreFilePath);

      return true;
    } catch(gitignoreError) {
      return false;
    }
  }
};

/**
 * @name processGitIgnore
 * * git 사용여부에 따라 .gitignore 파일 존속을 결정
 */
export const processGitignore = async (projectDir: string, useGit: boolean) => {
  const gitignoreFilePath = `${projectDir}/.gitignore`;
  const gitignoreExists = await distinguishFileName(projectDir);

  if(useGit && !gitignoreExists) {
    await fse.ensureFile(gitignoreFilePath);
  } else if(!useGit && gitignoreExists) {
    await fse.remove(gitignoreFilePath);
  }
};
