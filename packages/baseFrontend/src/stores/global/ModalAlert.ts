import { action, computed, observable } from 'mobx';

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

export class ModalAlertStore {
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
  private open = () => {
    this._state.open = true;
  };

  @action
  public close = () => {
    this._state.open = false;
  };

  @action
  public inform = (title: string, message?: string) => {
    this._state = makeState('inform', title, message);

    return {
      open: this.open,
    };
  };

  @action
  public warn = (title: string, message?: string) => {
    this._state = makeState('warn', title, message);

    return {
      open: this.open,
    };
  };

  @action
  public error = (title: string, message?: string) => {
    this._state = makeState('error', title, message);

    return {
      open: this.open,
    };
  };
}

export type ModalAlertStoreActions = Omit<ModalAlertStore, 'state'>;
