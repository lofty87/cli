import path from 'path';
import url from 'url';

import { Document } from 'mongoose';
import { defaults } from 'lodash';
import { actions } from '@stores/index';
import { ApiTypes } from '@stores/global/request/ApiTypes';
import { ModelPartial, Object } from '@lofty87/types';
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
 * * Request Store 를 통해
 * * 각 api 들의 request state 를 독립적으로 관리
 *
 * * name 을 통해 request state 의 기본 api type 이 정의된다.
 * ! api 를 추가할 때 마다,
 * ! Request Store 에도 api type 을 직접 추가해 주어야 한다.
 * ? {name}/add
 * ? {name}/fetchDocs
 * ? {name}/fetchDocById
 * ? {name}/updateById
 * ? {name}/removeById
 * ? {name}/fetchCount
 *
 * * fetch api 들 중에
 * * sub pathname 이나 query param 이 필요할 경우
 * * options 를 통해 추가할 수 있다.
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

  private _apiTypeAdd: ApiTypes;
  private _apiTypeFetchDocs: ApiTypes;
  private _apiTypeFetchDocById: ApiTypes;
  private _apiTypeUpdateById: ApiTypes;
  private _apiTypeRemoveById: ApiTypes;
  private _apiTypeFetchCount: ApiTypes;

  constructor(name: string, pathname: string) {
    if(!pathname.startsWith('/')) {
      throw Error(`${name} pathname must start with '/'`);
    }

    this._pathname = pathname;

    this._apiTypeAdd = `${name}/add` as ApiTypes;
    this._apiTypeFetchDocs = `${name}/fetchDocs` as ApiTypes;
    this._apiTypeFetchDocById = `${name}/fetchDocById` as ApiTypes;
    this._apiTypeUpdateById = `${name}/updateById` as ApiTypes;
    this._apiTypeRemoveById = `${name}/removeById` as ApiTypes;
    this._apiTypeFetchCount = `${name}/fetchCount` as ApiTypes;
  }

  public add = async (doc: ModelPartial<Model>) => {
    try {
      actions.request.setPending(this._apiTypeAdd);

      const addedDoc = await axios.api.post<any, Model>(this._pathname, doc);

      actions.request.setDone(this._apiTypeAdd);

      return addedDoc;
    } catch(error) {
      actions.request.setDone(this._apiTypeAdd);

      throw error;
    }
  };

  public fetchDocs = async (customOptions: Partial<Options> = {}) => {
    const { subPathnames, queryParams } = defaults(customOptions, defaultOptions);

    try {
      actions.request.setPending(this._apiTypeFetchDocs);

      const docs = await axios.api.get<any, Model[]>(
        url.format({
          pathname: path.join(this._pathname, ...subPathnames),
          query: queryParams,
        })
      );

      actions.request.setDone(this._apiTypeFetchDocs);

      return docs;
    } catch(error) {
      actions.request.setDone(this._apiTypeFetchDocs);

      throw error;
    }
  };

  public fetchDocById = async (id: number) => {
    try {
      actions.request.setPending(this._apiTypeFetchDocById);

      const doc = await axios.api.get<any, null | Model>(`${this._pathname}/${id}`);

      actions.request.setDone(this._apiTypeFetchDocById);

      return doc;
    } catch(error) {
      actions.request.setDone(this._apiTypeFetchDocById);

      throw error;
    }
  };

  public updateById = async (id: number, doc: ModelPartial<Model>) => {
    try {
      actions.request.setPending(this._apiTypeUpdateById);

      const result = await axios.api.patch<any, string>(`${this._pathname}/${id}`, doc);

      actions.request.setDone(this._apiTypeUpdateById);

      return result;
    } catch(error) {
      actions.request.setDone(this._apiTypeUpdateById);

      throw error;
    }
  };

  public removeById = async (id: number) => {
    try {
      actions.request.setPending(this._apiTypeRemoveById);

      const result = await axios.api.delete<any, string>(`${this._pathname}/${id}`);

      actions.request.setDone(this._apiTypeRemoveById);

      return result;
    } catch(error) {
      actions.request.setDone(this._apiTypeRemoveById);

      throw error;
    }
  };

  public fetchCount = async (customOptions: Partial<Options> = {}) => {
    const { subPathnames, queryParams } = defaults(customOptions, defaultOptions);

    try {
      actions.request.setPending(this._apiTypeFetchCount);

      const count = await axios.api.get<any, number>(
        url.format({
          pathname: path.join(this._pathname, ...subPathnames, 'count'),
          query: queryParams,
        })
      );

      actions.request.setDone(this._apiTypeFetchCount);

      return count;
    } catch(error) {
      actions.request.setDone(this._apiTypeFetchCount);

      throw error;
    }
  };
}
