import { basename } from 'path';

import Koa from 'koa';
import compose from 'koa-compose';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cookies from '@lib/cookies';
import paths from '@config/paths';
import env from '@config/env';

import {
  ALLOWED_METHOD,
  error,
  logger,
  notFound,
  router
} from './middlewares';

const { isDev } = env;
const { assetsDir } = paths;

const allowMethods = ALLOWED_METHOD.join(',');

export const acceptedCookieNames = [ 'cookie' ];

// ! keep order !!
export default async () =>
  await new Promise<(koa: Koa) => Koa>((resolve) => {
    const middleware = compose([
      serve(basename(assetsDir)),
      bodyParser()
    ]);

    resolve((koa) => {
      cookies.register(koa, acceptedCookieNames);

      // * cors, log
      if(isDev) {
        koa.use(
          cors({
            allowMethods,
            credentials: 'credentials',
          })
        );

        koa.use(logger());
      }

      koa.use(error);
      koa.use(middleware);
      koa.use(notFound);
      koa.use(router);

      return koa;
    });
  });
