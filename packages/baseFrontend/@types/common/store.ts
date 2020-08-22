import { Document } from 'mongoose';
import { ModelPartial } from '@lofty87/types';

/**
 * * abstract 선언, extends 상속을 통해 Store 를 구성해 보려 했으나,
 * * 작동은 하지만 권고하지 않는 듯 하여 일일히 작성하기로 결정했다.
 * ? https://stackoverflow.com/questions/48695175/is-it-possible-to-create-inheritance-between-two-mobx-stores
 */

/**
 * @name ModelStore
 * * Model 상세페이지에 사용되는 Store.
 * * ModelStore 작성 시 implement 하여 작성.
 */
export interface ModelStore<Model extends Document, Doc = null | Model> {
  // ! private _state: Doc;
  readonly state: Doc;
  setState: (state: Doc) => void;

  initialize: () => void;
}

/**
 * @name ModelFormStore
 * * Model Form 에 사용되는 Store.
 * * ModelFormStore 작성 시 implement 하여 작성.
 *
 * ? Form 에 필요한 key 들로만 picked 된 state.
 */
export interface ModelFormStore<Model extends Document, Key extends keyof Model, Doc = Pick<Model, Key>> {
  // ! private _state: Doc;
  readonly state: Doc;
  setState: (state: Doc) => void;

  initialize: () => void;
  changeValue: (name: string, value: string) => void;
}

/**
 * @name ModelListStore
 * * Model List, Model List Form 에 사용되는 Store.
 * * ModelListStore 작성 시 implement 하여 작성.
 */
export interface ModelListStore<Model extends Document, Doc = Model, Docs = Doc[]> {
  // ! private _state: Doc;
  // ! private _skip: number;
  // ! private _isLastData: boolean;
  // ! private _search: string;
  // ? private _count: number;
  readonly state: Docs;
  setState: (state: Docs) => void;
  readonly isLastData: boolean;
  setLastData: () => void;
  readonly search: string;
  setSearch: (search: string) => void;
  readonly count?: number;

  // ? based
  initialize: () => void;
  fetchDocs?: (search: string) => Promise<Docs>;
  skipFetchDocs?: (search: string) => Promise<Docs>;

  // ? Model List Form
  add?: (doc: Doc) => void;
  prepend?: (id: number, doc: Doc) => void;
  getDocById?: (id: number) => Doc;
  updateById?: (id: number, doc: ModelPartial<Doc>) => void;
  removeById?: (id: number) => void;
}
