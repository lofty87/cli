import bcrypt from 'bcrypt';

/**
 * @name setPassword
 * * password setter in user schema (password 암호화)
 */
export const setPassword = (password: string) => {
  password = bcrypt.hashSync(password, 10);

  return password;
};
