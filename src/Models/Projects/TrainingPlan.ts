import mongoose, { ObjectId, Schema } from 'mongoose';
import { TrainingType } from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface TrainingPlan {
  _id: ObjectId;
  name: string;
  description: string;
  trainingType: TrainingType;
  climbingPlanIds?: ObjectId[];
  workoutPlanIds?: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TrainingPlanSchema = new Schema<TrainingPlan>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trainingType: {
      type: String,
      enum: Object.values(TrainingType),
      required: true,
    },
    climbingPlanIds: {
      type: Schema.Types.ObjectId,
      ref: 'ClimbTrainingPlan',
      required: false,
    },
    workoutPlanIds: {
      type: Schema.Types.ObjectId,
      ref: 'WorkoutTrainingPlan',
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

TrainingPlanSchema.plugin(mongooseAggregatePaginate);

const TrainingPlans = mongoose.model<TrainingPlan>(
  'TrainingPlan',
  TrainingPlanSchema,
);

export default TrainingPlans;
