import { action, computed, observable } from 'mobx';

import { ApiTypes } from './ApiTypes';

/**
 * * 각 api 마다 독립적인 request state 를 관리하기 위해,
 * * Map 객체를 통해 Store 를 작성.
 *
 * ! api 를 추가할 때 마다,
 * ! api type 도 직접 추가해야 한다.
 */
export class RequestStore {
  @observable
  private _state = new Map<ApiTypes, 'pending' | 'done'>();

  @action
  public setPending = (apiType: ApiTypes) => {
    this._state.set(apiType, 'pending');
  };

  @action
  public setDone = (apiType: ApiTypes) => {
    this._state.set(apiType, 'done');
  };

  @computed
  public get(apiType: ApiTypes) {
    return this._state.get(apiType) || 'done';
  }
}

export type RequestStoreActions = Omit<RequestStore, 'get'>;
