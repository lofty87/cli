import { useContext } from 'react';
import { configure } from 'mobx';
import { MobXProviderContext } from 'mobx-react';

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
  TempStoreActions
} from './temp';

/**
 * * 명시적 타입 정의를 통해,
 * * state 들은 stores 로 분류하고
 * * action 들은 actions 로 분류했다.
 *
 * ? 1. state 변경은 action 을 통해서만 할 수 있도록 설정했다.
 * ? 2. useStores() hook 을 통해 observing state 를 사용하면 된다.
 *
 * TODO: 심플하게 정리할 수 있는 방법 찾기
 */

configure({
  enforceActions: 'always',
});

const modalAlertStore = new ModalAlertStore();
const modalConfirmStore = new ModalConfirmStore();
const modalSpinnerStore = new ModalSpinnerStore();
const requestStore = new RequestStore();
const tempFormStore = new TempFormStore();
const tempListStore = new TempListStore();
const tempStore = new TempStore();

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

// ! stores hook (required wrapping observer for using component)
export const useStores = () => useContext(MobXProviderContext) as typeof stores;
