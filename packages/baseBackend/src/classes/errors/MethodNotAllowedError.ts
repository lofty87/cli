import StatusError from './StatusError';

// * 405
export default class MethodNotAllowedError extends StatusError {
  constructor(message?: string) {
    super(405, message);
  }
}
