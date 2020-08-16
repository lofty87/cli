/**
 * @name randomAlphaNumeric
 * * 중복가능한 영문자(대, 소), 숫자로 구성된 랜덤한 값을 리턴
 */
export const randomAlphaNumeric = (length = 6) => {
  const strRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let acc = '';

  for(let i = 0; i < length; i++) {
    acc += strRange.charAt(Math.floor(Math.random() * strRange.length));
  }

  return acc;
};

/**
 * @name refCount
 * * compactObject() 를 정의할 때 사용되는 함수로
 * * scope 에 제한되지 않도록 설계한
 * * call by reference count
 */
export const refCount = (defaultCount = 0) => {
  const count = [ defaultCount ];

  return {
    plus: () => {
      count[0] += 1;
    },
    minus: () => {
      count[0] -= 1;
    },
    get: () => count[0],
  };
};
