import { action, makeObservable, observable } from 'mobx';

import { ApiType } from './ApiTypes';

/**
 * * 각 api 마다 독립적인 request state 를 관리하기 위해,
 * * Map 객체를 통해 state 를 작성.
 *
 * ! api 를 추가할 때 마다 api type 도 직접 추가.
 */

type PrivateMembers = '_state';

export default class Request {
  private _state = new Map<ApiType, 'pending' | 'done'>();

  constructor() {
    makeObservable<this, PrivateMembers>(this, {
      _state: observable,
      pendingOn: action,
      doneOn: action,
      get: observable,
    });
  }

  public pendingOn = (apiType: ApiType) => {
    this._state.set(apiType, 'pending');
  };

  public doneOn = (apiType: ApiType) => {
    this._state.set(apiType, 'done');
  };

  public get(apiType: ApiType) {
    return this._state.get(apiType) || 'done';
  }
}

export type { ApiType };
