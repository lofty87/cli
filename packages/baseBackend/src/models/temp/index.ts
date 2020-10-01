import { Model } from '@classes/index';
import { Document } from 'mongoose';

import schema from './temp.schema';

// ? e.g.
interface TempType extends Document {
  _id: number;
  name: string;
  password: string;
  createdAt: number;
}

export default new Model<TempType>(schema, 'temps', [ '_id', 'name', 'password' ]);
