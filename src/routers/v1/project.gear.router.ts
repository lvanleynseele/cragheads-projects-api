import express from 'express';
import gearService from '../../services/v1/Project/project.gear.service';

const gearRouter = express.Router();
gearRouter.use(express.json());

gearRouter.get('/by-id/:gearId', async (req, res) => {
  try {
    const gearId = req.params.gearId;
    if (!gearId) {
      res.status(400).send('gearId is required');
    }

    const gear = await gearService.findById(gearId);
    res.status(200).send(gear);
  } catch (error) {
    res.status(500).send(error);
  }
});

gearRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const gear = await gearService.findByProjectId(projectId);

    res.status(200).send(gear);
  } catch (error) {
    res.status(500).send(error);
  }
});

gearRouter.get('/', async (req, res) => {
  try {
    const gear = await gearService.findAll();
    res.status(200).send(gear);
  } catch (error) {
    res.status(500).send(error);
  }
});

gearRouter.post('/:projectId', async (req, res) => {
  try {
    const gear = req.body.gear;
    const projectId = req.params.projectId;
    if (!gear) {
      res.status(400).send('Gear data is required');
    }

    const result = await gearService.add(gear, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gearRouter.put('/:gearId', async (req, res) => {
  try {
    const gear = req.body.gear;
    const gearId = req.params.gearId;
    if (!gear) {
      res.status(400).send('Gear data is required');
    }

    const result = await gearService.update(gearId, gear);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gearRouter.delete('/:gearId/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const gearId = req.params.gearId;
    if (!projectId || !gearId) {
      res.status(400).send('Project and Gear Ids are required');
    }

    const result = await gearService.remove(projectId, gearId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default gearRouter;
