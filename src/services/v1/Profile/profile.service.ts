import { ObjectId, Schema } from 'mongoose';
import Profiles, { Profile } from '../../../Models/Profile/Profile';

const findProfileById = async (
  profileId: string | ObjectId,
): Promise<Profile | null> => {
  try {
    const profile = (await Profiles.findById(profileId)) as unknown as Profile;

    return profile;
  } catch (error) {
    throw error;
  }
};

const addProject = async (
  profileId: string | ObjectId,
  projectId: string | ObjectId,
) => {
  try {
    const response = await Profiles.findByIdAndUpdate(profileId, {
      $addToSet: { projectIds: projectId },
    });
  } catch (error) {
    throw error;
  }
};

const removeProject = async (
  profileId: string | ObjectId,
  projectId: string | ObjectId,
) => {
  try {
    const response = await Profiles.findByIdAndUpdate(profileId, {
      $pull: { projectIds: projectId } as any,
    });
  } catch (error) {
    throw error;
  }
};

const profileService = {
  findProfileById,
  addProject,
};

export default profileService;
