import chalk from 'chalk';
import { program } from 'commander';
import inquirer from 'inquirer';
import paths from '@config/paths';
import { checkProjectName, ensureDirSync } from '@lib/index';

import info from './info';

const { rootDir } = paths;

try {
  program
    .version(chalk.greenBright(info.version))
    .name(chalk.green(info.name))
    .usage(chalk.greenBright('<project-name>'))
    .description(chalk.yellow(info.description))
    .arguments('<project-name>')
    .action(async (projectName: string) => {
      const projectDir = `${rootDir}/${projectName}`;

      checkProjectName(projectName);
      ensureDirSync(projectDir);

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'What kind of project do you want to do?',
          choices: [ 'Backend', 'Frontend', 'Playground' ],
          default: 0,
        },
        {
          type: 'input',
          name: 'projectName',
          message: `What is the project name? ${chalk.green(`(default: ${projectName}`)})`,
          default: projectName,
        },
      ]);

      const descriptions: Record<string, string> = {
        Backend: 'lofty87 backend project',
        Frontend: 'lofty87 frontend project',
        Playground: 'lofty87 playground',
      };

      const answers2 = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'Describe the project.',
          default: descriptions[answers.type],
        },
      ]);

      console.log(answers);
      console.log(answers2);
    })
    .parse(process.argv);
} catch(error) {
  console.error(error);
}
