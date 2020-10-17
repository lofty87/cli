import { Model } from '@classes/index';
import { Document } from 'mongoose';

import schema from './example.schema';

// ? model type (delete)
interface ExampleType extends Document {
  _id: number;
  profile: {
    email: string;
    name: string;
  };
  info: {
    roles: string[];
  };
  security: {
    password: string;
  };
  createdAt: number;
}

export default new Model<ExampleType>(schema, 'examples', [ '_id', 'profile', 'info', 'createdAt' ]);
