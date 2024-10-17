import { ObjectId } from 'mongoose';

export interface Project {
  _id: ObjectId;
  name: string;
  description: string;
  isPublic: boolean; // either can be a personal project, or can share and have leaderboard

  //person project belongs to?
  //muultiple people can do same project, but this tracks for a specific user
  ownerId: ObjectId;

  //progress
  completed: boolean;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;

  //project goal
  plannedCompletionDate?: Date;
  areaIds?: ObjectId[];
  routeIds?: ObjectId[];
  workoutIds?: ObjectId[];

  //training plan for project
  trainingPlanIds?: ObjectId[];
  milestoneIds?: ObjectId[];

  //what you need to accomplish project
  //could be great for advertisers/marketing purposes
  gearIds?: ObjectId[];
  lodgingIds?: ObjectId[];
  expenses?: number;

  //progress towarsd project
  climbIds?: string[];
  trainingIds?: string[];
  betaIds?: string[]; //people who have done the project before
  noteIds?: string[]; //notes on the project

  //contributors
  memberIds?: ObjectId[]; //partners on project
  inviteIds?: ObjectId[]; //people invited to project

  //content
  images?: string[];
  videos?: string[];
  links?: string[];
  discussion: string[];
  tags?: string[];
  riskAssessment?: {
    risk: string;
    mitigationPlan: string;
  }[];

  //meta
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
}

//project leaderboards

//project training plans

// open up a project forum for discussion and help on the project

//invite people to a project
