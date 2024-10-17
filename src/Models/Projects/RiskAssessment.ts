import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface RiskAssessment {
  _id: ObjectId;
  risk: string;
  riskLevel: number;
  mitigation: string;
  createdAt: Date;
  updatedAt: Date;
}

const RiskAssesmentSchema = new Schema<RiskAssessment>(
  {
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
export default RiskAssessments;
