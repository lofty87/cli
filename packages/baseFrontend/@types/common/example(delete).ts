import { Document } from 'mongoose';

export interface ExampleType extends Document {
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
