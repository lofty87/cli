import fs from 'fs';
import path from 'path';

const appPath = fs.realpathSync(process.cwd());

export const resolve = (relativePath: string) => {
  const resolvedPath = path.resolve(appPath, relativePath);

  return resolvedPath;
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
