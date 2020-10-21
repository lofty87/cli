import path from 'path';
import url from 'url';

import { Document } from 'mongoose';
import { defaults } from 'lodash';
import { ModelPartial, Object } from '@lofty87/types';
import stores, { ApiType } from '@stores/index';
import axios from '@lib/axios';

import { QP } from '$types/index';

/**
 * * 지원하는 기본 REST API 명세
 * * 리소스 생성        - POST    |  /{resource}
 * * 리소스 리스트 조회 - GET     |  /{resource}
 * * 리소스 조회        - GET     |  /{resource}/{id}
 * * 리소스 수정        - PATCH   |  /{resource}/{id}
 * * 리소스 삭제        - DELETE  |  /{resource}/{id}
 * * 리소스 전체 수     - GET     |  /{resource}/count
 */

/**
 * @class Api
 * * request(global store) state 를 통해
 * * 각 api 들의 request 상태를 독립적으로 관리
 *
 * ! api 를 추가할 때 마다 ApiType 을 직접 추가!!
 * ! name 값을 통해 아래와 같은 기본 ApiType 을 사용!!
 * ? {name}/add
 * ? {name}/fetchAll
 * ? {name}/fetchOneById
 * ? {name}/updateById
 * ? {name}/removeById
 * ? {name}/fetchCount
 *
 * * fetch api 에서 sub pathname 이나 query param 이 필요할 경우 options 를 통해 추가
 * ! sub pathname 과 상관없이 기본 ApiType 을 사용하기로 결정!!
 */

type Options = {
  subPathnames: string[]; // from right to left
  queryParams: QP | Object;
};

const defaultOptions: Options = {
  subPathnames: [],
  queryParams: {},
};

export default class Api<Model extends Document> {
  private _pathname: string;

  private _apiTypeAdd: ApiType;
  private _apiTypeFetchAll: ApiType;
  private _apiTypeFetchOneById: ApiType;
  private _apiTypeUpdateById: ApiType;
  private _apiTypeRemoveById: ApiType;
  private _apiTypeFetchCount: ApiType;

  constructor(name: string, pathname: string) {
    if(!pathname.startsWith('/')) {
      throw Error(`${name} pathname must start with '/'`);
    }

    this._pathname = pathname;

    this._apiTypeAdd = `${name}/add` as ApiType;
    this._apiTypeFetchAll = `${name}/fetchAll` as ApiType;
    this._apiTypeFetchOneById = `${name}/fetchOneById` as ApiType;
    this._apiTypeUpdateById = `${name}/updateById` as ApiType;
    this._apiTypeRemoveById = `${name}/removeById` as ApiType;
    this._apiTypeFetchCount = `${name}/fetchCount` as ApiType;
  }

  public add = async (source: ModelPartial<Model>) => {
    try {
      stores.global.request.pendingOn(this._apiTypeAdd);

      const data = await axios.api.post<any, Model>(this._pathname, source);

      stores.global.request.doneOn(this._apiTypeAdd);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeAdd);

      throw error;
    }
  };

  public fetchAll = async (customOptions: Partial<Options> = {}) => {
    const { subPathnames, queryParams } = defaults(customOptions, defaultOptions);

    try {
      stores.global.request.pendingOn(this._apiTypeFetchAll);

      const data = await axios.api.get<any, Model[]>(
        url.format({
          pathname: path.join(this._pathname, ...subPathnames),
          query: queryParams,
        })
      );

      stores.global.request.doneOn(this._apiTypeFetchAll);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeFetchAll);

      throw error;
    }
  };

  public fetchOneById = async (id: number) => {
    try {
      stores.global.request.pendingOn(this._apiTypeFetchOneById);

      const data = await axios.api.get<any, null | Model>(`${this._pathname}/${id}`);

      stores.global.request.doneOn(this._apiTypeFetchOneById);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeFetchOneById);

      throw error;
    }
  };

  public updateById = async (id: number, source: ModelPartial<Model>) => {
    try {
      stores.global.request.pendingOn(this._apiTypeUpdateById);

      const data = await axios.api.patch<any, string>(`${this._pathname}/${id}`, source);

      stores.global.request.doneOn(this._apiTypeUpdateById);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeUpdateById);

      throw error;
    }
  };

  public removeById = async (id: number) => {
    try {
      stores.global.request.pendingOn(this._apiTypeRemoveById);

      const data = await axios.api.delete<any, string>(`${this._pathname}/${id}`);

      stores.global.request.doneOn(this._apiTypeRemoveById);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeRemoveById);

      throw error;
    }
  };

  public fetchCount = async (customOptions: Partial<Options> = {}) => {
    const { subPathnames, queryParams } = defaults(customOptions, defaultOptions);

    try {
      stores.global.request.pendingOn(this._apiTypeFetchCount);

      const data = await axios.api.get<any, number>(
        url.format({
          pathname: path.join(this._pathname, ...subPathnames, 'count'),
          query: queryParams,
        })
      );

      stores.global.request.doneOn(this._apiTypeFetchCount);

      return data;
    } catch(error) {
      stores.global.request.doneOn(this._apiTypeFetchCount);

      throw error;
    }
  };
}
