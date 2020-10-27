import { basename } from 'path';

import pug, { LocalsObject, Options } from 'pug';
import paths from '@config/paths';

const { assetsDir } = paths;

/**
 * * assets/templates 경로에 pug template 들을 위치
 * ? 파일명이 곧 template name
 */

export const renderPug = (templateName: string, options: Options & LocalsObject) => {
  const pugTemplate = `${basename(assetsDir)}/templates/${templateName}.pug`;

  return pug.renderFile(pugTemplate, options);
};
