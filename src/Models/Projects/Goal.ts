import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Goal {
  _id: ObjectId;
  type: GoalTypes;
  title: string;
  description: string;
  areaId?: ObjectId;
  routeIds?: ObjectId[];
  workoutId?: ObjectId;
}

enum GoalTypes {
  CLIMBING = 'Climbing',
  TRAINING = 'Training',
  OTHER = 'Other',
}

const GoalSchema = new Schema<Goal>(
  {
    type: {
      type: String,
      enum: Object.values(GoalTypes),
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      required: false,
    },
    routeIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Route',
      required: false,
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

GoalSchema.plugin(mongooseAggregatePaginate);

const Goals = mongoose.model<Goal>('Goal', GoalSchema);

Goals.ensureIndexes();

export default Goals;
