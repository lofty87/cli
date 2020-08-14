import KoaClass from 'koa';
import Keygrip from 'keygrip';
import { defaults } from 'lodash';

type Options = {
  proxy: boolean;
  proxyIpHeader: string;
  maxIpsCount: number;
  subdomainOffset: number;
  env: 'development' | 'production';
  keys: Keygrip | string[];
};

export default class Koa extends KoaClass {
  constructor(options: Partial<Options> = {}) {
    super();

    const opts: Options = defaults(options, {
      proxy: false,
      proxyIpHeader: 'X-Forwarded-For',
      maxIpsCount: 0,
      subdomainOffset: 2,
      env: 'development',
      keys: [],
    });

    super.proxy = opts.proxy;
    super.proxyIpHeader = opts.proxyIpHeader;
    super.maxIpsCount = opts.maxIpsCount;
    super.subdomainOffset = opts.subdomainOffset;
    super.env = opts.env;
    super.keys = opts.keys;
  }
}
