import originAxios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { throttle } from 'lodash';
import cookies from 'js-cookie';
import { RequestError, StatusError } from '@classes/index';
import { actions } from '@stores/index';
import statusCodes from '@constants/status-codes';
import env from '@env';

/**
 * @name putCookieInHeaders
 * ! Dprecated: use httpOnly option
 */
const putCookieInHeaders = (config: AxiosRequestConfig) => {
  const ACCESS_TOKEN = 'access_token';
  const accessToken = cookies.get(ACCESS_TOKEN);

  accessToken && (config.headers[ACCESS_TOKEN] = accessToken);
};

/**
 * @name validateStatus
 * * validate  : 200, 201, 202, 204
 * * invalidate: 400, 401, 403, 404, 405, 409, 500, 501
 */
const validateStatus = (status: number) => {
  const validate = status >= 200 && status < 300;

  return validate;
};

/**
 * @name handleError
 * * axios request, response error handling.
 * * throttle(500ms) 을 사용하여 다발성 error 처리 (최초 error 우선 처리).
 */
const errorThrottle = throttle((error: RequestError) => {
  actions.global.request.doneOn('common');
  actions.global.modalSpinner.done();
  actions.global.modalAlert.error(error.message).open();
}, 500);

const handleError = () => {
  const error = new RequestError();

  errorThrottle(error);

  throw error;
};

/**
 * @name handleResponseError
 * * server error handling.
 * * signed error(Unauthorized) interceptor.
 * * throttle(500ms) 을 사용하여 다발성 error 처리 (최초 error 우선 처리).
 */
const responseErrorThrottle = throttle((status: number, message: string) => {
  actions.global.request.doneOn('common');
  actions.global.modalSpinner.done();

  if(statusCodes['unauthorized'] === status) {
    actions.global.modalAlert.error(message).open();
  }
}, 500);

const handleResponseError = (error: any) => {
  const { status, data } = error.response;

  responseErrorThrottle(status, data);

  throw new StatusError(status, data);
};

/**
 * @name initialize
 * * axios interceptors
 */
const initialize = (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json';
      config.withCredentials = true; // ? cors & cookie
      config.validateStatus = validateStatus;

      // putCookieInHeaders(config);

      actions.global.request.pendingOn('common');
      actions.global.modalSpinner.pending();

      return config;
    },
    (error) => {
      handleError();
    }
  );

  axios.interceptors.response.use(
    ({ data }) => {
      actions.global.request.doneOn('common');
      actions.global.modalSpinner.done();

      return data;
    },
    (error) => {
      if(error.response) {
        handleResponseError(error);
      } else {
        handleError();
      }
    }
  );

  return axios;
};

const { apiUrl } = env;

export default {
  req: initialize(
    originAxios.create({
      baseURL: apiUrl,
    })
  ),
  api: initialize(
    originAxios.create({
      baseURL: `${apiUrl}/api`,
    })
  ),
};
