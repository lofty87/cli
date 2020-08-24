import { action, computed, observable } from 'mobx';

import { TempType } from './type';

import { ModelStore } from '$types/index';

type State = null | TempType;

const initialState: State = null;

export class TempStore implements ModelStore<TempType> {
  @observable
  private _state = initialState;

  @computed
  public get state() {
    return this._state;
  }

  @action
  public setState = (state: State) => {
    this._state = state;
  };

  @action
  public initialize = () => {
    this._state = initialState;
  };
}

export type TempStoreActions = Omit<TempStore, 'state'>;
