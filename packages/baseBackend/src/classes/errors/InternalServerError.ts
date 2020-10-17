import StatusError from './StatusError';

// * 500
export default class InternalServerError extends StatusError {
  constructor(message?: string) {
    super(500, message);
  }
}
