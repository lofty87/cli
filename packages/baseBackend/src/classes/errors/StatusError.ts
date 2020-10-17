import http from 'http';

const { STATUS_CODES } = http;

export default class StatusError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    super(message || STATUS_CODES[status]);

    this.status = status;

    // ? stack trace
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
