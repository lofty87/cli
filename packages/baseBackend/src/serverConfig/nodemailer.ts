import { createTransport } from 'nodemailer';
import env from '@config/env';

const {
  googleSmtpHost,
  googleSmtpPort,
  googleApiOauthAccount,
  googleApiOauthClientId,
  googleApiOauthClientSecret,
  googleApiOauthRefreshToken,
  googleApiOauthAccessToken,
  googleApiOauthTokenExpires,
} = env;

export const transporter = createTransport(
  {
    host: googleSmtpHost,
    port: googleSmtpPort,
    auth: {
      type: 'oauth2',
      user: googleApiOauthAccount,
      clientId: googleApiOauthClientId,
      clientSecret: googleApiOauthClientSecret,
      refreshToken: googleApiOauthRefreshToken,
      accessToken: googleApiOauthAccessToken,
      expires: googleApiOauthTokenExpires,
    },
  },
  {
    from: googleApiOauthAccount,
  }
);

export default async () =>
  await new Promise<boolean>((resolve) => {
    transporter.verify((error) => {
      if(error) {
        console.error('fail to get connection to smtp server.');
        console.error(error.message);
      } else {
        console.log('2. ready to send smtp messages.');
      }

      resolve(true);
    });
  });
