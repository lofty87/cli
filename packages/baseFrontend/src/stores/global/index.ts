import { Request, RequestActions } from './request';
import { ModalAlert, ModalAlertStoreActions } from './ModalAlert';
import { ModalConfirm, ModalConfirmActions } from './ModalConfirm';
import { ModalSpinner, ModalSpinnerActions } from './ModalSpinner';

const request = new Request();
const modalAlert = new ModalAlert();
const modalConfirm = new ModalConfirm();
const modalSpinner = new ModalSpinner();

export const globalStore = {
  request: request as Omit<Request, keyof RequestActions>,
  modalAlert: modalAlert as Omit<ModalAlert, keyof ModalAlertStoreActions>,
  modalConfirm: modalConfirm as Omit<ModalConfirm, keyof ModalConfirmActions>,
  modalSpinner: modalSpinner as Omit<ModalSpinner, keyof ModalSpinnerActions>,
};

export const globalActions = {
  request: request as RequestActions,
  modalAlert: modalAlert as ModalAlertStoreActions,
  modalConfirm: modalConfirm as ModalConfirmActions,
  modalSpinner: modalSpinner as ModalSpinnerActions,
};
