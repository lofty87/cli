import fs from 'fs';
import path from 'path';

import { path as appRootPath } from 'app-root-path';

/**
 * * root: real app root
 * * cwd : command root
 */

export const resolveApp = (relativePath: string) => {
  return path.resolve(appRootPath, relativePath);
};

export default {
  rootDir: appRootPath,
  typesDir: resolveApp('@types'),
  configDir: resolveApp('config'),
  packagesDir: resolveApp('packages'),
  srcDir: resolveApp('src'),
  entry: resolveApp('src/index.ts'),
  buildDir: resolveApp('build'),
  outputFilename: 'bundle.js',
  cwdDir: fs.realpathSync(process.cwd()),
};
