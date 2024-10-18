import { ObjectId } from 'mongoose';

import CampusBoardDatas, {
  CampusBoardData,
} from '../../../Models/Training/CampusBoardData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CampusBoardData | null> => {
  return await CampusBoardDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<CampusBoardData[]> => {
  return await CampusBoardDatas.find({ userId });
};

const findAll = async () => {
  return await CampusBoardDatas.find({});
};

const campusboardDataService = {
  findById,
  findByProfileId,
  findAll,
};

export default campusboardDataService;
