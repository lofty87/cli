import { action, computed, observable } from 'mobx';

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

export class ModalSpinnerStore {
  @observable private _state = initialState;

  @computed
  public get state() {
    return this._state;
  }

  @action
  public show = () => {
    this._state.show = true;
  };

  @action
  public pending = () => {
    if(this._state.show) {
      this._state.reqState = true;
    }
  };

  @action
  public done = () => {
    this._state = initialState;
  };
}

export type ModalSpinnerStoreActions = Omit<ModalSpinnerStore, 'state'>;
