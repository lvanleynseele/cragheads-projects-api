import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface ProjectInvite {
  _id?: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  invitedBy: ObjectId;
  status: InviteStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum InviteStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  Canceled = 'Canceled',
}

const ProjectInviteSchema = new Schema<ProjectInvite>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      index: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(InviteStatus),
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

ProjectInviteSchema.plugin(mongooseAggregatePaginate);

const ProjectInvites = mongoose.model<ProjectInvite>(
  'ProjectInvite',
  ProjectInviteSchema,
);

ProjectInvites.ensureIndexes();

export default ProjectInvites;
