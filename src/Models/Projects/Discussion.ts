import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Discussion {
  _id: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  username: string;
  comment: string;
  date: Date;
}

const DiscussionSchema = new Schema<Discussion>(
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

DiscussionSchema.plugin(mongooseAggregatePaginate);

const Discussions = mongoose.model<Discussion>('Discussion', DiscussionSchema);

Discussions.ensureIndexes();

export default Discussions;
