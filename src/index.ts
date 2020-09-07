import chalk from 'chalk';
import { program } from 'commander';
import { confirm, createProject, printPackageJson, setPackageJson } from '@process/index';
import { checkDirExistsSync, validateProjectName } from '@lib/index';
import paths from '@config/paths';
import info from '@info';

const { rootDir } = paths;

try {
  program
    .name(chalk.green(info.name))
    .version(chalk.greenBright(info.version))
    .usage(chalk.greenBright('<project-name>'))
    .description(chalk.yellow(info.description))
    .arguments('<project-name>')
    .action((projectName: string) => {
      const projectDir = `${rootDir}/${projectName}`;

      validateProjectName(projectName);

      checkDirExistsSync(projectDir);

      (async () => {
        const { projectType, packageJson } = await setPackageJson(projectName);

        printPackageJson(packageJson);

        await confirm();

        createProject(projectDir, projectType, packageJson);
      })();
    })
    .parse(process.argv);
} catch(error) {
  console.error(error);
}
