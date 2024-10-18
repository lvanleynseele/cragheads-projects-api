import { ObjectId } from 'mongoose';
import Climbs, { Climb, ClimbResponse } from '../../../Models/Climbs/Climb';
import profileService from '../Profile/profile.service';
import gymClimbDataService from './climbs.gymData.service';
import outdoorClimbDataService from './climbs.outdoorData.service';
import { GymClimbData } from '../../../Models/Climbs/GymData';
import { OutdoorClimbData } from '../../../Models/Climbs/OutdoorData';

const findById = async (climbId: string | ObjectId) => {
  const climb = await Climbs.findById(climbId);
  if (!climb) {
    throw new Error('Climb not found');
  }

  if (climb.gymDataIds) {
    const gymData = await Promise.all(
      climb.gymDataIds.map(async gymDataId => {
        return await gymClimbDataService.findById(gymDataId);
      }),
    );

    return { climb, gymData };
  }

  if (climb.outdoorDataIds) {
    const outdoorData = await Promise.all(
      climb.outdoorDataIds.map(async outdoorDataId => {
        return await outdoorClimbDataService.findById(outdoorDataId);
      }),
    );
    return { climb, outdoorData };
  }

  return { climb };
};

const findByProfileId = async (profileId: string | ObjectId) =>
  //: Promise<ClimbResponse[]>
  {
    const profile = await profileService.findProfileById(profileId);

    let climbs: Object[] = [];

    if (profile && profile.climbIds) {
      await Promise.all(
        profile.climbIds.map(async climbId => {
          const climb = await findById(climbId);
          climbs.push(climb);
        }),
      );
    }

    return climbs;
  };

const findAllClimbs = async (): Promise<Climb[]> => {
  return await Climbs.find({}); //collections.climbs.find({}).toArray();
};

const climbsService = {
  findById,
  findByProfileId,
  findAllClimbs,
};

export default climbsService;
