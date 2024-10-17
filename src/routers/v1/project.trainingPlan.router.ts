import express from 'express';
import trainingPlansService from '../../services/v1/Project/project.trainingPlan.service';

const trainingPlanRouter = express.Router();
trainingPlanRouter.use(express.json());

trainingPlanRouter.get('/by-id/:trainingPlanId', async (req, res) => {
  try {
    const trainingPlanId = req.params.trainingPlanId;
    if (!trainingPlanId) {
      res.status(400).send('trainingPlanId is required');
    }

    const trainingPlan = await trainingPlansService.findById(trainingPlanId);
    res.status(200).send(trainingPlan);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingPlanRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const trainingPlans = await trainingPlansService.findByProjectId(projectId);

    res.status(200).send(trainingPlans);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingPlanRouter.get('/', async (req, res) => {
  try {
    const trainingPlans = await trainingPlansService.findAll();
    res.status(200).send(trainingPlans);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingPlanRouter.post('/:projectId', async (req, res) => {
  try {
    const trainingPlan = req.body.trainingPlan;
    const projectId = req.params.projectId;
    if (!trainingPlan) {
      res.status(400).send('Training Plan data is required');
    }

    const result = await trainingPlansService.add(trainingPlan, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingPlanRouter.put('/:trainingPlanId', async (req, res) => {
  try {
    const trainingPlan = req.body.trainingPlan;
    const trainingPlanId = req.params.trainingPlanId;
    if (!trainingPlan) {
      res.status(400).send('Training Plan data is required');
    }

    const result = await trainingPlansService.update(
      trainingPlanId,
      trainingPlan,
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingPlanRouter.delete('/:trainingPlanId/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const trainingPlanId = req.params.trainingPlanId;
    if (!projectId || !trainingPlanId) {
      res.status(400).send('Project and Training Plan Ids are required');
    }

    const result = await trainingPlansService.remove(trainingPlanId, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default trainingPlanRouter;
