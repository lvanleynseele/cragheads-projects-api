import { ObjectId } from 'mongoose';
import Projects, { Project } from '../../../Models/Projects/Project';
import profileService from '../Profile/profile.service';
import logger from '../../../utils/logger';

const findById = async (id: string | ObjectId) => {
  return await Projects.findById(id);
};

const findByIdWithFields = async (id: string | ObjectId) => {
  const project = await Projects.findById(id);

  //call other services to get the data
  //add data to project object

  return project;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  let projects: Object[] = [];
  if (profile && profile.projectIds) {
    await Promise.all(
      profile.projectIds.map(async projectId => {
        const project = await findById(projectId);
        if (project) {
          projects.push(project);
        } else {
          logger.error(`Project with id ${projectId} not found`);
        }
      }),
    );
  }

  return projects;
};

const findAll = async () => {
  return await Projects.find({});
};

const add = async (project: Project, profileId: string | ObjectId) => {
  await Projects.validate(project);

  const response = await Projects.create(project);

  await profileService.addProject(profileId, response._id);

  await addMember(response._id, profileId);

  return response;
};

const update = async (id: string | ObjectId, project: Project) => {
  await Projects.validate(project);

  return await Projects.findByIdAndUpdate(id, project);
};

const remove = async (id: string | ObjectId, profileId: string | ObjectId) => {
  // await profileService.removeProject(profileId, id);

  return await Projects.findByIdAndDelete(id);
};

const updateProjectStatus = async (id: string, status: string) => {
  return await Projects.findByIdAndUpdate(id, { status });
};

const markProjectComplete = async (id: string) => {
  return await Projects.findByIdAndUpdate(id, { completed: true });
};

// methods from here on are for managing relationships between models

const addGoal = async (id: string | ObjectId, goalId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { goalIds: goalId },
  });

  return result;
};

const removeGoal = async (id: string | ObjectId, goalId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { goalIds: goalId } as any,
  });

  return result;
};

const addTrainingPlan = async (
  id: string | ObjectId,
  trainingPlanId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { trainingPlanIds: trainingPlanId },
  });

  return result;
};

const removeTrainingPlan = async (
  id: string | ObjectId,
  trainingPlanId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { trainingPlanIds: trainingPlanId } as any,
  });

  return result;
};

const addMilestone = async (
  id: string | ObjectId,
  milestoneId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { milestoneIds: milestoneId },
  });

  return result;
};

const removeMilestone = async (
  id: string | ObjectId,
  milestoneId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { milestoneIds: milestoneId } as any,
  });

  return result;
};

const addRiskAssessment = async (
  id: string | ObjectId,
  riskAssessmentId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { riskAssessmentIds: riskAssessmentId },
  });

  return result;
};

const removeRiskAssessment = async (
  id: string | ObjectId,
  riskAssessmentId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { riskAssessmentIds: riskAssessmentId } as any,
  });

  return result;
};

const addGear = async (id: string | ObjectId, gearId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { gearIds: gearId },
  });

  return result;
};

const removeGear = async (id: string | ObjectId, gearId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { gearIds: gearId } as any,
  });

  return result;
};

const addExpense = async (id: string | ObjectId, expense: number) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $inc: { expenses: expense },
  });

  return result;
};

const removeExpense = async (id: string | ObjectId, expense: number) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $inc: { expenses: -expense },
  });

  return result;
};

const addClimb = async (id: string | ObjectId, climbId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { climbIds: climbId },
  });

  return result;
};

const removeClimb = async (
  id: string | ObjectId,
  climbId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { climbIds: climbId } as any,
  });

  return result;
};

const addTraining = async (
  id: string | ObjectId,
  trainingId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { trainingIds: trainingId },
  });

  return result;
};

const removeTraining = async (
  id: string | ObjectId,
  trainingId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { trainingIds: trainingId } as any,
  });

  return result;
};

const addBeta = async (id: string | ObjectId, betaId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { betaIds: betaId },
  });

  return result;
};

const removeBeta = async (id: string | ObjectId, betaId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { betaIds: betaId } as any,
  });

  return result;
};

const addNote = async (id: string | ObjectId, noteId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { noteIds: noteId },
  });

  return result;
};

const removeNote = async (id: string | ObjectId, noteId: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { noteIds: noteId } as any,
  });

  return result;
};

const addMember = async (
  id: string | ObjectId,
  memberId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { memberIds: memberId },
  });

  return result;
};

const removeMember = async (
  id: string | ObjectId,
  memberId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { memberIds: memberId } as any,
  });

  return result;
};

const addInvite = async (
  id: string | ObjectId,
  inviteId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { inviteIds: inviteId },
  });

  return result;
};

const removeInvite = async (
  id: string | ObjectId,
  inviteId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { inviteIds: inviteId } as any,
  });

  return result;
};

const addImage = async (id: string | ObjectId, image: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { images: image },
  });

  return result;
};

const removeImage = async (id: string | ObjectId, image: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { images: image } as any,
  });

  return result;
};

const addVideo = async (id: string | ObjectId, video: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { videos: video },
  });

  return result;
};

const removeVideo = async (id: string | ObjectId, video: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { videos: video } as any,
  });

  return result;
};

const addLink = async (id: string | ObjectId, link: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { links: link },
  });

  return result;
};

const removeLink = async (id: string | ObjectId, link: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { links: link } as any,
  });

  return result;
};

const addDiscussionComment = async (
  id: string | ObjectId,
  commentId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { discussionComments: commentId },
  });

  return result;
};

const removeDiscussionComment = async (
  id: string | ObjectId,
  commentId: string | ObjectId,
) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { discussionComments: commentId } as any,
  });

  return result;
};

const addTag = async (id: string | ObjectId, tag: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $push: { tags: tag },
  });

  return result;
};

const removeTag = async (id: string | ObjectId, tag: string | ObjectId) => {
  const result = await Projects.findByIdAndUpdate(id, {
    $pull: { tags: tag } as any,
  });

  return result;
};

const projectsService = {
  findById,
  findByIdWithFields,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
  updateProjectStatus,
  markProjectComplete,

  addGoal,
  removeGoal,
  addTrainingPlan,
  removeTrainingPlan,
  addMilestone,
  removeMilestone,
  addRiskAssessment,
  removeRiskAssessment,
  addGear,
  removeGear,
  addExpense,
  removeExpense,
  addClimb,
  removeClimb,
  addTraining,
  removeTraining,
  addBeta,
  removeBeta,
  addNote,
  removeNote,
  addMember,
  removeMember,
  addInvite,
  removeInvite,
  addImage,
  removeImage,
  addVideo,
  removeVideo,
  addLink,
  removeLink,
  addDiscussionComment,
  removeDiscussionComment,
  addTag,
  removeTag,
};

export default projectsService;
