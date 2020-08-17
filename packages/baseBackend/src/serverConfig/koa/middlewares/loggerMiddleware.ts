import { Context, Next } from 'koa';
import koaLogger from 'koa-logger';

/**
 * * koa-logger 커스터 마이징
 * * assets 관련 request 는 로그를 남기지 않도록
 */

type Transporter = (str: string, args: object) => void;

interface TransporterOpts {
  transporter: Transporter;
}

const assetsRegExp = /(\.js|\.css|\.ico|\.png|\.jpg|\.jpeg|\.gif)$/;
const isAssets = ({ path }: Context) => assetsRegExp.test(path);

const loggerMiddleware = (opt?: Transporter | TransporterOpts) => {
  const logger = koaLogger(opt);

  return async (ctx: Context, next: Next) => {
    if(isAssets(ctx)) {
      await next();
    } else {
      await logger.call(this, ctx, next);
    }
  };
};

export default loggerMiddleware;
