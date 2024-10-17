import express from 'express';
import projectsService from '../../services/v1/Project/project.service';
import membersService from '../../services/v1/Project/project.members.service';

const membersRouter = express.Router();
membersRouter.use(express.json());

membersRouter.get('/:projectId/is-member/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectId = req.params.projectId;
    if (!userId || !projectId) {
      res.status(400).send('memberId and projectId required');
    }

    const response = await membersService.isMember(projectId, userId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

membersRouter.get('/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const members = await membersService.findByProjectId(projectId);

    res.status(200).send(members);
  } catch (error) {
    res.status(500).send(error);
  }
});

membersRouter.get('/', async (req, res) => {
  try {
    const members = await membersService.findAll();
    res.status(200).send(members);
  } catch (error) {
    res.status(500).send(error);
  }
});

membersRouter.delete('/:projectId/:memberId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const memberId = req.params.memberId;
    if (!projectId || !memberId) {
      res.status(400).send('Project and Member Ids are required');
    }

    const result = await projectsService.removeMember(projectId, memberId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default membersRouter;
