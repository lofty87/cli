import { STATUS_CODES } from 'http';

import chalk from 'chalk';
import { Middleware } from 'koa';
import { StatusError } from '@classes/index';
import { responseByFormatter } from '@lib/formatter';

/**
 * * route error handling
 */
const errorMiddleware: Middleware = async (ctx, next) => {
  const { type } = ctx.request;

  try {
    await next();
  } catch(error) {
    if(error instanceof StatusError) {
      const { status, message } = error;

      responseByFormatter(ctx, message, type, status);
    } else {
      responseByFormatter(ctx, STATUS_CODES[500], type, 500);

      console.log('\n');
      console.error(chalk.red(error));
    }
  }
};

export default errorMiddleware;
