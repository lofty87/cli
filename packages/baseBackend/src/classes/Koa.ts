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

    this.proxy = opts.proxy;
    this.proxyIpHeader = opts.proxyIpHeader;
    this.maxIpsCount = opts.maxIpsCount;
    this.subdomainOffset = opts.subdomainOffset;
    this.env = opts.env;
    this.keys = opts.keys;
  }
}
