import { ModelPartial, Object } from '@lofty87/types';
import { Document } from 'mongoose';
import {
  compact,
  forEach,
  isArray,
  isEmpty,
  isFunction,
  isMap,
  isPlainObject,
  map,
  pick,
  transform,
  uniq,
} from 'lodash';

/**
 * @name convertToDot
 * @param { key: { subKey: 'value' } }
 * @returns { 'key.subKey': 'value' }
 * * model 의 sub doc 접근에 dot(.) 을 사용하지 않고
 * * model 타입 그대로 사용하기 위해 작성
 *
 * ! operator($) 사용 시 dot(.) 접근을 끊고
 * ! operator 아래에서 다시 dot(.) 접근을 시작
 * @param { key1: { key2: { $operator: { key3: { key4: 'value' } }, key5: 'value' } } }
 * @returns { 'key1.key2': { '$operator': { 'key3.key4': 'value } }, 'key1.key2.key5': 'value' }
 */
const convertToDotRecursive = (result: Object, path: string, condition: Object) => {
  forEach(condition, (value, key) => {
    if(isMap(value) || isFunction(value)) {
      throw new Error('not supported value type');
    }

    const isOperator = path.startsWith('$') || key.startsWith('$');

    if(isOperator) {
      if(isPlainObject(value)) {
        result[path] = result[path] || {};

        convertToDotRecursive(result[path], key, value);
      } else {
        result[path] = {
          ...result[path],
          [key]: value,
        };
      }
    } else {
      const subPath = `${path}.${key}`;

      if(isPlainObject(value)) {
        convertToDotRecursive(result, subPath, value);
      } else {
        result[subPath] = value;
      }
    }
  });
};

export const convertToDot = <Model extends Document>(condition?: ModelPartial<Model>) => {
  if(condition) {
    if(!isPlainObject(condition)) {
      throw Error(`not supported ${typeof condition} type. (only plain object type)`);
    }

    return transform<any, Object>(
      condition,
      (result, value, key) => {
        if(isPlainObject(value)) {
          convertToDotRecursive(result, key, value);
        } else {
          result[key] = value;
        }

        return result;
      },
      {}
    );
  }

  return undefined as any;
};

/**
 * @name convertToDotArray
 * @param { key: { subKey1: 'value', subKey2: 'value' } }
 * @returns [{ 'key.subKey1': 'value' }, { 'key.subKey2': 'value' }]
 * * model 의 sub doc 접근에 dot(.) 을 사용하지 않고
 * * model 타입 그대로 사용하기 위해 작성
 *
 * ? convertToDot 과 다른 점은
 * ? convertToDot 은 undefined 또는 object 타입으로 각 값들을 리턴하고
 * ? convertToDotArray 는 Array 타입으로 각 값들을 리턴한다.
 */
export const convertToDotArray = <Model extends Document>(condition?: ModelPartial<Model>) => {
  if(condition) {
    return map(convertToDot(condition), (value, key) => ({
      [key]: value,
    }));
  }

  return [];
};

/**
 * @name convertToProjection
 * @param [ 'key1', 'key2' ]
 * @returns 'key1 key2'
 * * projection 구분을 empty space 로 하지 않고
 * * 가독성있는 배열로 하기 위해 작성
 */
export const convertToProjection = (projection?: string[]) => {
  if(projection) {
    return uniq(compact(projection))
      .join(' ');
  }

  return projection;
};

/**
 * @name selectExtractingProjection
 * @param projection
 * @return (null | document | documents) => null | document | documents
 * ! 보안 상 query 결과값(doc, docs)을
 * ! master, manager 와 client 에 따라
 * ! 다르게 리턴해 줄 필요가 있어 작성
 *
 * * Model 객체 생성 시
 * * extractDocOrDocs 메서드 추가에 사용된다.
 *
 * ? any 타입 사용을 지양하지만
 * ? input 과 output 타입을 일치시키기 위해
 * ? 어쩔 수 없이 많이 사용하게 되었다.
 */
export const selectExtractingProjection = <Model extends Document>(keys: (keyof Model)[]) => <D>(
  docOrDocs: D
) => {
  let isDocs = false;
  let docs = docOrDocs;

  if(isArray(docs)) {
    isDocs = true;
  } else {
    docs = compact([ docs ]) as any;
  }

  docs = map(docs as any, (doc) => pick(doc, keys)) as any;

  if(isDocs) {
    return docs;
  }

  return isEmpty(docs) ? null : ((docs as any)[0] as D);
};
