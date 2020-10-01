import fs from 'fs';
import path from 'path';

const appPath = fs.realpathSync(process.cwd());

export const resolve = (relativePath: string) => {
  return path.resolve(appPath, relativePath);
};

export default {
  dotEnv: resolve('.env'),
  appDir: appPath,
  typesDir: resolve('@types'),
  assetsDir: resolve('assets'),
  configDir: resolve('config'),
  srcDir: resolve('src'),
  entry: resolve('src/app.ts'),
  buildDir: resolve('build'),
  outputFilename: 'bundle.js',
};
