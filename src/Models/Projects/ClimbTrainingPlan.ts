import { ObjectId } from 'mongoose';
import { TrainingPeriod } from '../../constants/enums';

export interface ClimbTrainingPlan {
  _id: ObjectId;
  isGymPlan: boolean;
  numberOfCLimbs: number;
  period: TrainingPeriod;
  minDifficulty?: number;
  maxDifficulty?: number;
  areaId?: ObjectId;
  routeIds?: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
