import { compact } from 'lodash';

/**
 * @name splitPathname
 * @param '/path/name' or 'path/name' or 'path/name/'
 * @returns [ 'path', 'name' ]
 */
export const splitPathname = (pathname: string) => {
  const result = compact(pathname.split('/'));

  return result;
};

/**
 * @name isModelDetailPage
 * * pathname 을 통해 model 상세페이지 여부를 판단.
 * * idIndex 는 0 부터 시작.
 *
 * ? e.g.
 * ? isModelDetailPage('/pathname/subpathname/{id}', 2) === true
 * ? isModelDetailPage('/pathname/subpathname', 2) === false
 */
export const isModelDetailPage = (pathname: string, idIndex: number) => {
  const result = idIndex === splitPathname(pathname).length - 1;

  return result;
};
