import { Middleware } from 'koa';

const apiCtrl: Middleware = (ctx) => {
  ctx.body = 'requested api ctrl';
};

const routerCtrl: Middleware = (ctx) => {
  ctx.body = 'requested router ctrl';
};

export default {
  apiCtrl,
  routerCtrl,
};
