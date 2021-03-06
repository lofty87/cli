import { Document } from 'mongoose';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import { isEmpty } from 'lodash';
import { Api } from '@classes/index';

import DomainModel from './DomainModel';

type PrivateMembers =
  | '_storeName'
  | '_api'
  | '_data'
  | '_count'
  | '_completed'
  | '_skip'
  | '_limit'
  | '_search';

export default class DomainModelList<Model extends Document> {
  private _storeName: string;
  private _api: Api<Model>;
  private _data: DomainModel<Model>[];
  private _count: number;
  private _completed: boolean;
  private _skip: number;
  private _limit: number;
  private _search: string;

  constructor(storeName: string, api: Api<Model>, limit = 10) {
    this._storeName = storeName;
    this._api = api;
    this._data = [];
    this._count = 0;
    this._completed = false;
    this._skip = 0;
    this._limit = limit;
    this._search = '';

    makeObservable<this, PrivateMembers>(this, {
      _storeName: false,
      _api: false,
      _data: observable,
      _count: observable,
      _completed: observable,
      _skip: false,
      _limit: false,
      _search: observable,
      data: computed,
      count: computed,
      completed: computed,
      search: computed,
      setSearch: action,
      initialize: action,
      findIndexById: false,
      add: action,
      getAll: flow,
      getOneById: false,
      removeById: action,
      getCount: flow,
      put: action,
      pullById: action,
    });
  }

  public get data() {
    return this._data;
  }

  public get count() {
    return this._count;
  }

  public get completed() {
    return this._completed;
  }

  public get search() {
    return this._search;
  }

  public setSearch = (search: string) => {
    this._search = search;
  };

  public initialize = () => {
    this._data = [];
    this._count = 0;
    this._completed = false;
    this._skip = 0;
    this._search = '';
  };

  public findIndexById = (id: number) => {
    return this._data.findIndex((obj) => obj.data._id === id);
  };

  public add = (obj: DomainModel<Model>) => {
    if(obj.saved) {
      const objIndex = this.findIndexById(obj.data._id);
      const contains = objIndex !== -1;

      if(!contains) {
        this._data.unshift(obj);
        this._count++;
        this._skip++;
      }
    } else {
      console.warn(`not saved domain object in ${this._storeName} store`);
    }
  };

  public* getAll() {
    if(!this._completed) {
      const skip = this._skip;
      const limit = this._limit;
      const search = this._search;

      const sources: Model[] = yield this._api.fetchAll({
        queryParams: {
          skip,
          limit,
          search,
        },
      });

      if(isEmpty(sources)) {
        this._completed = true;
      } else {
        const data = sources.map((source) => {
          return new DomainModel(this._storeName, this._api, source, true);
        });

        this._data = this._data.slice().concat(data);
        this._skip += limit;
      }
    }
  }

  public getOneById = (id: number) => {
    return this._data.find((obj) => obj.data._id === id);
  };

  // ? use self-update in DomainModel
  // public updateById = () => {
  //   update
  // }

  public removeById = (id: number) => {
    const index = this.findIndexById(id);
    const contains = index !== -1;

    if(contains) {
      this._data.splice(index, 1);
      this._count--;
      this._skip--;
    }
  };

  public* getCount() {
    this._count = yield this._api.fetchCount({
      queryParams: {
        search: this._search,
      },
    });
  }

  // ? focused method on client side (put, pullById)
  public put = (obj: DomainModel<Model>) => {
    if(obj.saved) {
      const id = obj.data._id;
      const index = this.findIndexById(id);
      const contains = index !== -1;

      if(!contains) {
        const nextIndex = this._data.findIndex((obj) => obj.data._id < id);
        const isLast = nextIndex === -1;

        if(isLast) {
          this._data.push(obj);
        } else {
          this._data.splice(nextIndex, 0, obj);
        }
      }
    } else {
      console.warn(`not saved domain object in ${this._storeName} store`);
    }
  };

  public pullById = (id: number) => {
    const index = this.findIndexById(id);
    const contains = index !== -1;

    if(contains) {
      return this._data.splice(index, 1)[0];
    }

    return null;
  };
}
