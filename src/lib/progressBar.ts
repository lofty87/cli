import { SingleBar } from 'cli-progress';
import chalk from 'chalk';

import { ProjectType } from '$types/index';

let progressBar: null | SingleBar = null;

/**
 * @name initializeProgressBar
 * * 1. copy {project} base
 * * 2. create a package.json
 * * 3. download modules (npm install)
 */
const TOTAL = 3;

export const initializeProgressBar = () => {
  progressBar = new SingleBar({
    format: `processing: [${chalk.cyan('{bar}')}] {value}/{total}`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    hideCursor: true,
  });

  progressBar.start(TOTAL, 0);
};

export const getProgressBar = () => {
  if(!progressBar) {
    throw Error('require to initialize progress bar');
  }

  return progressBar;
};

export const printProcess = (projectType: ProjectType) => {
  console.log(
    chalk.yellow(`
1. copy ${projectType} base
2. create a package.json
3. download modules (npm install)
`)
  );
};
