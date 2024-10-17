import { ObjectId } from 'mongoose';

export interface Milestone {
  _id: ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}
