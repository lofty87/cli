import chalk from 'chalk';
import { program } from 'commander';
import { confirm, createProject, downloadModules, git, initializeGit, processGitignore, setPackageJson } from '@process/index';
import { checkDirExistsSync, getProgressBar, initializeProgressBar, printEpilogue, printPackageJson, printProcess, validateProjectName } from '@lib/index';
import paths from '@config/paths';
import info from '@info';

try {
  program
    .name(chalk.green(info.binName))
    .version(chalk.green(info.version))
    .usage(`${chalk.red('<')}project-name${chalk.red('>')}`)
    .description(chalk.yellow(info.description))
    .arguments('<project-name>')
    .option('-i, --ignore-naming-rules', 'ignore npm package naming rules', false)
    .action(async (projectName: string) => {
      try {
        const projectDir = `${paths.cwdDir}/${projectName}`;

        if(!program.ignoreNamingRules) {
          validateProjectName(projectName);
        }

        checkDirExistsSync(projectDir);

        const { projectType, packageJson } = await setPackageJson(projectName);

        const useGit = await git();

        printPackageJson(packageJson);

        await confirm();

        printProcess(projectType, useGit);

        initializeProgressBar(useGit ? 4 : 3);

        await createProject(projectDir, projectType, packageJson);

        await downloadModules(projectDir);

        useGit && (await initializeGit(projectDir));

        await processGitignore(projectDir, useGit);

        getProgressBar().end();

        await printEpilogue(projectDir);
      } catch(error) {
        console.error(error);
      }
    })
    .parse(process.argv);
} catch(error) {
  console.error(error);
}
