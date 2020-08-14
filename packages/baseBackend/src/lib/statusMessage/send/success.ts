import { STATUS_CODES } from 'http';

import { Context } from 'koa';

const makeBody = (status: number) => (ctx: Context) => {
  ctx.status = status;
  ctx.body = STATUS_CODES[status];
};

export const sendOK = makeBody(200);
export const sendCreated = makeBody(201);
