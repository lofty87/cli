import Router from 'koa-router';
import ctrl from '@controllers/index';

const router = new Router();

router.get('/', ctrl.routerCtrl);

export default router;
