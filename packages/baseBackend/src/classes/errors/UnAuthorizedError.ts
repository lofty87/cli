import StatusError from './StatusError';

// * 401
export default class UnAuthorizedError extends StatusError {
  constructor(message?: string) {
    super(401, message);
  }
}
