import { Document } from 'mongoose';
import { action, computed, flowResult, makeObservable, observable, runInAction } from 'mobx';
import { Api } from '@classes/index';
import { ModelPartial } from '@lofty87/types';

import DomainModel from './DomainModel';
import DomainModelList from './DomainModelList';

/**
 * * view comment is optional
 */

const viewCommentMembersExist = (
  viewCommentApi: null | Api<any>,
  viewCommentList: null | DomainModelList<any>
) => {
  if(!viewCommentApi || !viewCommentList) {
    console.warn('required view comment api and list, use setViewCommentMembers()');

    return false;
  }

  return true;
};

type PrivateMembers =
  | '_name'
  | '_stores'
  | '_api'
  | '_view'
  | '_list'
  | '_viewCommentApi'
  | '_viewCommentList'
  | 'stores';

export default class DomainStore<Model extends Document, Stores, Comment extends Document = any> {
  private _name: string;
  private _stores: Stores;
  private _api: Api<Model>;
  private _view: null | DomainModel<Model>;
  private _list: DomainModelList<Model>;
  private _viewCommentApi: null | Api<Comment>;
  private _viewCommentList: null | DomainModelList<Comment>;

  constructor(name: string, stores: Stores, api: Api<Model>, listLimit?: number) {
    this._name = name;
    this._stores = stores;
    this._api = api;
    this._view = null;
    this._list = new DomainModelList<Model>(name, api, listLimit);
    this._viewCommentApi = null;
    this._viewCommentList = null;

    makeObservable<this, PrivateMembers>(this, {
      _name: false,
      _stores: false,
      _api: false,
      _view: observable,
      _list: false,
      _viewCommentApi: false,
      _viewCommentList: observable,
      stores: false,
      view: computed,
      list: false,
      viewCommentList: computed,
      setViewCommentMembers: action,
      initializeView: action,
      initializeList: false,
      initializeViewCommentList: false,
      viewById: action,
      addInList: false,
      getAllInList: false,
      getOneInListById: false,
      updateInListById: false,
      removeInListById: action,
      getCountInList: false,
      putInList: false,
      pullInListById: false,
      addInViewCommentList: false,
      getAllInViewCommentList: false,
      getOneInViewCommentListById: false,
      updateInViewCommentListById: false,
      removeInViewCommentListById: false,
      getCountInViewCommentList: false,
      putInViewCommentList: false,
      pullInViewCommentListById: false,
    });
  }

  protected get stores() {
    return this._stores;
  }

  public get view() {
    return this._view;
  }

  public get list() {
    return this._list;
  }

  public get viewCommentList() {
    viewCommentMembersExist(this._viewCommentApi, this._viewCommentList);

    return this._viewCommentList;
  }

  public setViewCommentMembers = (
    viewCommentApi: Api<Comment>,
    viewCommentList: DomainModelList<Comment>
  ) => {
    this._viewCommentApi = viewCommentApi;
    this._viewCommentList = viewCommentList;

    return this;
  };

  public initializeView = () => {
    this._view = null;
  };

  public initializeList = () => {
    this._list.initialize();
  };

  public initializeViewCommentList = () => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      this._viewCommentList!.initialize();
    }
  };

  public viewById = async (id: number) => {
    const obj = await this.getOneInListById(id);

    runInAction(() => {
      if(obj) {
        this._view = obj;
      }
    });
  };

  public addInList = async (source: ModelPartial<Model>) => {
    const obj = new DomainModel(this._name, this._api, source);
    const savedObj = await flowResult(obj.save());

    this._list.add(savedObj);

    return savedObj;
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

      console.warn(`not existed domain object in ${this._name} store (id: ${id})`);

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

      runInAction(() => {
        const viewed = this._view && this._view.data._id === id;

        if(viewed) {
          this._view = null;
        }

        this._list.removeById(id);
      });
    }
  };

  public getCountInList = async () => {
    await flowResult(this._list.getCount());
  };

  public putInList = (obj: DomainModel<Model>) => {
    this._list.put(obj);
  };

  public pullInListById = (id: number) => {
    return this._list.pullById(id);
  };

  public addInViewCommentList = async (source: ModelPartial<Comment>) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      const comment = new DomainModel(this._name, this._viewCommentApi!, source);
      const savedComment = await flowResult(comment.save());

      this._viewCommentList!.add(savedComment);

      return savedComment;
    }

    return null;
  };

  public getAllInViewCommentList = async () => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      await flowResult(this._viewCommentList!.getAll());
    }
  };

  public getOneInViewCommentListById = async (id: number) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      const comment = this._viewCommentList!.getOneById(id);

      if(!comment) {
        const source = await this._viewCommentApi!.fetchOneById(id);

        if(source) {
          return new DomainModel(this._name, this._viewCommentApi!, source, true);
        }

        console.warn(`not existed comment in ${this._name} store (id: ${id})`);

        return null;
      }

      return comment;
    }

    return null;
  };

  public updateInViewCommentListById = async (id: number, source: ModelPartial<Comment>) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      const comment = await this.getOneInViewCommentListById(id);

      if(comment) {
        await flowResult(comment.update(source));
      }
    }
  };

  public removeInViewCommentListById = async (id: number) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      const comment = await this.getOneInViewCommentListById(id);

      if(comment) {
        await flowResult(comment.delete());

        this._viewCommentList!.removeById(id);
      }
    }
  };

  public getCountInViewCommentList = async () => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      await flowResult(this._viewCommentList!.getCount());
    }
  };

  public putInViewCommentList = (comment: DomainModel<Comment>) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      this._viewCommentList!.put(comment);
    }
  };

  public pullInViewCommentListById = (id: number) => {
    if(viewCommentMembersExist(this._viewCommentApi, this._viewCommentList)) {
      return this._viewCommentList!.pullById(id);
    }

    return null;
  };
}
