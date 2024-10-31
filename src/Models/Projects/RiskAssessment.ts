import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface RiskAssessment {
  _id?: ObjectId;
  projectId: ObjectId;
  risk: string;
  riskLevel: number;
  mitigation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RiskAssesmentSchema = new Schema<RiskAssessment>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    risk: { type: String, required: true },
    riskLevel: { type: Number, required: true, min: 1, max: 5 },
    mitigation: { type: String, required: true },
  },
  { timestamps: true },
);

RiskAssesmentSchema.plugin(mongooseAggregatePaginate);

export const RiskAssessments = mongoose.model<RiskAssessment>(
  'RiskAssesment',
  RiskAssesmentSchema,
);

RiskAssessments.ensureIndexes();

export default RiskAssessments;
