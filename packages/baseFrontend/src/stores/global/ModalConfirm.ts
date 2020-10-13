import { action, computed, makeObservable, observable } from 'mobx';
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

type PrivateMembers = '_state' | 'open';

export class ModalConfirm {
  private _state = initialState;

  constructor() {
    makeObservable<this, PrivateMembers>(this, {
      _state: observable,
      state: computed,
      initialize: action,
      open: action,
      close: action,
      config: action,
    });
  }

  public get state() {
    return this._state;
  }

  public initialize = () => {
    this._state = initialState;
  };

  private open = (agreeCallback?: Function, disAgreeCallback?: Function) => {
    this._state = {
      ...this._state,
      open: true,
      agreeCallback,
      disAgreeCallback,
    };
  };

  public close = () => {
    this._state.open = false;
  };

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

export type ModalConfirmActions = Omit<ModalConfirm, 'state'>;
