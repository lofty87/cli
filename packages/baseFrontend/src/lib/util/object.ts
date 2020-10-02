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
 * @return new object (immutate)
 * * 배열은 defaultsDeep 처리에서 제외한 커스텀 defaultsDeep
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

export const advancedDefaultsDeep = (obj: Object, source: Object) => {
  const arrayValueKeys: string[] = [];

  loadArrayValueKeysRecursive(obj, '', arrayValueKeys);

  const result = defaultsDeep({}, obj, source);

  // ? overwrite
  arrayValueKeys.forEach((key) => {
    set(result, key, get(obj, key));
  });

  return result;
};
