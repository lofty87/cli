import { Object } from '@lofty87/types';

/**
 * @name arrayToObj
 * * 배열을 index 가 key 인 객체로 바꾸기
 */
export const arrayToObj = (array: any[]) => {
  const obj = array.reduce<Object>((acc, value, key) => {
    acc[key] = value;

    return acc;
  }, {});

  return obj;
};
