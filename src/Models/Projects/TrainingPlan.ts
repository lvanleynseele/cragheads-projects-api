import { ObjectId } from 'mongoose';

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

export interface TrainingPlanClimb {
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

export interface TrainingPlanWorkout {
  _id: ObjectId;
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

enum TrainingPeriod {
  'Day',
  'Week',
  'Month',
  'Year',
}

enum TrainingType {
  'Climbing',
  'Workout',
}

enum WorkoutType {
  ARM = 'Arm',
  LEG = 'Leg',
  CAMPUS_BOARD = 'Campus Board',
  HANGBOARD = 'Hangboard',
  CARDIO = 'Cardio',
}
