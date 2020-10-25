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

const model = new Model<ExampleType>(schema, 'examples');

model.setClientOptions({
  // clientFilter: {
  //   info: {
  //     status: {
  //       $in: [ 'normal', 'limit' ],
  //     },
  //   },
  // },
  clientProjection: [ '_id', 'profile', 'info', 'createdAt' ],
});

export default model;
