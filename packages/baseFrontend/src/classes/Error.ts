import http from 'http';

const { STATUS_CODES } = http;

export class StatusError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    super(message || STATUS_CODES[status]);

    this.status = status;

    // ? stack trace
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class RequestError extends StatusError {
  constructor(message?: string) {
    super(-1, message || '네트워크 요청이 실패했습니다.');
  }
}
