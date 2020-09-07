import inquirer from 'inquirer';

export const confirm = async () => {
  type Answer = {
    confirm: boolean;
  };

  const answer = await inquirer.prompt<Answer>([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'are you sure you want to create a project?',
      default: true,
    },
  ]);

  if(!answer.confirm) {
    process.exit(1);
  }
};
