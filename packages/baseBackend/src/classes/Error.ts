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

// * 202
export class AcceptedError extends StatusError {
  constructor(message?: string) {
    super(202, message);
  }
}

// * 204
export class NoContentError extends StatusError {
  constructor(message?: string) {
    super(204, message);
  }
}

// * 400
export class BadRequestError extends StatusError {
  constructor(message?: string) {
    super(400, message);
  }
}

// * 401
export class UnAuthorizedError extends StatusError {
  constructor(message?: string) {
    super(401, message);
  }
}

// * 403
export class ForbiddenError extends StatusError {
  constructor(message?: string) {
    super(403, message);
  }
}

// * 404
export class NotFoundError extends StatusError {
  constructor(message?: string) {
    super(404, message);
  }
}

// * 405
export class MethodNotAllowedError extends StatusError {
  constructor(message?: string) {
    super(405, message);
  }
}

// * 409
export class ConflictError extends StatusError {
  constructor(message?: string) {
    super(409, message);
  }
}

// * 500
export class InternalServerError extends StatusError {
  constructor(message?: string) {
    super(500, message);
  }
}

// * 501
export class NotImplementedError extends StatusError {
  constructor(message?: string) {
    super(501, message);
  }
}
