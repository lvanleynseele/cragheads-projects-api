import express from 'express';
import projectsService from '../../services/v1/Project/project.service';
import goalsRouter from './project.goal.router';
import trainingPlanRouter from './project.trainingPlan.router';
import riskAssessmentRouter from './project.riskAssessment.rotuer';
import milestonesRouter from './project.milestones.router';
import gearRouter from './project.gear.router';

const projectRouter = express.Router();
projectRouter.use(express.json());

projectRouter.use('/goals', goalsRouter);
projectRouter.use('/training-plans', trainingPlanRouter);
projectRouter.use('/milestones', milestonesRouter);
projectRouter.use('/risk-assessments', riskAssessmentRouter);
projectRouter.use('/gear', gearRouter);

projectRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const projects = await projectsService.findByProfileId(profileId);

    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.get('/by-id/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('climbId is required');
    }

    const climb = await projectsService.findById(projectId);
    res.status(200).send(climb);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.get('/', async (req, res) => {
  try {
    const climbs = await projectsService.findAll();
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.post('/:profileId', async (req, res) => {
  try {
    const project = req.body.project;
    if (!project) {
      res.status(400).send('Climb data is required');
    }

    const result = await projectsService.add(project);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/:projectId', async (req, res) => {
  try {
    const project = req.body;
    if (!project) {
      res.status(400).send('Climb data is required');
    }
    const projectId = req.params.projectId;

    const result = await projectsService.update(projectId, project);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.delete('/:projectId/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const projectId = req.params.projectId;
    if (!profileId || !projectId) {
      res.status(400).send('Profile and Climb Ids are required');
    }

    const result = await projectsService.remove(projectId, profileId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/:projectId/status/:status', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const status = req.params.status;
    if (!projectId || !status) {
      res.status(400).send('Project and status are required');
    }

    const result = await projectsService.updateProjectStatus(projectId, status);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/mark-complete/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('Project Id is required');
    }

    const result = await projectsService.markProjectComplete(projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/add-climb/:projectId/:climbId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const climbId = req.params.climbId;
    if (!projectId || !climbId) {
      res.status(400).send('Project and Climb Ids are required');
    }

    const result = await projectsService.addClimb(projectId, climbId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/remove-climb/:projectId/:climbId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const climbId = req.params.climbId;
    if (!projectId || !climbId) {
      res.status(400).send('Project and Climb Ids are required');
    }

    const result = await projectsService.removeClimb(projectId, climbId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put('/add-training/:projectId/:trainingId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const trainingId = req.params.trainingId;
    if (!projectId || !trainingId) {
      res.status(400).send('Project and Training Ids are required');
    }

    const result = await projectsService.addTraining(projectId, trainingId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectRouter.put(
  '/remove-training/:projectId/:trainingId',
  async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const trainingId = req.params.trainingId;
      if (!projectId || !trainingId) {
        res.status(400).send('Project and Training Ids are required');
      }

      const result = await projectsService.removeTraining(
        projectId,
        trainingId,
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default projectRouter;
