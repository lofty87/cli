import inquirer from 'inquirer';
import chalk from 'chalk';
import info from '@info';

import { PackageJson, ProjectType } from '$types/index';

const projectTypes: ProjectType[] = [ 'backend', 'frontend', 'playground' ];

export const setPackageJson = async (projectName: string) => {
  type Answer1 = {
    projectType: ProjectType;
    projectName: string;
    projectVersion: string;
  };

  const answer1 = await inquirer.prompt<Answer1>([
    {
      type: 'list',
      name: 'projectType',
      message: 'what kind of project?',
      choices: projectTypes,
      default: 0,
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'project name:',
      default: projectName,
    },
    {
      type: 'input',
      name: 'projectVersion',
      message: 'version:',
      default: '1.0.0',
    },
  ]);

  type Answer2 = {
    projectDescription: string;
    projectAuthor: string;
  };

  const { projectType } = answer1;

  const answer2 = await inquirer.prompt<Answer2>([
    {
      type: 'input',
      name: 'projectDescription',
      message: 'description:',
      default: `${info.author} ${projectType === 'playground' ? projectType : `${projectType} project`}`,
    },
    {
      type: 'input',
      name: 'projectAuthor',
      message: 'author:',
      default: info.author,
    },
  ]);

  return {
    projectType: answer1.projectType,
    packageJson: {
      name: answer1.projectName,
      version: answer1.projectVersion,
      description: answer2.projectDescription,
      author: answer2.projectAuthor,
    },
  };
};

export const printPackageJson = (packageJson: PackageJson) => {
  console.log(`
will create a ${chalk.yellow('package.json')} as follows:
  
{
  "name": "${packageJson.name}",
  "version": "${packageJson.version}",
  "description": "${packageJson.description}",
  "author": "${packageJson.author}"
}
  `);
};
