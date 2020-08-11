import paths from '@config/paths';
import { checkProjectName, ensureDirSync } from '@lib/index';
import { program } from 'commander';

import pkg from '../package.json';

const { rootDir } = paths;

let projectName = '';

try {
  program
    .version(pkg.version)
    .name('lofty87-cli')
    .usage('<project-name>')
    .arguments('<project-name>')
    .action((name: string) => {
      ensureDirSync(`${rootDir}/${name}`);
      checkProjectName(name);

      projectName = name;
    })
    .parse(process.argv);

  console.log(projectName);
} catch(error) {
  console.error(error);
}
