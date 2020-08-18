import { Object } from '@lofty87/types';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { defaultsDeep } from 'lodash';
import moment from 'moment';
import env from '@config/env';

const { publicURL, jwtSecretKey } = env;

const defaultOptions: SignOptions = {
  issuer: publicURL,
  subject: 'subject',
  audience: 'client',
};

const sign = <Payload extends Object>(payload: Payload, options: SignOptions = {}) => {
  defaultsDeep(payload, {
    iat: moment().valueOf(),
  });

  defaultsDeep(options, defaultOptions);

  return jsonwebtoken.sign(payload, jwtSecretKey, options);
};

type Result<Payload> = {
  iat: string;
  exp: string;
  aud: string;
  iss: string;
  sub: string;
} & Payload;

const verify = <Payload extends Object>(token: string, options: SignOptions = {}) => {
  defaultsDeep(options, defaultOptions);

  const {
    iat,
    exp,
    aud,
    iss,
    sub,
    ...ohters
  } = jsonwebtoken.verify(token, jwtSecretKey, options) as Result<Payload>;

  return {
    iat: parseInt(iat, 10),
    exp: parseInt(exp, 10),
    aud,
    iss,
    sub,
    ...ohters,
  };
};

export default {
  sign,
  verify,
};
