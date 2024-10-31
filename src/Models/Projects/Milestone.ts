import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Milestone {
  _id?: ObjectId;
  projectId: ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MilestoneSchema = new Schema<Milestone>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
      index: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

//idk if I need this in aggregation
// MilestoneSchema.plugin(mongooseAggregatePaginate);

const Milestones = mongoose.model<Milestone>('Milestone', MilestoneSchema);

Milestones.ensureIndexes();

export default Milestones;
