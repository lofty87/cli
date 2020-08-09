import fs from 'fs';
import path from 'path';

const rootPath = fs.realpathSync(process.cwd());

export const resolve = (relativePath: string) => {
  const resolvedPath = path.resolve(rootPath, relativePath);

  return resolvedPath;
};

export default {
  rootDir: rootPath,
  configDir: resolve('config'),
  packagesDir: resolve('packages'),
  srcDir: resolve('src'),
  entry: resolve('src/index.ts'),
  buildDir: resolve('build'),
  outputFilename: 'bundle.js',
};
