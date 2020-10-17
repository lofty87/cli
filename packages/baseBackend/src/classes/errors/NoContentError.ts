import StatusError from './StatusError';

// * 204
export default class NoContentError extends StatusError {
  constructor(message?: string) {
    super(204, message);
  }
}
