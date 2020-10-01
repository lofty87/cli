import fs from 'fs';
import path from 'path';

import { path as appRootPath } from 'app-root-path';

/**
 * * root: real app root
 * * cwd : command root
 */

export const resolve = (relativePath: string) => {
  return path.resolve(appRootPath, relativePath);
};

export default {
  rootDir: appRootPath,
  typesDir: resolve('@types'),
  configDir: resolve('config'),
  packagesDir: resolve('packages'),
  srcDir: resolve('src'),
  entry: resolve('src/index.ts'),
  buildDir: resolve('build'),
  outputFilename: 'bundle.js',
  cwdDir: fs.realpathSync(process.cwd()),
};
