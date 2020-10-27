import { URL } from 'url';

import Koa from 'koa';
import Pug from 'koa-pug';
import browserSync from 'browser-sync';
import { defaults } from 'lodash';
import chalk from 'chalk';
import config from '@config/paths';
import env from '@config/env';

const { assetsDir } = config;
const { isDev, publicURL } = env;

/**
 * * pug template server
 *
 * ? 1. templates dir: {app}/assets/templates
 * ? 2. url location: /{template-file-name}
 * ? 3. locals: pass data to pug template
 *
 * ! browser-sync proxy issue
 * ! browser-sync.pug 를 공통으로 include 하여
 * ! script 를 직접 추가하였다.
 */

const PORT = 5000;
const BROWSER_SYNC_PORT = 5001;
const START_TEMPLATE = 'example';
const templatesDir = `${assetsDir}/templates`;
const { protocol, hostname } = new URL(publicURL);
const host = `${protocol}//${hostname}:${PORT}`;

// * pass data to pug template
const locals = {
  header: 'header',
  content: 'content',
  footer: 'footer',
};

const app = new Koa();
const pug = new Pug({
  viewPath: templatesDir,
  locals: defaults(locals, {
    isDev,
    host,
  }),
});

// * binding ctx.render()
pug.use(app);

// * routing
app.use(async (ctx, next) => {
  const pathname = ctx.request.path.replace(/\//, '');

  // ? pass favicon.ico
  if(pathname.match(/\.ico/)) {
    await next();
  } else {
    await ctx.render(pathname);
  }
});

app.listen(PORT, () => {
  console.log(
    chalk.blueBright(`
----------------------------------

pug template server listening to port ${PORT}

----------------------------------
    `)
  );

  /**
   * ! browser-sync (watch, reload)
   */
  browserSync
    .create('pug template server')
    .init({
      proxy: host,
      port: BROWSER_SYNC_PORT,
      watch: true,
      files: `${templatesDir}/**/*`,
      startPath: START_TEMPLATE,
    });
});
