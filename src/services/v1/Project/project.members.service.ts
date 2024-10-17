import { ObjectId } from 'mongoose';
import projectsService from './project.service';

const isMember = async (
  projectId: string | ObjectId,
  userId: string | ObjectId,
): Promise<boolean> => {
  const project = await projectsService.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  if (!project.memberIds) {
    throw new Error('Project does not have any members');
  }

  return project.memberIds?.includes(userId as ObjectId);
};

const findByProjectId = async (projectId: string | ObjectId) => {
  const project = await projectsService.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  return project.memberIds;
};

const findAll = async () => {
  return await projectsService.findAll();
};

const membersService = {
  isMember,
  findByProjectId,
  findAll,
};

export default membersService;
