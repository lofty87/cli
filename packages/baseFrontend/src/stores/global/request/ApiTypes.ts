type Common = 'common';

type Example =
  | 'example/add'
  | 'example/fetchAll'
  | 'example/fetchOneById'
  | 'example/updateById'
  | 'example/removeById'
  | 'example/fetchCount';

export type ApiType = Common | Example;
