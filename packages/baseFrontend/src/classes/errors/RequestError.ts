import StatusError from './StatusError';

export default class RequestError extends StatusError {
  constructor(message?: string) {
    super(-1, message || '네트워크 요청이 실패했습니다.');
  }
}
