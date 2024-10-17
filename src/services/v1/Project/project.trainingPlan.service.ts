import { ObjectId } from 'mongoose';
import TrainingPlans, {
  TrainingPlan,
} from '../../../Models/Projects/TrainingPlan';
import Projects from '../../../Models/Projects/Project';
import logger from '../../../utils/logger';
import projectsService from './project.service';

const findById = async (
  trainingPlanId: string | ObjectId,
): Promise<TrainingPlan | null> => {
  return await TrainingPlans.findById(trainingPlanId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<TrainingPlan[]> => {
  const project = await Projects.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const plans: TrainingPlan[] = [];

  if (project.trainingPlanIds) {
    await Promise.all(
      project.trainingPlanIds.map(async planId => {
        const plan = await findById(planId);
        if (plan) {
          plans.push(plan);
        } else {
          logger.error(`Goal with id ${planId} not found`);
        }
      }),
    );
  }

  return plans;
};

const findAll = async (): Promise<TrainingPlan[]> => {
  return await TrainingPlans.find({});
};

const add = async (
  plan: TrainingPlan,
  projectId: string | ObjectId,
): Promise<TrainingPlan> => {
  await TrainingPlans.validate(plan);

  const response = await TrainingPlans.create(plan);
  await projectsService.addTrainingPlan(projectId, response._id);

  return response;
};

const update = async (
  planId: string | ObjectId,
  plan: TrainingPlan,
): Promise<TrainingPlan | null> => {
  await TrainingPlans.validate(plan);
  return await TrainingPlans.findByIdAndUpdate(planId, plan);
};

const remove = async (
  projectId: string | ObjectId,
  planId: string | ObjectId,
): Promise<TrainingPlan | null> => {
  await projectsService.removeTrainingPlan(projectId, planId);

  return await TrainingPlans.findByIdAndDelete(planId);
};

const trainingPlansService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default trainingPlansService;
