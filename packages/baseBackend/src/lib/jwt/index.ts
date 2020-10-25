import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { defaults } from 'lodash';
import moment from 'moment';
import { Object } from '@lofty87/types';
import env from '@config/env';

const { publicURL, jwtSecretKey } = env;

const defaultOptions: SignOptions = {
  issuer: publicURL,
  subject: 'subject',
  audience: 'client',
};

const sign = <Payload extends Object>(payload: Payload, options: SignOptions = {}) => {
  const iat = moment()
    .valueOf();

  payload = defaults({ iat }, payload);
  options = defaults(options, defaultOptions);

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
  options = defaults(options, defaultOptions);

  const { iat, exp, aud, iss, sub, ...ohters } = jsonwebtoken.verify(
    token,
    jwtSecretKey,
    options
  ) as Result<Payload>;

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
