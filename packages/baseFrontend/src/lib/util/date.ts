import moment from 'moment';

/**
 * @name formatOf
 * * millisecond 를 YYYY-MM-DD 형식으로 날짜 표시
 */
export const formatOf = (millisecond: number) => {
  return moment(millisecond).format('YYYY-MM-DD');
};

/**
 * @name fromNow
 * * millisecond 를 (e.g. 4 years ago) 형식으로 날짜 표시
 */
export const fromNow = (millisecond: number) => {
  return moment(millisecond).fromNow();
};
