import chalk from 'chalk';
import { program } from 'commander';
import { confirm, createProject, downloadModules, printPackageJson, setPackageJson } from '@process/index';
import { checkDirExistsSync, initializeProgressBar, printProcess, validateProjectName } from '@lib/index';
import paths from '@config/paths';
import info from '@info';

try {
  program
    .name(chalk.green(info.name))
    .version(chalk.greenBright(info.version))
    .usage(chalk.greenBright('<project-name>'))
    .description(chalk.yellow(info.description))
    .arguments('<project-name>')
    .option('-i, --ignore-naming-rules', 'ignore npm package naming rules', false)
    .action((projectName: string) => {
      try {
        const projectDir = `${paths.cwdDir}/${projectName}`;

        if(!program.ignoreNamingRules) {
          validateProjectName(projectName);
        }

        checkDirExistsSync(projectDir);

        (async () => {
          const { projectType, packageJson } = await setPackageJson(projectName);

          printPackageJson(packageJson);

          await confirm();

          printProcess(projectType);

          initializeProgressBar();

          await createProject(projectDir, projectType, packageJson);

          await downloadModules(projectDir);
        })();
      } catch(error) {
        console.error(error);
      }
    })
    .parse(process.argv);
} catch(error) {
  console.error(error);
}
