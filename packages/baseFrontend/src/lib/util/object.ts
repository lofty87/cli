import { Object } from '@lofty87/types';

/**
 * @name lengthOf
 * * 객체의 key 개수 반환
 */
export const lengthOf = (obj: Object) => {
  const { length } = Object.keys(obj);

  return length;
};
