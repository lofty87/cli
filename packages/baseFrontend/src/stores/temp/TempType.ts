import { Document } from 'mongoose';

// ? e.g.
export interface TempType extends Document {
  _id: number;
  profile: {
    email: string;
    name: string;
  };
  info: {
    roles: string[];
  };
  secure: {
    password: string;
  };
  createdAt: number;
}
