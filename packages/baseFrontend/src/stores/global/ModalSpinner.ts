import { action, computed, makeObservable, observable } from 'mobx';

/**
 * * ModalSpinner Component State
 * * axios 를 interceptor 하여 안에서 request state 를 처리
 *
 * * axios 또는 api 를 호출하기 전에
 * * show() action 을 호출하면 pending 상태에서 ModalSpinner 를 볼 수 있다.
 */

type State = {
  show: boolean;
  reqState: boolean;
};

const initialState: State = {
  show: false,
  reqState: false,
};

type PrivateMembers = '_state';

export class ModalSpinner {
  private _state = initialState;

  constructor() {
    makeObservable<this, PrivateMembers>(this, {
      _state: observable,
      state: computed,
      show: action,
      pending: action,
      done: action,
    });
  }

  public get state() {
    return this._state;
  }

  public show = () => {
    this._state.show = true;
  };

  public pending = () => {
    if(this._state.show) {
      this._state.reqState = true;
    }
  };

  public done = () => {
    this._state = initialState;
  };
}

export type ModalSpinnerActions = Omit<ModalSpinner, 'state'>;
