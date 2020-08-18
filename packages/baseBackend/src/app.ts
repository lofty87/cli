import chalk from 'chalk';
import serverConfig from '@serverConfig/index';
import { Koa } from '@classes/index';
import cluster from '@lib/cluster';
import env from '@config/env';

const { port, nodeEnv } = env;

cluster(async (worker) => {
  const workerName = chalk.bgMagenta(`worker(pid:${worker.process.pid})`);

  try {
    const server = await serverConfig();

    const app = server(
      new Koa({
        env: nodeEnv,
      })
    );

    app.listen(port, () => {
      console.log(`${workerName}:`, chalk.green(`server is listening to port ${port}`));
    });
  } catch(error) {
    console.error(`${workerName}:`, chalk.red(error.message));
    console.error(error);
  }
});
