import { isNumber } from 'lodash';
import moment from 'moment';
import { compactObject } from '@lofty87/util';

/**
 * @name makeUpdated
 * * 업데이트 할 때,
 * * updated 값을 편하게 작성하기 위해
 */
export const makeUpdated = (userId?: number) =>
  compactObject(
    {
      updated: {
        userId,
        at: moment()
          .valueOf(),
      },
    },
    isNumber
  );
