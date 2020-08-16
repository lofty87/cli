import { isEmpty, isNull, isPlainObject, isUndefined } from 'lodash';

/**
 * @name isNotEmpty
 * @return true : 0, '', boolean, number, string, [], [ 1, 2 ], { name: 'value' }
 * @return false: undefined, null, {}
 *
 * * compactObject() 를 사용하여
 * * mongoose doc 을 compact 할 때
 * * filter 로 사용
 */
export const isNotEmpty = (value: any) => {
  if(isUndefined(value) || isNull(value) || (isPlainObject(value) && isEmpty(value))) {
    return false;
  }

  return true;
};
