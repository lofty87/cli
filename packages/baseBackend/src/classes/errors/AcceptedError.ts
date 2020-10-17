import StatusError from './StatusError';

// * 202
export default class AcceptedError extends StatusError {
  constructor(message?: string) {
    super(202, message);
  }
}
