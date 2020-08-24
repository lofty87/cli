import { action, computed, observable } from 'mobx';

import { TempType } from './type';

import { ModelFormStore } from '$types/index';

type State = Pick<TempType, 'name' | 'password'>;

const initialState: State = {
  name: '',
  password: '',
};

export class TempFormStore implements ModelFormStore<TempType, keyof State> {
  @observable
  private _state = initialState;

  @computed
  public get state() {
    return this._state;
  }

  @action
  public setState(state: State) {
    this._state = state;
  }

  @action
  public initialize = () => {
    this._state = initialState;
  };

  @action
  public changeValue = (name: string, value: string) => {
    switch(name) {
      case 'name':
      case 'password': {
        this._state[name] = value;

        break;
      }
    }
  };
}

export type TempFormStoreActions = Omit<TempFormStore, 'state'>;
