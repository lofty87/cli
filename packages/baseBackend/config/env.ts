import dotenv from 'dotenv';

import { existEnvFile } from './checks';
import paths from './paths';

const envFilePath = paths.dotEnv;

existEnvFile(envFilePath);

dotenv.config({
  path: envFilePath,
});

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  timezone: process.env.TIMEZONE as string,
  port: parseInt(process.env.PORT || '3000', 10),
  publicURL: process.env.PUBLIC_URL as string,
  mongoDbHost: process.env.MONGO_DB_HOST as string,
  mongoDbUsername: process.env.MONGO_DB_USERNAME as string,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD as string,
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
};
