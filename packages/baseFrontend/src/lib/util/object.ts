import { defaultsDeep, forEach, get, isArray, isPlainObject, set } from 'lodash';
import { Object } from '@lofty87/types';

/**
 * @name lengthOf
 * * 객체의 key 개수 반환
 */
export const lengthOf = (obj: Object) => {
  return Object.keys(obj).length;
};

/**
 * @name advancedDefaultsDeep
 * @return new object
 * * defaultsDeep 처리에서 배열 값을 제외한
 * * advanced 한 defaultsDeep (immutate)
 *
 * ! defaultsDeep({ values: [ 1 ] }, { values: [ 3, 4 ] })
 * ! result : { imgSrc: [ 1, 4 ] }
 * ! resolve: { imgSrc: [ 1 ] }
 */
const loadArrayValueKeysRecursive = (obj: Object, keyPath: string, arrayValueKeys: string[]) => {
  forEach(obj, (value, key) => {
    const newKeyPath = keyPath ? `${keyPath}.${key}` : `${key}`;

    if(isPlainObject(value)) {
      loadArrayValueKeysRecursive(value, newKeyPath, arrayValueKeys);
    } else if(isArray(value)) {
      arrayValueKeys.push(newKeyPath);
    }
  });
};

export const advancedDefaultsDeep = (obj: Object, ...sources: Object[]) => {
  const arrayValueKeys: string[] = [];

  loadArrayValueKeysRecursive(obj, '', arrayValueKeys);

  const result = defaultsDeep({}, obj, ...sources);

  // ? overwrite
  arrayValueKeys.forEach((key) => {
    set(result, key, get(obj, key));
  });

  return result;
};
