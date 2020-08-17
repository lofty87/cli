import Router from 'koa-router';
import ctrl from '@controllers/index';

const api = new Router({
  prefix: '/api',
});

api.get('/', ctrl.apiCtrl);

export default api;
