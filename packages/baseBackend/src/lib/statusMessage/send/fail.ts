import { AcceptedError, NoContentError } from '@classes/index';

export const sendAccepted = () => {
  throw new AcceptedError();
};

export const sendNoContent = () => {
  throw new NoContentError();
};
