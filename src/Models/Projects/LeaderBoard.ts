import { ObjectId } from 'mongoose';

// for public projects, multiple people could take on project, see who does the best
export interface LeaderBoard {
  _id: ObjectId;
  userIds: ObjectId[];
  projectId: ObjectId;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
