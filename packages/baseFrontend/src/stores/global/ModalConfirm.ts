import { action, computed, observable } from 'mobx';
import { Function } from '@lofty87/types';

/**
 * * ModalConfirm Component State
 */
type State = {
  title: undefined | string;
  message: undefined | string;
  open: boolean;
  agreeCallback?: Function;
  disAgreeCallback?: Function;
};

const initialState: State = {
  title: undefined,
  message: '',
  open: false,
  agreeCallback: undefined,
  disAgreeCallback: undefined,
};

export class ModalConfirmStore {
  @observable
  private _state = initialState;

  @computed
  public get state() {
    return this._state;
  }

  @action
  public initialize = () => {
    this._state = initialState;
  };

  @action
  private open = (agreeCallback?: Function, disAgreeCallback?: Function) => {
    this._state = {
      ...this._state,
      open: true,
      agreeCallback,
      disAgreeCallback,
    };
  };

  @action
  public close = () => {
    this._state.open = false;
  };

  @action
  public config = (title: string, message?: string) => {
    this._state = {
      ...this.state,
      title,
      message,
    };

    if(!message) {
      this._state = {
        ...this.state,
        title: undefined,
        message: title,
      };
    }

    return {
      open: this.open,
    };
  };
}

export type ModalConfirmStoreActions = Omit<ModalConfirmStore, 'state'>;
