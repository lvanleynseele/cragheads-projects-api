import express from 'express';
import riskAssessmentService from '../../services/v1/Project/project.riskAssessment.service';

const riskAssessmentRouter = express.Router();
riskAssessmentRouter.use(express.json());

riskAssessmentRouter.get('/by-id/:riskAssessmentId', async (req, res) => {
  try {
    const riskAssessmentId = req.params.riskAssessmentId;
    if (!riskAssessmentId) {
      res.status(400).send('riskAssessmentId is required');
    }

    const riskAssessment = await riskAssessmentService.findById(
      riskAssessmentId,
    );
    res.status(200).send(riskAssessment);
  } catch (error) {
    res.status(500).send(error);
  }
});

riskAssessmentRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const riskAssessments = await riskAssessmentService.findByProjectId(
      projectId,
    );

    res.status(200).send(riskAssessments);
  } catch (error) {
    res.status(500).send(error);
  }
});

riskAssessmentRouter.get('/', async (req, res) => {
  try {
    const riskAssessments = await riskAssessmentService.findAll();
    res.status(200).send(riskAssessments);
  } catch (error) {
    res.status(500).send(error);
  }
});

riskAssessmentRouter.post('/:projectId', async (req, res) => {
  try {
    const riskAssessment = req.body.riskAssessment;
    const projectId = req.params.projectId;
    if (!riskAssessment) {
      res.status(400).send('RiskAssessment data is required');
    }

    const result = await riskAssessmentService.add(riskAssessment, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

riskAssessmentRouter.put('/:riskAssessmentId', async (req, res) => {
  try {
    const riskAssessment = req.body.riskAssessment;
    const riskAssessmentId = req.params.riskAssessmentId;
    if (!riskAssessment) {
      res.status(400).send('RiskAssessment data is required');
    }

    const result = await riskAssessmentService.update(
      riskAssessmentId,
      riskAssessment,
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

riskAssessmentRouter.delete(
  '/:projectId/:riskAssessmentId',
  async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const riskAssessmentId = req.params.riskAssessmentId;
      if (!projectId || !riskAssessmentId) {
        res.status(400).send('Project and RiskAssessment Ids are required');
      }

      const result = await riskAssessmentService.remove(
        projectId,
        riskAssessmentId,
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default riskAssessmentRouter;
