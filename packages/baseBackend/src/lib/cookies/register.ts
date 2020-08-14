import Koa from 'koa';
import Keygrip from 'keygrip';

/**
 * @name register
 * * koa 에 허용되는 쿠키명을 등록
 */
const register = (koa: Koa, acceptedCookieNames: string[] = []) => {
  koa.keys = new Keygrip(acceptedCookieNames);
};

export default register;
