import { Document } from 'mongoose';
import { action, computed, flow, makeObservable, observable, toJS } from 'mobx';
import { omit } from 'lodash';
import { advancedDefaultsDeep, compactObject, isNotEmpty } from '@lofty87/util';
import { Api } from '@classes/index';
import { ModelPartial } from '@lofty87/types';

type PrivateMembers = '_storeName' | '_api' | '_data' | '_filled' | '_saved';

export default class DomainObject<Model extends Document> {
  private _storeName: string;
  private _api: Api<Model>;
  private _data: Model;
  private _filled: boolean;
  private _saved: boolean;

  constructor(storeName: string, api: Api<Model>, source: ModelPartial<Model>, saved = false) {
    makeObservable<this, PrivateMembers>(this, {
      _storeName: false,
      _api: false,
      _data: observable,
      _filled: false,
      _saved: false,
      data: computed,
      setData: action,
      toJS: computed,
      saved: false,
      fill: flow,
      save: flow,
      update: flow,
      delete: flow,
    });

    this._storeName = storeName;
    this._api = api;
    this._data = source as Model;
    this._filled = false;
    this._saved = saved;
  }

  public get data() {
    return this._data;
  }

  public setData = (source: ModelPartial<Model>) => {
    this._data = source as Model;
  };

  public get toJS() {
    return toJS(this._data);
  }

  public get saved() {
    return this._saved;
  }

  public* fill() {
    if(this._saved && !this._filled) {
      const id: number = this._data._id;
      const data: null | Model = yield this._api.fetchOneById(id);

      if(data) {
        this._data = data;
        this._filled = true;
      } else {
        this._saved = false;

        console.warn(
          `fail to fill. not existed domain object in ${this._storeName} store. (id: ${id})`
        );
      }
    }
  }

  public* save() {
    if(!this._saved) {
      const source = compactObject(this.toJS, isNotEmpty);
      const data: Model = yield this._api.add(source);

      this._data = data;
      this._filled = true;
      this._saved = true;

      return this;
    }

    console.warn(
      `already domain object is saved in ${this._storeName} store. (id: ${this._data._id})`
    );

    return this;
  }

  public* update(source: ModelPartial<Model>) {
    if(this._saved) {
      source = omit(source, '_id');
      source = compactObject(source, isNotEmpty);

      yield this._api.updateById(this._data._id, source);

      this._data = advancedDefaultsDeep(this.toJS, source);
    } else {
      console.warn(`not saved domain object in ${this._storeName} store.`);
    }
  }

  public* delete() {
    if(this._saved) {
      yield this._api.removeById(this._data._id);

      this._data = {} as Model;
    } else {
      console.warn(`not saved domain object in ${this._storeName} store.`);
    }
  }
}
