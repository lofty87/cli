import { SingleBar } from 'cli-progress';
import chalk from 'chalk';

let progressBar: null | SingleBar = null;
let stepTimer: null | NodeJS.Timeout = null;

/**
 * @name initializeProgressBar
 * * 1. copy {project} base
 * * 2. create a package.json
 * * 3. download modules (npm install)
 *
 * * 각 step 들의 bar 상태를 dynamic 하게 만들기 위해
 * * {value} 대신 {step} payload 를 사용
 */
export const initializeProgressBar = (total = 3) => {
  progressBar = new SingleBar({
    format: `{title}: [${chalk.cyan('{bar}')}] {step}/${chalk.green('{total}')}`,
    barCompleteChar: '=',
    barIncompleteChar: ' ',
    hideCursor: true,
  });

  progressBar.start(total, 0, {
    title: 'processing',
    step: 1,
  });
};

/**
 * @name dynamicProgressBarUpdate
 * * setInterval 을 통해 progress bar 를 dynamic 하게 표현
 *
 * ! update 후 stepTimer 를 반드시 clearInterval
 */
const dynamicProgressBarUpdate = (step: number) => {
  const initBarValue = step - 1;

  let barValue = initBarValue;

  stepTimer = setInterval(() => {
    if(barValue > step) {
      barValue = initBarValue;
    }

    progressBar!.update(barValue, {
      title: 'processing',
      step,
    });

    barValue += 0.1;
  }, 300);
};

/**
 * @name stop
 * * progress bar stop 처리
 */
const stop = (total: number) => {
  progressBar!.update(total, {
    title: chalk.green('completed'),
    step: chalk.green(total),
  });

  progressBar!.stop();
};

/**
 * @name getProgressBar
 * * nextStep: progress bar 를 다음 단계로
 * * end     : progress bar 완료
 *
 * ? nextStep() 호출이 total 수를 초과할 경우 end() 처리
 */
let step = 1;

export const getProgressBar = () => {
  if(!progressBar) {
    throw Error('require to initialize progress bar');
  }

  const total = progressBar.getTotal();

  return {
    nextStep: () => {
      if(stepTimer) {
        clearInterval(stepTimer);
      }

      if(step > total) {
        stop(total);
      } else {
        dynamicProgressBarUpdate(step++);
      }
    },
    end: () => {
      clearInterval(stepTimer!);

      stop(total);
    },
  };
};
