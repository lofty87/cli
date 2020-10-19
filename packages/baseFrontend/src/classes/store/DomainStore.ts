import { Document } from 'mongoose';
import { action, computed, flowResult, makeObservable, observable, runInAction } from 'mobx';
import { Api } from '@classes/index';
import { ModelPartial } from '@lofty87/types';

import DomainModel from './DomainModel';
import DomainModelList from './DomainModelList';

type PrivateMembers = '_name' | '_stores' | '_api' | '_view' | '_list';

export default class DomainStore<Model extends Document, RootStore> {
  private _name: string;
  private _stores: RootStore;
  private _api: Api<Model>;
  private _view: null | DomainModel<Model>;
  private _list: DomainModelList<Model>;

  constructor(name: string, stores: RootStore, api: Api<Model>, listLimit?: number) {
    this._name = name;
    this._stores = stores;
    this._api = api;
    this._view = null;
    this._list = new DomainModelList<Model>(name, api, listLimit);

    makeObservable<this, PrivateMembers>(this, {
      _name: false,
      _stores: false,
      _api: false,
      _view: observable,
      _list: false,
      view: computed,
      list: false,
      initializeView: action,
      initializeList: false,
      viewById: action,
      addInList: false,
      putInList: false,
      getAllInList: false,
      getOneInListById: false,
      updateInListById: false,
      removeInListById: action,
    });
  }

  public get view() {
    return this._view;
  }

  public get list() {
    return this._list;
  }

  public initializeView = () => {
    this._view = null;
  };

  public initializeList = () => {
    this._list.initialize();
  };

  public viewById = async (id: number) => {
    const obj = await this.getOneInListById(id);

    if(obj) {
      runInAction(() => {
        this._view = obj;
      });
    }
  };

  public addInList = async (source: ModelPartial<Model>) => {
    const obj = new DomainModel(this._name, this._api, source);
    const savedObj = await flowResult(obj.save());

    this._list.add(savedObj);

    return savedObj;
  };

  public putInList = (obj: DomainModel<Model>) => {
    this._list.put(obj);
  };

  public getAllInList = async () => {
    await flowResult(this._list.getAll());
  };

  public getOneInListById = async (id: number) => {
    const obj = this._list.getOneById(id);

    if(!obj) {
      const source = await this._api.fetchOneById(id);

      if(source) {
        return new DomainModel(this._name, this._api, source, true);
      }

      console.warn(`not existed domain object in ${this._name} store. (id: ${id})`);

      return null;
    }

    return obj;
  };

  public updateInListById = async (id: number, source: ModelPartial<Model>) => {
    const obj = await this.getOneInListById(id);

    if(obj) {
      await flowResult(obj.update(source));
    }
  };

  public removeInListById = async (id: number) => {
    const obj = await this.getOneInListById(id);

    if(obj) {
      await flowResult(obj.delete());

      if(this._view && this._view.data._id === id) {
        runInAction(() => {
          this._view = null;
        });
      }

      this._list.removeById(id);
    }
  };
}
