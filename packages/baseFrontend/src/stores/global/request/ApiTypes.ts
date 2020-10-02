type Common = 'common';

type Temp =
  | 'temp/add'
  | 'temp/fetchDocs'
  | 'temp/fetchDocById'
  | 'temp/updateById'
  | 'temp/removeById'
  | 'temp/fetchCount';

export type ApiTypes = Common | Temp;
