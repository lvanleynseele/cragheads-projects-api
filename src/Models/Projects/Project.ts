import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Project {
  _id: ObjectId;
  name: string;
  description: string;
  isPublic: boolean; // either can be a personal project, or can share and have leaderboard
  isPublished: boolean; // user can create a project without making it public
  //project goal
  plannedCompletionDate?: Date;
  goalIds?: ObjectId[];
  //progress
  completed: boolean;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  //panning
  trainingPlanIds?: ObjectId[];
  milestoneIds?: ObjectId[];
  riskAssessmentIds?: ObjectId[];
  //what you need to accomplish project
  //could be great for advertisers/marketing purposes
  gearIds?: ObjectId[];
  // lodgingIds?: ObjectId[];
  expenses?: number;
  //progress towarsd project
  climbIds?: ObjectId[];
  trainingIds?: ObjectId[];
  betaIds?: ObjectId[]; //people who have done the project before //still need service
  noteIds?: ObjectId[]; //notes on the project //still need service
  //contributors
  memberIds?: ObjectId[]; //partners on project
  inviteIds?: ObjectId[]; //people invited to project
  //content
  images?: string[];
  videos?: string[];
  links?: string[];
  discussionIds: ObjectId[]; //may want to copy comment schema for this
  tags?: string[];
  //meta
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  PLANING = 'Planning',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
}

const ProjectSchema = new Schema<Project>(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, required: false, index: true, default: false },
    isPublished: {
      type: Boolean,
      required: false,
      index: true,
      default: false,
    },
    plannedCompletionDate: {
      type: Date,
      required: false,
      default: null,
      index: true,
    },
    goalIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Goal',
      required: false,
      default: [],
      index: true,
    },
    completed: { type: Boolean, required: false, default: false, index: true },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      required: false,
      default: ProjectStatus.PLANING,
      index: true,
    },
    startDate: { type: Date, required: false, default: Date.now, index: true },
    endDate: { type: Date, required: false, default: null },
    trainingPlanIds: {
      type: [Schema.Types.ObjectId],
      ref: 'TrainingPlan',
      required: false,
      default: [],
    },
    milestoneIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Milestone',
      required: false,
      default: [],
    },
    riskAssessmentIds: {
      type: [Schema.Types.ObjectId],
      ref: 'RiskAssessment',
      required: false,
      default: [],
    },
    gearIds: { type: [Schema.Types.ObjectId], required: false, default: [] },
    expenses: { type: Number, required: false, default: 0 },
    climbIds: { type: [Schema.Types.ObjectId], required: false, default: [] },
    trainingIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    betaIds: { type: [Schema.Types.ObjectId], required: false, default: [] },
    noteIds: { type: [Schema.Types.ObjectId], required: false, default: [] },
    memberIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Profile',
      required: false,
      default: [],
    },
    inviteIds: { type: [Schema.Types.ObjectId], required: false, default: [] },
    images: { type: [String], required: false, default: [] },
    videos: { type: [String], required: false, default: [] },
    links: { type: [String], required: false, default: [] },
    discussionIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    tags: { type: [String] },
    createdBy: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

ProjectSchema.plugin(mongooseAggregatePaginate);

const Projects = mongoose.model<Project>('Project', ProjectSchema);

Projects.ensureIndexes();

export default Projects;
