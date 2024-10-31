import { ObjectId } from 'mongoose';
import Milestones, { Milestone } from '../../../Models/Projects/Milestone';
import projectsService from './project.service';

const findById = async (
  milestoneId: string | ObjectId,
): Promise<Milestone | null> => {
  return await Milestones.findById(milestoneId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<Milestone[]> => {
  return await Milestones.find({ projectId });
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
