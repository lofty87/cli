import { STATUS_CODES } from 'http';

import { reduce, snakeCase } from 'lodash';

/**
 * @name status-codes
 * @returns { 'not_found': 404 }
 * * invert and ensure STATUS_CODES
 * * key consist of lowercase and _(underbar)
 */
export default reduce<any, Record<string, number>>(
  STATUS_CODES,
  (statusCodes, message, code) => {
    const key = snakeCase(message);

    statusCodes[key] = parseInt(code, 10);

    return statusCodes;
  },
  {}
);
