import serverConfig from '@serverConfig/index';
import { Koa } from '@classes/index';
import cluster from '@lib/cluster';
import env from '@config/env';

const { port, nodeEnv } = env;

cluster(async (worker) => {
  const server = await serverConfig();

  const app = server(
    new Koa({
      env: nodeEnv,
    })
  );

  app.listen(port, () => {
    console.log(`server(pid:${worker.process.pid}) is listening to port ${port}`);
  });
});
