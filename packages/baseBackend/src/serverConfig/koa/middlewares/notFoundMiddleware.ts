import { Middleware } from 'koa';
import { NotFoundError } from '@classes/index';

/**
 * * last router
 * * route 중에 status 값이 변하므로
 * * destructuring ({ status }) 문법 사용 금지
 */
const notFoundMiddleware: Middleware = async (ctx, next) => {
  await next();

  if(!ctx.status || ctx.status === 404) {
    throw new NotFoundError();
  }
};

export default notFoundMiddleware;
