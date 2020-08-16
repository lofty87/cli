import {
  connection,
  Document,
  FilterQuery,
  ModelOptions,
  ModelUpdateOptions,
  model as mongooseModel,
  Model as MongooseModel,
  QueryFindOptions,
  QueryPopulateOptions,
  SaveOptions,
  Schema,
} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { defaultsDeep, isEmpty, omit } from 'lodash';
import { ModelPartial } from '@lofty87/types/model';
import { convertToDot, convertToProjection, selectExtractingProjection } from '@lib/mongoose';

/**
 * @class Model
 * * 1. 기본 CRUD 를 갖춘 mongoose model
 * * 2. id 에 auto_increment 가 적용된 model (no hash)
 * * 3. collection name 을 직접 지정
 * * 4. clientProjection 과 extractDocOrDocs 를 통해,
 * *    master, manager 와 client 를 구분하여 결과값을 리턴
 */
export default class Model<M extends Document> {
  private _collectionName: string;
  private _clientProjection: (keyof M)[];
  private _populateOptions?: QueryPopulateOptions | QueryPopulateOptions[];
  public _extractDocOrDocs: ReturnType<typeof selectExtractingProjection>;
  private _Model: MongooseModel<M>;

  constructor(schema: Schema, collectionName: string, clientProjection: (keyof M)[], populateOptions?: QueryPopulateOptions | QueryPopulateOptions[]) {
    this._collectionName = collectionName;
    this._clientProjection = clientProjection;
    this._populateOptions = populateOptions;
    this._extractDocOrDocs = selectExtractingProjection<M>(clientProjection);

    autoIncrement.initialize(connection);
    schema.plugin(autoIncrement.plugin, collectionName);

    this._Model = mongooseModel<M>(collectionName, schema, collectionName);
  }

  public get collectionName() {
    return this._collectionName;
  }

  public get clientProjection() {
    return this._clientProjection;
  }

  public get Model() {
    return this._Model;
  }

  public add = async (doc: ModelPartial<M>, options: SaveOptions = {}) => {
    const savedDoc = await new this._Model(doc).save(options);

    return savedDoc;
  };

  public find = (filter?: ModelPartial<M>, projection?: string[], options: QueryFindOptions = {}) => {
    const convertedFilter = convertToDot<M>(filter);
    const convertedProjection = convertToProjection(projection);

    return this._Model.find(convertedFilter, convertedProjection, options).populate(this._populateOptions);
  };

  public findById = async (id: number, filter?: ModelPartial<M>, projection?: string[], options: QueryFindOptions = {}) => {
    filter = defaultsDeep({ _id: id }, filter);

    const convertedFilter = convertToDot<M>(filter);
    const convertedProjection = convertToProjection(projection);

    const docs = await this._Model.find(convertedFilter, convertedProjection, options).populate(this._populateOptions);

    return isEmpty(docs) ? null : docs[0];
  };

  public updateById = async (id: number, doc: ModelPartial<M>, options: ModelUpdateOptions = {}) => {
    const filter = { _id: id } as FilterQuery<M>;
    const convertedDoc = convertToDot<M>(omit(doc, '_id'));

    const { nModified, ok } = await this._Model.updateMany(filter, convertedDoc, options);

    return {
      modified: !!parseInt(nModified, 10),
      ok: !!parseInt(ok, 10),
    };
  };

  public removeById = async (id: number, options: ModelOptions = {}) => {
    const filter = { _id: id } as FilterQuery<M>;

    const { deletedCount, ok } = await this._Model.deleteMany(filter, options);

    return {
      deleted: !!deletedCount,
      ok: !!ok,
    };
  };

  public count = (filter?: ModelPartial<M>) => {
    const convertedFilter = convertToDot<M>(filter);

    return this._Model.countDocuments(convertedFilter);
  };
}
