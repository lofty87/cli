import { Middleware } from 'koa';

const apiCtrl: Middleware = (ctx) => {
  ctx.body = 'requested api';
};

const routerCtrl: Middleware = (ctx) => {
  ctx.body = 'requested router';
};

export default {
  apiCtrl,
  routerCtrl,
};
