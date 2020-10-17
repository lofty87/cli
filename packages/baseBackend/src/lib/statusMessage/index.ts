import { STATUS_CODES } from 'http';

export const notFoundModelMessage = (name: string, id: number) => {
  const message = `${STATUS_CODES[404]}: ${name}(${id})`;

  return message;
};

export * from './send';
