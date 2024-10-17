import { ObjectId } from 'mongoose';

export interface ProjectInvite {
  _id: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  invitedBy: ObjectId;
  status: InviteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum InviteStatus {
  'Pending',
  'Accepted',
  'Declined',
  'Canceled',
}
