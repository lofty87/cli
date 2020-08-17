import moment from 'moment-timezone';
import env from '@config/env';

import koaConfig from './koa';
import mongooseConfig from './mongoose';
import nodemailerConfig from './nodemailer';

export default async () => {
  moment.tz.setDefault(env.timezone);

  await mongooseConfig();
  await nodemailerConfig();

  return await koaConfig();
};
