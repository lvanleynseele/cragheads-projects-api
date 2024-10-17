import { ObjectId } from 'mongoose';
import Milestones, { Milestone } from '../../../Models/Projects/Milestone';
import projectsService from './project.service';
import logger from '../../../utils/logger';

const findById = async (
  milestoneId: string | ObjectId,
): Promise<Milestone | null> => {
  return await Milestones.findById(milestoneId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<Milestone[]> => {
  const project = await projectsService.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const milestones: Milestone[] = [];
  if (project.milestoneIds) {
    await Promise.all(
      project.milestoneIds.map(async milestoneId => {
        const milestone = await findById(milestoneId);
        if (milestone) {
          milestones.push(milestone);
        } else {
          logger.error(`Milestone with id ${milestoneId} not found`);
        }
      }),
    );
  }

  return milestones;
};

const findAll = async (): Promise<Milestone[]> => {
  return await Milestones.find({});
};

const add = async (
  milestone: Milestone,
  projectId: string | ObjectId,
): Promise<Milestone> => {
  await Milestones.validate(milestone);

  const response = await Milestones.create(milestone);
  await projectsService.addMilestone(projectId, response._id);

  return response;
};

const update = async (
  milestoneId: string | ObjectId,
  milestone: Milestone,
): Promise<Milestone | null> => {
  await Milestones.validate(milestone);
  return await Milestones.findByIdAndUpdate(milestoneId, milestone);
};

const remove = async (
  projectId: string | ObjectId,
  milestoneId: string | ObjectId,
): Promise<Milestone | null> => {
  await projectsService.removeMilestone(projectId, milestoneId);

  return await Milestones.findByIdAndDelete(milestoneId);
};

const milestonesService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default milestonesService;
