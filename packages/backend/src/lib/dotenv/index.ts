import fs from 'fs';
import path from 'path';

import { config } from 'dotenv';

const serverRoot = fs.realpathSync(process.cwd());
const resolve = (relativePath: string) => {
  const resolvedPath = path.resolve(serverRoot, relativePath);

  return resolvedPath;
};

config({
  path: resolve('.env'),
});
