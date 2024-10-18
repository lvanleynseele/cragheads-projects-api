import { ObjectId } from 'mongoose';
import LegWorkoutDatas, {
  LegWorkoutData,
} from '../../../Models/Training/LegWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<LegWorkoutData | null> => {
  return await LegWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<LegWorkoutData[] | null> => {
  return await LegWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await LegWorkoutDatas.find({});
};

const legDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default legDataService;
