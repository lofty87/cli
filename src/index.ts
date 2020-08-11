// import { execSync } from 'child_process';

import paths from '@config/paths';
import { checkProjectName, ensureDirSync } from '@lib/index';
import { program } from 'commander';

import pkg from '../package.json';

const { rootDir } = paths;

let projectDir = '';
let projectName = '';

try {
  program
    .version(pkg.version)
    .name('lofty87-cli')
    .usage('<project-name>')
    .arguments('<project-name>')
    .action((name: string) => {
      projectName = name;
      projectDir = `${rootDir}/${name}`;

      checkProjectName(name);
      ensureDirSync(projectDir);
    })
    .parse(process.argv);

  console.log(projectDir);
  console.log(projectName);
} catch(error) {
  console.error(error);
}
