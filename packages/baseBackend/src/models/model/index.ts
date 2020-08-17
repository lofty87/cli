import { Model } from '@classes/index';
import { Document } from 'mongoose';

import schema from './model.schema';

// ? e.g.
interface ModelType extends Document {
  _id: number;
  name: string;
  password: string;
  createdAt: number;
}

export default new Model<ModelType>(
  schema,
  'models',
  [ '_id', 'name', 'password' ]
);
