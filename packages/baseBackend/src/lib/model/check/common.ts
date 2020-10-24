import { Document } from 'mongoose';
import { isEmpty, isNaN, isNumber } from 'lodash';
import validator from 'validator';
import { BadRequestError, NotFoundError } from '@classes/index';
import { notFoundModelMessage } from '@lib/statusMessage';

export const checkRequired = (value: any, message = '필수 입력입니다.') => {
  if(!isNumber(value) && isEmpty(value)) {
    throw new BadRequestError(message);
  }
};

export const checkRequiredInput = (name: string, value: number | string) => {
  if(!isNumber(value) && isEmpty(value)) {
    throw new BadRequestError(`${name} 은/는 필수 입력입니다.`);
  }
};

export const checkEmailValidation = (email: string, message = '잘못된 이메일 형식입니다.') => {
  if(!validator.isEmail(email)) {
    throw new BadRequestError(message);
  }
};

export const checkUrlValidation = (url: string, message = '잘못된 URL 형식입니다.') => {
  if(!/^(http|https):\/\//.test(url)) {
    throw new BadRequestError(message);
  }
};

export const checkUrlsValidation = (urls: string[], message = '잘못된 URL 형식이 존재합니다.') => {
  urls.forEach((url) => checkUrlValidation(url, message));
};

export const checkTitleValidation = (title: string) => {
  const MIN = 1;
  const MAX = 50;

  if(
    !validator.isLength(title, {
      min: MIN,
      max: MAX,
    })
  ) {
    throw new BadRequestError(`제목은 최소 ${MIN}자에서 최대 ${MAX}자까지 가능합니다.`);
  }
};

export const checkContentValidation = (content: string) => {
  const MIN = 1;
  const MAX = 1000;

  if(
    !validator.isLength(content, {
      min: MIN,
      max: MAX,
    })
  ) {
    throw new BadRequestError(`내용은 최소 ${MIN}자에서 최대 ${MAX}자까지 가능합니다.`);
  }
};

export const checkModelId = (name: string, id: any, parsedId: any) => {
  if(isNaN(parsedId)) {
    throw new NotFoundError(notFoundModelMessage(name, id));
  }
};

export const checkModelExists = (name: string, id: any, data: null | Document) => {
  if(!data) {
    throw new NotFoundError(notFoundModelMessage(name, id));
  }
};
