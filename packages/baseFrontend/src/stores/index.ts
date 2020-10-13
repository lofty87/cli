import { configure } from 'mobx';

import { globalActions, globalStore } from './global/index';
import {
  TempFormStore,
  TempFormStoreActions,
  TempListStore,
  TempListStoreActions,
  TempStore,
  TempStoreActions,
} from './temp';

/**
 * * 1. store 와 action 을 구분하여 사용할 수 있도록 구성
 * * 2. component 안에서 useStores() 를 통해 observable state 를 참조
 */

configure({
  useProxies: 'ifavailable',
  enforceActions: 'always',
});

const tempFormStore = new TempFormStore();
const tempListStore = new TempListStore();
const tempStore = new TempStore();

export { useStores } from './StoreProvider';

export const stores = {
  global: globalStore,
  tempForm: tempFormStore as Omit<TempFormStore, keyof TempFormStoreActions>,
  tempList: tempListStore as Omit<TempListStore, keyof TempListStoreActions>,
  temp: tempStore as Omit<TempStore, keyof TempStoreActions>,
};

export const actions = {
  global: globalActions,
  tempForm: tempFormStore as TempFormStoreActions,
  tempList: tempListStore as TempListStoreActions,
  temp: tempStore as TempStoreActions,
};
