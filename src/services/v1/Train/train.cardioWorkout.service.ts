import { ObjectId } from 'mongoose';
import CardioWorkoutDatas, {
  CardioWorkoutData,
} from '../../../Models/Training/CardioData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CardioWorkoutData | null> => {
  return await CardioWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<CardioWorkoutData[]> => {
  return await CardioWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await CardioWorkoutDatas.find({});
};

const cardioDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default cardioDataService;
