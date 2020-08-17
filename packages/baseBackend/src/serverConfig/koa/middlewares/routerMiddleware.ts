import Router from 'koa-router';
import compose from 'koa-compose';
import { MethodNotAllowedError, NotImplementedError } from '@classes/index';
import api from '@api/index';
import router from '@routers/index';

/**
 * ! Not Implemented: 불가능한 method 로 요청 시 발생
 * ! Method Not Allowed: 라우터에 해당 method 에 대한 정의가 없는 상태
 */

export const ALLOWED_METHOD = [ 'HEAD', 'GET', 'POST', 'PATCH', 'DELETE' ];

const combinedRouter = new Router({
  methods: ALLOWED_METHOD,
})
  .use(api.routes())
  .use(router.routes());

const routerMiddleware = compose([
  combinedRouter.routes(),
  combinedRouter.allowedMethods({
    throw: true,
    notImplemented: () => new NotImplementedError(),
    methodNotAllowed: () => new MethodNotAllowedError(),
  }),
]);

export default routerMiddleware;
