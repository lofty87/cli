import { action, computed, makeObservable, observable } from 'mobx';

/**
 * * ModalAlert Component State
 */

type Usage = 'inform' | 'warn' | 'error';

type State = {
  usage: Usage;
  title: undefined | string;
  message: undefined | string;
  open: boolean;
};

const makeState = (usage: Usage, title: string, message?: string) => {
  let state: State = {
    usage,
    title,
    message,
    open: false,
  };

  if(!message) {
    state = {
      ...state,
      title: undefined,
      message: title,
    };
  }

  return state;
};

const initialState: State = {
  usage: 'inform',
  title: undefined,
  message: '',
  open: false,
};

type PrivateMembers = '_state' | 'open';

export default class ModalAlert {
  private _state = initialState;

  constructor() {
    makeObservable<this, PrivateMembers>(this, {
      _state: observable,
      state: computed,
      initialize: action,
      open: action,
      close: action,
      inform: action,
      warn: action,
      error: action,
    });
  }

  public get state() {
    return this._state;
  }

  public initialize = () => {
    this._state = initialState;
  };

  private open = () => {
    this._state.open = true;
  };

  public close = () => {
    this._state.open = false;
  };

  public inform = (title: string, message?: string) => {
    this._state = makeState('inform', title, message);

    return {
      open: this.open,
    };
  };

  public warn = (title: string, message?: string) => {
    this._state = makeState('warn', title, message);

    return {
      open: this.open,
    };
  };

  public error = (title: string, message?: string) => {
    this._state = makeState('error', title, message);

    return {
      open: this.open,
    };
  };
}
