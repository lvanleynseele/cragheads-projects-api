import { ObjectId } from 'mongoose';
import Goals, { Goal } from '../../../Models/Projects/Goal';
import Projects from '../../../Models/Projects/Project';
import logger from '../../../utils/logger';
import projectsService from './project.service';

const findById = async (goalId: string | ObjectId): Promise<Goal | null> => {
  return await Goals.findById(goalId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<Goal[]> => {
  const project = await Projects.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const goals: Goal[] = [];

  if (project.goalIds) {
    await Promise.all(
      project.goalIds.map(async goalId => {
        const goal = await findById(goalId);
        if (goal) {
          goals.push(goal);
        } else {
          logger.error(`Goal with id ${goalId} not found`);
        }
      }),
    );
  }

  return goals;
};

const findAll = async (): Promise<Goal[]> => {
  return await Goals.find({});
};

//area, routes, or workout will be in body of request
const add = async (goal: Goal, projectId: string | ObjectId): Promise<Goal> => {
  await Goals.validate(goal);

  const response = await Goals.create(goal);
  await projectsService.addGoal(projectId, response._id);

  return response;
};

const update = async (
  goalId: string | ObjectId,
  goal: Goal,
): Promise<Goal | null> => {
  await Goals.validate(goal);
  return await Goals.findByIdAndUpdate(goalId, goal);
};

const remove = async (
  projectId: string | ObjectId,
  goalId: string | ObjectId,
): Promise<Goal | null> => {
  const goal = await Goals.findByIdAndDelete(goalId);
  if (!goal) {
    throw new Error('Goal not found');
  }

  await projectsService.removeGoal(projectId, goalId);

  return goal;
};

const goalsService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default goalsService;
