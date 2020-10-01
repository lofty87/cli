import { Context } from 'koa';

export const responseByFormatter = <T>(
  ctx: Context,
  body: T,
  type = 'application/json',
  status = 200
) => {
  ctx.type = type;
  ctx.status = status;
  ctx.body = body;
};
