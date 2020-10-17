import StatusError from './StatusError';

// * 501
export default class NotImplementedError extends StatusError {
  constructor(message?: string) {
    super(501, message);
  }
}
