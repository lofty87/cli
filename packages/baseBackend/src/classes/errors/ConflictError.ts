import StatusError from './StatusError';

// * 409
export default class ConflictError extends StatusError {
  constructor(message?: string) {
    super(409, message);
  }
}
