import { Context } from 'koa';
import { defaults } from 'lodash';
import { SetOption } from 'cookies';

import register from './register';

const defaultOptions: SetOption = {
  httpOnly: true,
  signed: true,
  maxAge: 4 * 60 * 60 * 1000, // ? 4H
};

const setCookie = (ctx: Context, name: string, value: string, options: SetOption = {}) => {
  defaults(options, defaultOptions);

  ctx.cookies.set(name, value, options);
};

const clearCookie = (ctx: Context, name: string) => {
  ctx.cookies.set(name, '');
};

export default {
  register,
  setCookie,
  clearCookie,
};
