import { ObjectId } from 'mongoose';
import RiskAssessments, {
  RiskAssessment,
} from '../../../Models/Projects/RiskAssessment';
import projectsService from './project.service';

const findById = async (
  id: string | ObjectId,
): Promise<RiskAssessment | null> => {
  return await RiskAssessments.findById(id);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<RiskAssessment[]> => {
  return await RiskAssessments.find({ projectId });
};

const findAll = async (): Promise<RiskAssessment[]> => {
  return await RiskAssessments.find({});
};

const add = async (
  riskAssessment: RiskAssessment,
  projectId: string | ObjectId,
): Promise<RiskAssessment> => {
  await RiskAssessments.validate(riskAssessment);

  const response = await RiskAssessments.create(riskAssessment);
  await projectsService.addRiskAssessment(projectId, response._id);

  return response;
};

const update = async (
  id: string | ObjectId,
  riskAssessment: RiskAssessment,
): Promise<RiskAssessment | null> => {
  await RiskAssessments.validate(riskAssessment);

  return await RiskAssessments.findByIdAndUpdate(id, riskAssessment);
};

const remove = async (
  id: string | ObjectId,
  projectId: string | ObjectId,
): Promise<RiskAssessment | null> => {
  await projectsService.removeRiskAssessment(projectId, id);

  return await RiskAssessments.findByIdAndDelete(id);
};

const riskAssessmentService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default riskAssessmentService;
