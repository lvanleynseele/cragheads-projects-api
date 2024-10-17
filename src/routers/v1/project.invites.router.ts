import express from 'express';
import projectInvitesService from '../../services/v1/Project/project.invites.services';

const projectInviteRouter = express.Router();
projectInviteRouter.use(express.json());

projectInviteRouter.get('/by-id/:inviteId', async (req, res) => {
  try {
    const inviteId = req.params.inviteId;
    if (!inviteId) {
      res.status(400).send('inviteId is required');
    }

    const invite = await projectInvitesService.findById(inviteId);
    res.status(200).send(invite);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const invites = await projectInvitesService.findByProjectId(projectId);

    res.status(200).send(invites);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.get('/by-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).send('userId is required');
    }

    const invites = await projectInvitesService.findByUserId(userId);

    res.status(200).send(invites);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.get('/', async (req, res) => {
  try {
    const invites = await projectInvitesService.findAll();
    res.status(200).send(invites);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.post('/:projectId', async (req, res) => {
  try {
    const invite = req.body.invite;
    const projectId = req.params.projectId;
    if (!invite) {
      res.status(400).send('Invite data is required');
    }

    const result = await projectInvitesService.add(invite, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.put('/:inviteId', async (req, res) => {
  try {
    const invite = req.body.invite;
    const inviteId = req.params.inviteId;
    if (!invite) {
      res.status(400).send('Invite data is required');
    }

    const result = await projectInvitesService.update(invite, inviteId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.delete('/:projectId/:inviteId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const inviteId = req.params.inviteId;
    if (!projectId || !inviteId) {
      res.status(400).send('Project and Invite Ids are required');
    }

    const result = await projectInvitesService.remove(projectId, inviteId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.put('/:inviteId/accept', async (req, res) => {
  try {
    const inviteId = req.params.inviteId;
    if (!inviteId) {
      res.status(400).send('Project and Invite Ids are required');
    }

    const result = await projectInvitesService.acceptInvite(inviteId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectInviteRouter.put('/:inviteId/reject', async (req, res) => {
  try {
    const inviteId = req.params.inviteId;
    if (!inviteId) {
      res.status(400).send('Project and Invite Ids are required');
    }

    const result = await projectInvitesService.declineInvite(inviteId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default projectInviteRouter;
