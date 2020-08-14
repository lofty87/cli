import { STATUS_CODES } from 'http';

export const notFoundDocMessage = (name: string, id: number) => {
  const message = `${STATUS_CODES[404]}: ${name}(${id})`;

  return message;
};

export * from './send';
