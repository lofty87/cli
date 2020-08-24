import { action, computed, observable, runInAction, toJS } from 'mobx';
import { defaultsDeep } from 'lodash';
import { ModelPartial } from '@lofty87/types';
import api from '@api/index';

import { TempType } from './type';

import { ModelListStore } from '$types/index';

type State = TempType[];

const initialState: State = [];

export class TempListStore implements ModelListStore<TempType> {
  @observable
  private _state = initialState;

  private _skip = 0;

  @observable
  private _isLastData = false;

  @observable
  private _search = '';

  @observable
  private _count = 0;

  @computed
  public get state() {
    return this._state;
  }

  @action
  public setState = (state: State) => {
    this._state = state;
  };

  @computed
  public get isLastData() {
    return this._isLastData;
  }

  @action
  public setLastData = () => {
    this._isLastData = true;
  };

  @computed
  public get search() {
    return this._search;
  }

  @action
  public setSearch = (search: string) => {
    this._search = search;
  };

  @computed
  public get count() {
    return this._count;
  }

  @action
  public initialize = () => {
    this._state = initialState;
    this._skip = 0;
    this._isLastData = false;
    this._search = '';
    this._count = 0;
  };

  @action
  public fetchDocs = async (search: string) => {
    this._state = initialState;
    this._skip = 0;
    this._isLastData = false;
    this._count = 0;

    const count = await api.temp.fetchCount({
      queryParams: {
        search,
      },
    });

    runInAction(() => {
      this._count = count;
    });

    const temps = await api.temp.fetchDocs({
      queryParams: {
        skip: this._skip,
        search,
      },
    });

    return temps;
  };

  public skipFetchDocs = async (search: string) => {
    this._skip += 10;

    const temps = await api.temp.fetchDocs({
      queryParams: {
        skip: this._skip,
        search,
      },
    });

    return temps;
  };

  @action
  public add = (temp: TempType) => {
    this._skip++;
    this._count++;
    this._state.unshift(temp);
  };

  @action
  public prepend = (id: number, temp: TempType) => {
    this._skip++;
    this._count++;

    const nextIndex = this._state.findIndex(({ _id }) => id > _id);

    if(nextIndex === -1) {
      this._state.push(temp);
    } else {
      this._state.splice(nextIndex, 0, temp);
    }
  };

  public getDocById = (id: number) => {
    const temp = this._state.find(({ _id }) => id === _id);

    if(!temp) {
      console.warn(`not found temp(${id})`);

      return null;
    }

    return temp;
  };

  @action
  public updateById = (id: number, temp: ModelPartial<TempType>) => {
    const index = this._state.findIndex(({ _id }) => id === _id);

    if(index !== -1) {
      const originalTemp = toJS(this._state[index]);

      this._state[index] = defaultsDeep({}, temp, originalTemp);
    }
  };

  @action
  public removeById = (id: number) => {
    this._skip--;
    this._count--;

    const index = this._state.findIndex(({ _id }) => id === _id);

    if(index !== -1) {
      this._state.splice(index, 1);
    }
  };
}

export type TempListStoreActions = Omit<TempListStore, 'state' | 'isLastData' | 'search' | 'count'>;
