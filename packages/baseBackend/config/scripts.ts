import { basename } from 'path';

import paths from './paths';

const { buildDir, outputFilename } = paths;

export const buildEndScript = `node ${basename(buildDir)}/${outputFilename}`;
