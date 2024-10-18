import { ObjectId } from 'mongoose';
import ArmWorkoutDatas, {
  ArmWorkoutData,
} from '../../../Models/Training/ArmWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<ArmWorkoutData | null> => {
  return await ArmWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<ArmWorkoutData[]> => {
  return await ArmWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await ArmWorkoutDatas.find({});
};

const armDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default armDataService;
