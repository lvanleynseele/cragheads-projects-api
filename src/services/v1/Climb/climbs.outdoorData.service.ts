import { ObjectId } from 'mongoose';
import OutdoorClimbDatas, {
  OutdoorClimbData,
} from '../../../Models/Climbs/OutdoorData';

const findById = async (climbId: string | ObjectId) => {
  return await OutdoorClimbDatas.findById(climbId);
};

const findByProfileId = async (userId: string | ObjectId) => {
  return await OutdoorClimbDatas.find({ userId });
};

const findAll = async () => {
  return await OutdoorClimbDatas.find({});
};

const outdoorClimbDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default outdoorClimbDataService;
