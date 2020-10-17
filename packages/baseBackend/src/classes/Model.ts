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
import { ModelPartial } from '@lofty87/types';
import { compactObject, isNotEmpty } from '@lofty87/util';
import { convertToDot, convertToProjection, selectExtractingProjection } from '@lib/mongoose';

/**
 * @class Model
 * * 1. 기본 CRUD 를 갖춘 mongoose model
 * * 2. id 에 auto_increment 가 적용된 model (not use hash id)
 * * 3. collection name 을 직접 지정
 * * 4. clientProjection 과 extractData 를 통해,
 * *    admin, manager 와 client 를 구분하여 결과값을 리턴
 */
export default class Model<M extends Document> {
  private _collectionName: string;
  private _clientProjection: (keyof M)[];
  private _populateOptions?: QueryPopulateOptions | QueryPopulateOptions[];
  public extractData: ReturnType<typeof selectExtractingProjection>;
  private _Model: MongooseModel<M>;

  constructor(
    schema: Schema,
    collectionName: string,
    clientProjection: (keyof M)[],
    populateOptions?: QueryPopulateOptions | QueryPopulateOptions[]
  ) {
    this._collectionName = collectionName;
    this._clientProjection = clientProjection;
    this._populateOptions = populateOptions;
    this.extractData = selectExtractingProjection<M>(clientProjection);

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

  public add = async (source: ModelPartial<M>, options: SaveOptions = {}) => {
    source = compactObject(source, isNotEmpty);

    const data = await new this._Model(source)
      .save(options);

    return data;
  };

  public findAll = (
    filter?: ModelPartial<M>,
    projection?: string[],
    options: QueryFindOptions = {}
  ) => {
    const convertedFilter = convertToDot<M>(filter);
    const convertedProjection = convertToProjection(projection);

    return this._Model
      .find(convertedFilter, convertedProjection, options)
      .populate(this._populateOptions);
  };

  public findOneById = async (
    id: number,
    filter?: ModelPartial<M>,
    projection?: string[],
    options: QueryFindOptions = {}
  ) => {
    filter = defaultsDeep({ _id: id }, filter);

    const convertedFilter = convertToDot<M>(filter);
    const convertedProjection = convertToProjection(projection);

    const data = await this._Model
      .find(convertedFilter, convertedProjection, options)
      .populate(this._populateOptions);

    return isEmpty(data) ? null : data[0];
  };

  public updateById = async (
    id: number,
    source: ModelPartial<M>,
    options: ModelUpdateOptions = {}
  ) => {
    source = omit(source, '_id');
    source = compactObject(source, isNotEmpty);

    const filter = { _id: id } as FilterQuery<M>;
    const convertedSource = convertToDot<M>(source);

    const { nModified, ok } = await this._Model.updateMany(filter, convertedSource, options);

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

  public getCount = (filter?: ModelPartial<M>) => {
    const convertedFilter = convertToDot<M>(filter);

    return this._Model.countDocuments(convertedFilter);
  };
}
