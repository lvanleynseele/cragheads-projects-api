import { ObjectId } from 'mongoose';
import ProjectInvites, {
  ProjectInvite,
} from '../../../Models/Projects/ProjectInvite';
import projectsService from './project.service';

const findById = async (
  inviteId: string | ObjectId,
): Promise<ProjectInvite | null> => {
  return await ProjectInvites.findById(inviteId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<ProjectInvite[]> => {
  return await ProjectInvites.find({ projectId }, { status: 'Pending' });
};

const findByUserId = async (
  userId: string | ObjectId,
): Promise<ProjectInvite[]> => {
  return await ProjectInvites.find({ userId }, { status: 'Pending' });
};

const findAll = async (): Promise<ProjectInvite[]> => {
  return await ProjectInvites.find({});
};

const add = async (
  invite: ProjectInvite,
  projectId: string | ObjectId,
): Promise<ProjectInvite> => {
  const response = await ProjectInvites.create({
    ...invite,
    projectId,
  });

  await projectsService.addInvite(projectId, response._id);

  return response;
};

const update = async (
  invite: ProjectInvite,
  inviteId: string | ObjectId,
): Promise<ProjectInvite | null> => {
  return await ProjectInvites.findByIdAndUpdate(inviteId, invite, {
    new: true,
  });
};

const remove = async (
  projectId: string | ObjectId,
  inviteId: string | ObjectId,
): Promise<ProjectInvite | null> => {
  const result = await ProjectInvites.findByIdAndUpdate(inviteId, {
    status: 'Canceled',
  });

  await projectsService.removeInvite(projectId, inviteId);

  return result;
};

const acceptInvite = async (inviteId: string | ObjectId): Promise<void> => {
  const invite = await ProjectInvites.findByIdAndUpdate(inviteId, {
    status: 'Accepted',
  });
  if (!invite) {
    throw new Error('Invite not found');
  }

  await projectsService.addMember(invite.projectId, invite.userId);
};

const declineInvite = async (inviteId: string | ObjectId): Promise<void> => {
  const invite = await ProjectInvites.findByIdAndUpdate(inviteId, {
    status: 'Declined',
  });
  if (!invite) {
    throw new Error('Invite not found');
  }
};

const projectInvitesService = {
  findById,
  findByProjectId,
  findByUserId,
  findAll,
  add,
  update,
  remove,
  acceptInvite,
  declineInvite,
};

export default projectInvitesService;
