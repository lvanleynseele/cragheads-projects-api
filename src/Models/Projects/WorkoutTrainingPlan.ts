import { ObjectId } from 'mongoose';
import { TrainingPeriod, WorkoutType } from '../../constants/enums';

export interface WorkoutTrainingPlan {
  _id: ObjectId;
  projectId: ObjectId;
  workoutType: WorkoutType;
  armWorkoutIds?: ObjectId[];
  legWorkoutIds?: ObjectId[];
  campusBoardWorkoutIds?: ObjectId[];
  hangboardWorkoutIds?: ObjectId[];
  cardioWorkoutIds?: ObjectId[];
  numberOfWorkouts: number;
  period: TrainingPeriod;
  createdAt: Date;
  updatedAt: Date;
}
