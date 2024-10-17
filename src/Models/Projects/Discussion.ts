import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface DiscussionComment {
  _id: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  username: string;
  comment: string;
  date: Date;
}

const DiscussionCommentSchema = new Schema<DiscussionComment>(
  {
    _id: Schema.Types.ObjectId,
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      index: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

DiscussionCommentSchema.plugin(mongooseAggregatePaginate);

const Comments = mongoose.model<DiscussionComment>(
  'DiscussionComment',
  DiscussionCommentSchema,
);

export default Comments;
