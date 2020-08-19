import dotenv from 'dotenv';

import { existEnvFile } from './checks';
import paths from './paths';

const envFilePath = paths.dotEnv;

existEnvFile(envFilePath);

dotenv.config({
  path: envFilePath,
});

export default {
  nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'production',
  isDev: process.env.NODE_ENV !== 'production',
  timezone: process.env.TIMEZONE as string,
  port: parseInt(process.env.PORT || '3000', 10),
  publicURL: process.env.PUBLIC_URL as string,
  mongoDbHost: process.env.MONGO_DB_HOST as string,
  mongoDbUsername: process.env.MONGO_DB_USERNAME as string,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD as string,
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
  googleSmtpHost: process.env.GOOGLE_SMTP_HOST || 'smtp.gmail.com',
  googleSmtpPort: parseInt(process.env.GOOGLE_SMTP_PORT || '587', 10),
  googleApiOauthAccount: process.env.GOOGLE_API_OAUTH_ACCOUNT || 'account',
  googleApiOauthClientId: process.env.GOOGLE_API_OAUTH_CLIENT_ID || 'clientId',
  googleApiOauthClientSecret: process.env.GOOGLE_API_OAUTH_CLIENT_SECRET || 'clientSecret',
  googleApiOauthRefreshToken: process.env.GOOGLE_API_OAUTH_REFRESH_TOKEN || 'refreshToken',
  googleApiOauthAccessToken: process.env.GOOGLE_API_OAUTH_ACCESS_TOKEN || 'accessToken',
  googleApiOauthTokenExpires: parseInt(process.env.GOOGLE_API_OAUTH_TOKEN_EXPIRES || '3600', 10),
};
