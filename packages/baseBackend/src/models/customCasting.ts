import mongoose from 'mongoose';

/**
 * * 런타임 시 schema 에 따라 값이 set 될 때,
 * * 값 casting 문제로 AssertionError 가 발생한다면
 * * custom casting 을 통해 error 를 handling 할 수 있다.
 * ? https://mongoosejs.com/docs/tutorials/custom-casting.html
 */
const numberCast = (mongoose as any).Number.cast();

(mongoose as any).Number.cast((value: any) => {
  try {
    return numberCast(value);
  } catch(error) {
    return value;
  }
});
