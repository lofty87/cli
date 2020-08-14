import cluster, { Worker } from 'cluster';
import os from 'os';

import { defaultsDeep } from 'lodash';

/**
 * * worker count 기본값은 cpu core 수
 */

type StartApp = (worker: Worker) => Promise<void>;

type Options = {
  workerCount?: number;
};

const MAX_WORKER_COUNT = os.cpus().length;

export default (startApp: StartApp, customOptions: Options = {}) => {
  const {
    workerCount: customWorkerCount
  } = customOptions;

  if(customWorkerCount && (customWorkerCount < 1 || customWorkerCount > MAX_WORKER_COUNT)) {
    throw new Error(`workerCount option value must be (1 ~ ${MAX_WORKER_COUNT})`);
  }

  const options: Required<Options> = defaultsDeep(customOptions, {
    workerCount: MAX_WORKER_COUNT,
  });

  const { workerCount } = options;

  cluster.on('online', (worker) => {
    console.log(`worker(pid:${worker.process.pid}) is created.`);
  });

  cluster.on('exit', (worker, code) => {
    console.log(`worker(pid:${worker.process.pid}) died.`);

    if(code === 200) {
      cluster.fork();
    }
  });

  if(cluster.isMaster) {
    for(let i = 0; i < workerCount; i++) {
      cluster.fork();
    }
  } else if(cluster.isWorker) {
    startApp(cluster.worker);
  }
};
