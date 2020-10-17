import StatusError from './StatusError';

// * 403
export default class ForbiddenError extends StatusError {
  constructor(message?: string) {
    super(403, message);
  }
}
