import { ObjectId } from 'mongoose';
import profileService from '../Profile/profile.service';
import TrainingDatas, {
  TrainingData,
  TrainingDataResponse,
} from '../../../Models/Training/Train';
import armDataService from './train.armWorkout.service';
import legDataService from './train.legWorkout.service';
import campusboardDataService from './train.campusboardWorkout.service';
import hangboardDataService from './train.hangboardWorkout.service';
import cardioDataService from './train.cardioWorkout.service';

const findById = async (trainingId: string | ObjectId) => {
  const training = await TrainingDatas.findById(trainingId);
  if (!training) {
    throw new Error('Climb not found');
  }

  const response: {
    train: typeof training;
    armData: any[];
    campusboardData: any[];
    hangboardData: any[];
    cardioData: any[];
    legData: any[];
  } = {
    train: training,
    armData: [],
    campusboardData: [],
    hangboardData: [],
    cardioData: [],
    legData: [],
  };

  if (training.armDataIds) {
    const armData = await Promise.all(
      training.armDataIds.map(async armDataId => {
        return await armDataService.findById(armDataId);
      }),
    );

    response.armData = armData;
  }

  if (training.campusboardDataIds) {
    const campusboardData = await Promise.all(
      training.campusboardDataIds.map(async campusboardDataId => {
        return await campusboardDataService.findById(campusboardDataId);
      }),
    );
    response.campusboardData = campusboardData;
  }

  if (training.hangboardDataIds) {
    const hangboardData = await Promise.all(
      training.hangboardDataIds.map(async hangboardDataId => {
        return await hangboardDataService.findById(hangboardDataId);
      }),
    );
    response.hangboardData = hangboardData;
  }

  if (training.cardioDataIds) {
    const cardioData = await Promise.all(
      training.cardioDataIds.map(async cardioDataId => {
        return await cardioDataService.findById(cardioDataId);
      }),
    );
    response.cardioData = cardioData;
  }

  if (training.legDataIds) {
    const legData = await Promise.all(
      training.legDataIds.map(async legDataId => {
        return await legDataService.findById(legDataId);
      }),
    );
    response.legData = legData;
  }

  return response;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  let trains: TrainingDataResponse[] = [];

  if (profile && profile.trainingIds) {
    await Promise.all(
      profile.trainingIds.map(async trainId => {
        const train = await findById(trainId);
        trains.push(train);
      }),
    );
  }

  return trains;
};

const findAllTrains = async (): Promise<TrainingData[]> => {
  return await TrainingDatas.find({});
};

const trainingService = {
  findById,
  findByProfileId,
  findAllTrains,
};

export default trainingService;
