import { basename } from 'path';

import pug, { LocalsObject, Options } from 'pug';
import paths from '@config/paths';

const { assetsDir } = paths;

/**
 * * "${basename(assetsDir)}/templates" 경로에
 * * pug template 들을 위치시킬 수 있고
 * * 파일명이 곧 template name 이 된다.
 */

export const renderPug = (templateName: string, options: Options & LocalsObject) => {
  const pugTemplate = `${basename(assetsDir)}/templates/${templateName}.pug`;

  return pug.renderFile(pugTemplate, options);
};
