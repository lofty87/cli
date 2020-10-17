import { SchemaOptions } from 'mongoose';

/**
 * * model schema common options
 * ? minimize       : contain empty sub-{}
 * ? toJSON.virtuals: contain schema.virtual
 */
export const schemaOptions: SchemaOptions = {
  strict: 'throw',
  minimize: false,
  toJSON: {
    virtuals: true,
  },
};
