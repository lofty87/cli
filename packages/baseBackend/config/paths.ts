import fs from 'fs';
import path from 'path';

const appPath = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) => {
  return path.resolve(appPath, relativePath);
};

export default {
  dotEnv: resolveApp('.env'),
  appDir: appPath,
  typesDir: resolveApp('@types'),
  assetsDir: resolveApp('assets'),
  configDir: resolveApp('config'),
  srcDir: resolveApp('src'),
  entry: resolveApp('src/app.ts'),
  buildDir: resolveApp('build'),
  outputFilename: 'bundle.js',
};
