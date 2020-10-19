import { configure } from 'mobx';
import { DomainStore } from '@classes/index';
import api from '@api/index';
import env from '@env';

import GlobalStore, { ApiType } from './global/index';

import { ExampleType } from '$types/example(delete)';

/**
 * * 1. component 안에서 useStores() 를 통해 observable 값을 참조.
 * * 2. @stores/index 를 import 해도 useStores() 와 동일한 값이지만
 * *    action 과 observable 값을 구분하기 위해 actions 는 import 를 사용.
 * * 3. flow annotation 으로 wrapping 한 멤버 함수들의 결과값은 Promise 인데,
 * *    타입스크립트가 Generator 까지만 타입을 인식해 주는 문제가 있음.
 * !    >> 멤버 함수 사용시 올바른 결과 타입을 위해 flowResult 를 사용!!
 * ?    https://mobx.js.org/actions.html#using-flow-instead-of-async--await-
 *
 * TODO: observable, getter 와 action, method 를 구분하여 사용할 수 있는 방법
 */

class Stores {
  private _global: GlobalStore;
  private _example: DomainStore<ExampleType, this>;

  constructor() {
    this._global = new GlobalStore();
    this._example = new DomainStore<ExampleType, this>('example', this, api.example);
  }

  public get global() {
    return this._global;
  }

  public get example() {
    return this._example;
  }
}

// consider of IE11 (not supported proxy)
configure({
  useProxies: env.isDev ? 'never' : 'ifavailable',
  enforceActions: 'observed',
});

export { useStores } from './StoreProvider';

export type { ApiType, Stores };

export default new Stores();
