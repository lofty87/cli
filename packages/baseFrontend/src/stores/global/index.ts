import Request from './request';
import ModalAlert from './ModalAlert';
import ModalConfirm from './ModalConfirm';
import ModalSpinner from './ModalSpinner';

export default class GlobalStore {
  private _request: Request;
  private _modalAlert: ModalAlert;
  private _modalConfirm: ModalConfirm;
  private _modalSpinner: ModalSpinner;

  constructor() {
    this._request = new Request();
    this._modalAlert = new ModalAlert();
    this._modalConfirm = new ModalConfirm();
    this._modalSpinner = new ModalSpinner();
  }

  public get request() {
    return this._request;
  }

  public get modalAlert() {
    return this._modalAlert;
  }

  public get modalConfirm() {
    return this._modalConfirm;
  }

  public get modalSpinner() {
    return this._modalSpinner;
  }
}

export type { ApiType } from './request';
