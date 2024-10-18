import { ObjectId } from 'mongoose';
import GymClimbDatas, { GymClimbData } from '../../../Models/Climbs/GymData';

const findById = async (climbId: string | ObjectId) => {
  return await GymClimbDatas.findById(climbId);
};

const findByProfileId = async (userId: string | ObjectId) => {
  return await GymClimbDatas.find({ userId });
};

const findAll = async () => {
  return await GymClimbDatas.find({});
};

const gymClimbDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default gymClimbDataService;
