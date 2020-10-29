import { SchemaOptions } from 'mongoose';

/**
 * * model schema common options
 * ? minimize       : contains empty sub-{}
 * ? toJSON.virtuals: contains schema.virtual
 */
export const schemaOptions: SchemaOptions = {
  strict: 'throw',
  minimize: false,
  toJSON: {
    virtuals: true,
  },
};
