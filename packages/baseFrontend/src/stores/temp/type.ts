import { Document } from 'mongoose';

// ? e.g.
export interface TempType extends Document {
  _id: number;
  name: string;
  password: string;
  createdAt: number;
}
