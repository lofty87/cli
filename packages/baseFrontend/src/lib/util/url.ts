import { compact } from 'lodash';

/**
 * @name splitPathname
 * @param '/path/name' or 'path/name' or 'path/name/'
 * @returns [ 'path', 'name' ]
 */
export const splitPathname = (pathname: string) => {
  return compact(pathname.split('/'));
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
  return idIndex === splitPathname(pathname).length - 1;
};
