import mongoose, { ObjectId, Schema } from 'mongoose';
import { TrainingType } from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface TrainingPlan {
  _id: ObjectId;
  projectId: ObjectId;
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
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
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

TrainingPlans.ensureIndexes();

export default TrainingPlans;
