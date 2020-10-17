import StatusError from './StatusError';

// * 404
export default class NotFoundError extends StatusError {
  constructor(message?: string) {
    super(404, message);
  }
}
