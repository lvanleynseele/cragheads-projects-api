import { ObjectId } from 'mongoose';
import HangBoardDatas, {
  HangBoardData,
} from '../../../Models/Training/HangboardData';

const findById = async (
  trainId: string | ObjectId,
): Promise<HangBoardData | null> => {
  return await HangBoardDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<HangBoardData[]> => {
  return await HangBoardDatas.find({ userId });
};

const findAll = async () => {
  return await HangBoardDatas.find({});
};

const hangboardDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default hangboardDataService;
