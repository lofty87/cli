import './lib/dotenv';

import Koa from 'koa';
import logger from 'koa-logger';
import envVar from '@envVar/envVar';
import router from '@api/index';

const app = new Koa();
const { port } = envVar;

app.use(logger());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`server is listening to ${port}`);
});
