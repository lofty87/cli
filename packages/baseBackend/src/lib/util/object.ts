import { Object } from '@lofty87/types';
import { Document } from 'mongoose';
import { isEmpty, isNull, isPlainObject, isUndefined, reduce } from 'lodash';

import { refCount } from './number';

/**
 * @name compactObject
 * * mongoose doc 을 compact 하기 위해 작성
 * * default filter 는 value 가 undefined 또는 null 이 아닐 때
 *
 * ! notFilteringCount 를 통해,
 * ! 한번 더 compact 하는 이유는
 * ! depth 걱정없이 완벽하게 compact 하기 위해
 * ? e.g. { sign: { email: { certification: null, at: null } } }
 */
const compactObjectRecursive = <T extends object | Document>(obj: T, filter: (val: any) => boolean, notFilteringCount?: ReturnType<typeof refCount>) => {
  const keyLength = Object.keys(obj).length;

  let keyCount = 1;

  return reduce<Object, Object>(
    obj,
    (result, value, key) => {
      if(isPlainObject(value) && !isEmpty(value)) {
        result[key] = compactObjectRecursive(value, filter, notFilteringCount);
      } else if(filter(value)) {
        result[key] = value;
      } else if(notFilteringCount && keyCount === keyLength) {
        notFilteringCount.plus();
      }

      keyCount++;

      return result;
    },
    {}
  ) as T;
};

export const compactObject = <T extends object | Document>(obj: T, filter = (val: any) => !(isUndefined(val) || isNull(val))) => {
  if(!isPlainObject(obj)) {
    throw Error(`not supported ${typeof obj} type. (plain object type or mongoose Document type)`);
  }

  const notFilteringCount = refCount();

  let result = compactObjectRecursive(obj, filter, notFilteringCount);

  for(let i = 0; i < notFilteringCount.get(); i++) {
    result = compactObjectRecursive(result, filter);
  }

  return result;
};
