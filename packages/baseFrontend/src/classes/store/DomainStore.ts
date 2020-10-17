import { Document } from 'mongoose';
import { flowResult } from 'mobx';
import { Api } from '@classes/index';
import { ModelPartial } from '@lofty87/types';

import DomainList from './DomainList';
import DomainObject from './DomainObject';

export default class DomainStore<Model extends Document, RootStore> {
  private _name: string;
  private _store: RootStore;
  private _api: Api<Model>;
  private _list: DomainList<Model>;

  constructor(name: string, store: RootStore, api: Api<Model>, listLimit?: number) {
    this._name = name;
    this._store = store;
    this._api = api;
    this._list = new DomainList<Model>(name, api, listLimit);
  }

  public get list() {
    return this._list;
  }

  public addInList = async (source: ModelPartial<Model>) => {
    const obj = new DomainObject(this._name, this._api, source);
    const savedObj = await flowResult(obj.save());

    this._list.add(savedObj);

    return savedObj;
  };

  public putInList = (obj: DomainObject<Model>) => {
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
        return new DomainObject(this._name, this._api, source, true);
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

      this._list.removeById(id);
    }
  };
}
