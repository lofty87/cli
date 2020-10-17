import StatusError from './StatusError';

// * 400
export default class BadRequestError extends StatusError {
  constructor(message?: string) {
    super(400, message);
  }
}
