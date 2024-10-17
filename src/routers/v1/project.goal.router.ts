import express from 'express';
import goalsService from '../../services/v1/Project/project.goals.service';

const goalsRouter = express.Router();
goalsRouter.use(express.json());

goalsRouter.get('/by-id/:goalId', async (req, res) => {
  try {
    const goalId = req.params.goalId;
    if (!goalId) {
      res.status(400).send('goalId is required');
    }

    const goal = await goalsService.findById(goalId);
    res.status(200).send(goal);
  } catch (error) {
    res.status(500).send(error);
  }
});

goalsRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const goals = await goalsService.findByProjectId(projectId);

    res.status(200).send(goals);
  } catch (error) {
    res.status(500).send(error);
  }
});

goalsRouter.get('/', async (req, res) => {
  try {
    const goals = await goalsService.findAll();
    res.status(200).send(goals);
  } catch (error) {
    res.status(500).send(error);
  }
});

goalsRouter.post('/:projectId', async (req, res) => {
  try {
    const goal = req.body.goal;
    const projectId = req.params.projectId;
    if (!goal) {
      res.status(400).send('Goal data is required');
    }

    const result = await goalsService.add(goal, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

goalsRouter.put('/:goalId', async (req, res) => {
  try {
    const goal = req.body.goal;
    const goalId = req.params.goalId;
    if (!goal) {
      res.status(400).send('Goal data is required');
    }

    const result = await goalsService.update(goalId, goal);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

goalsRouter.delete('/:projectId/:goalId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const goalId = req.params.goalId;
    if (!projectId || !goalId) {
      res.status(400).send('Project and Goal Ids are required');
    }

    const result = await goalsService.remove(projectId, goalId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default goalsRouter;
