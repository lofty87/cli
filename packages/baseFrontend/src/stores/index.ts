import { configure } from 'mobx';

import {
  ModalAlertStore,
  ModalAlertStoreActions,
  ModalConfirmStore,
  ModalConfirmStoreActions,
  ModalSpinnerStore,
  ModalSpinnerStoreActions,
  RequestStore,
  RequestStoreActions,
} from './global/index';
import {
  TempFormStore,
  TempFormStoreActions,
  TempListStore,
  TempListStoreActions,
  TempStore,
  TempStoreActions,
} from './temp';

/**
 * * 1. state 변경은 action 을 통해서만 가능
 * * 2. useStores() 를 통해 observable state 를 사용
 */

configure({
  useProxies: 'ifavailable',
  enforceActions: 'always',
});

const modalAlertStore = new ModalAlertStore();
const modalConfirmStore = new ModalConfirmStore();
const modalSpinnerStore = new ModalSpinnerStore();
const requestStore = new RequestStore();
const tempFormStore = new TempFormStore();
const tempListStore = new TempListStore();
const tempStore = new TempStore();

export { useStores } from './StoreProvider';

export const stores = {
  modalAlert: modalAlertStore as Omit<ModalAlertStore, keyof ModalAlertStoreActions>,
  modalConfirm: modalConfirmStore as Omit<ModalConfirmStore, keyof ModalConfirmStoreActions>,
  modalSpinner: modalSpinnerStore as Omit<ModalSpinnerStore, keyof ModalSpinnerStoreActions>,
  request: requestStore as Omit<RequestStore, keyof RequestStoreActions>,
  tempForm: tempFormStore as Omit<TempFormStore, keyof TempFormStoreActions>,
  tempList: tempListStore as Omit<TempListStore, keyof TempListStoreActions>,
  temp: tempStore as Omit<TempStore, keyof TempStoreActions>,
};

export const actions = {
  modalAlert: modalAlertStore as ModalAlertStoreActions,
  modalConfirm: modalConfirmStore as ModalConfirmStoreActions,
  modalSpinner: modalSpinnerStore as ModalSpinnerStoreActions,
  request: requestStore as RequestStoreActions,
  tempForm: tempFormStore as TempFormStoreActions,
  tempList: tempListStore as TempListStoreActions,
  temp: tempStore as TempStoreActions,
};
