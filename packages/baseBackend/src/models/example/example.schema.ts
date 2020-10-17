import { Schema } from 'mongoose';
import moment from 'moment';
import { setPassword } from '@lib/model';

import { schemaOptions } from '../schemaOptions';

const schema = new Schema(
  {
    _id: {
      type: Number,
      unique: true,
    },
    profile: {
      email: {
        type: String,
        required: true,
        index: true,
      },
      name: {
        type: String,
        required: true,
        index: true,
      },
    },
    info: {
      roles: {
        type: Array,
        required: true,
      },
    },
    security: {
      password: {
        type: String,
        required: true,
        set: setPassword,
      },
    },
    createdAt: {
      type: Number,
      default: () => moment()
        .valueOf(),
      required: true,
    },
  },
  schemaOptions
);

export default schema;
