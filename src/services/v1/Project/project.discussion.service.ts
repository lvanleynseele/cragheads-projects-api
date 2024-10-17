import { ObjectId } from 'mongoose';
import Discussions, { Discussion } from '../../../Models/Projects/Discussion';
import projectsService from './project.service';

const findById = async (
  discussionId: string | ObjectId,
): Promise<Discussion | null> => {
  return await Discussions.findById(discussionId);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<Discussion[]> => {
  return await Discussions.find({ projectId });
};

const findAll = async (): Promise<Discussion[]> => {
  return await Discussions.find({});
};

const add = async (
  discussion: Discussion,
  projectId: string | ObjectId,
): Promise<Discussion> => {
  await Discussions.validate(discussion);

  const response = await Discussions.create(discussion);
  await projectsService.addDiscussionComment(projectId, response._id);

  return response;
};

const update = async (
  discussionId: string | ObjectId,
  discussion: Discussion,
): Promise<Discussion | null> => {
  await Discussions.validate(discussion);

  return await Discussions.findByIdAndUpdate(discussionId, discussion, {
    new: true,
  });
};

const remove = async (
  discussionId: string | ObjectId,
): Promise<Discussion | null> => {
  return await Discussions.findByIdAndDelete(discussionId);
};

const discussionService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default discussionService;
