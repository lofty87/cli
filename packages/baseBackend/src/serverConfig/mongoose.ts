import { format, parse } from 'url';

import { connect } from 'mongoose';
import env from '@config/env';

const { mongoDbHost, mongoDbPassword, mongoDbUsername } = env;
const { protocol, host, path } = parse(`${mongoDbHost}`);

const url = format({
  protocol,
  slashes: true,
  auth: `${mongoDbUsername}:${mongoDbPassword}`,
  host,
  pathname: path,
});

/**
 * ? 1. autoIndex
 * * while nice for development,
 * * it is recommended this behavior be disabled in production
 * * since index creation can cause a significant performance impact
 *
 * ? 2. mongoose-auto-increment
 * * _id field added of type Number
 * * and will automatically increment with each new document
 */

export default async () =>
  await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.log('1. successfully connected to mongodb.');
    })
    .catch((error) => {
      console.error('fail to get mongodb connection.');

      throw new Error(error);
    });
