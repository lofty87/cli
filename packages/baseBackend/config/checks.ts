import fs from 'fs';
import { parse } from 'path';

import chalk from 'chalk';
import nodemon from 'nodemon';

export const existEnvFile = (envFilePath: string) => {
  try {
    fs.accessSync(envFilePath, fs.constants.F_OK);
  } catch(error) {
    const {
      base: filename
    } = parse(envFilePath);

    const errorMsg = chalk.red(`required "${chalk.yellow(filename)}" file.`);

    throw new Error(errorMsg);
  }
};

export const checkNodemonInstall = () => {
  if(!nodemon as any) {
    const errorMsg = chalk.red(`nodemon is not installed. (${chalk.yellow('npm install --save nodemon')})`);

    throw new Error(errorMsg);
  }
};

export const checkEnvVar = () => {
  const makeErrorMsg = (msg: string) => chalk.red(`required "${chalk.yellow(msg)}" env variable.`);

  if(!process.env.TIMEZONE) {
    throw new Error(makeErrorMsg(`TIMEZONE (${chalk.yellowBright('e.g. Asia/Seoul')})`));
  }

  if(!process.env.PUBLIC_URL) {
    throw new Error(makeErrorMsg('PUBLIC_URL'));
  }

  if(!process.env.MONGO_DB_HOST || !process.env.MONGO_DB_USERNAME || !process.env.MONGO_DB_PASSWORD) {
    throw new Error(makeErrorMsg('MONGO_DB_HOST\', \'MONGO_DB_USERNAME\', \'MONGO_DB_PASSWORD'));
  }

  if(!process.env.JWT_SECRET_KEY) {
    throw new Error(makeErrorMsg('JWT_SECRET_KEY'));
  }
};
