import express from 'express';
import logger from '../../utils/logger';
import Profiles from '../../Models/Profile/Profile';
import projectRouter from './project.router';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});
mainRouter.use(express.json());
mainRouter.use('/projects', projectRouter);

mainRouter.get('/profile', async (req, res) => {
  try {
    const response = await Profiles.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default mainRouter;
