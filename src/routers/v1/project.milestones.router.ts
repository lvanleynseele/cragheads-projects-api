import express from 'express';
import milestonesService from '../../services/v1/Project/project.milestones.service';

const milestonesRouter = express.Router();
milestonesRouter.use(express.json());

milestonesRouter.get('/by-id/:milestoneId', async (req, res) => {
  try {
    const milestoneId = req.params.milestoneId;
    if (!milestoneId) {
      res.status(400).send('milestoneId is required');
    }

    const milestone = await milestonesService.findById(milestoneId);
    res.status(200).send(milestone);
  } catch (error) {
    res.status(500).send(error);
  }
});

milestonesRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const milestones = await milestonesService.findByProjectId(projectId);

    res.status(200).send(milestones);
  } catch (error) {
    res.status(500).send(error);
  }
});

milestonesRouter.get('/', async (req, res) => {
  try {
    const milestones = await milestonesService.findAll();
    res.status(200).send(milestones);
  } catch (error) {
    res.status(500).send(error);
  }
});

milestonesRouter.post('/:projectId', async (req, res) => {
  try {
    const milestone = req.body.milestone;
    const projectId = req.params.projectId;
    if (!milestone) {
      res.status(400).send('Milestone data is required');
    }

    const result = await milestonesService.add(milestone, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

milestonesRouter.put('/:milestoneId', async (req, res) => {
  try {
    const milestone = req.body.milestone;
    const milestoneId = req.params.milestoneId;
    if (!milestone) {
      res.status(400).send('Milestone data is required');
    }

    const result = await milestonesService.update(milestoneId, milestone);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

milestonesRouter.delete('/:projectId/:milestoneId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const milestoneId = req.params.milestoneId;
    if (!projectId || !milestoneId) {
      res.status(400).send('Project and Milestone Ids are required');
    }

    const result = await milestonesService.remove(projectId, milestoneId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default milestonesRouter;
