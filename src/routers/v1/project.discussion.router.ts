import express from 'express';
import discussionService from '../../services/v1/Project/project.discussion.service';

const projectDiscussionRouter = express.Router();
projectDiscussionRouter.use(express.json());

projectDiscussionRouter.get('/by-id/:discussionId', async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    if (!discussionId) {
      res.status(400).send('discussionId is required');
    }

    const discussion = await discussionService.findById(discussionId);
    res.status(200).send(discussion);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectDiscussionRouter.get('/by-project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(400).send('projectId is required');
    }

    const discussions = await discussionService.findByProjectId(projectId);

    res.status(200).send(discussions);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectDiscussionRouter.get('/', async (req, res) => {
  try {
    const discussions = await discussionService.findAll();
    res.status(200).send(discussions);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectDiscussionRouter.post('/:projectId', async (req, res) => {
  try {
    const discussion = req.body.discussion;
    const projectId = req.params.projectId;
    if (!discussion) {
      res.status(400).send('Discussion data is required');
    }

    const result = await discussionService.add(discussion, projectId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectDiscussionRouter.put('/:discussionId', async (req, res) => {
  try {
    const discussion = req.body.discussion;
    if (!discussion) {
      res.status(400).send('Discussion data is required');
    }
    const discussionId = req.params.discussionId;
    if (!discussionId) {
      res.status(400).send('discussionId is required');
    }

    const result = await discussionService.update(discussionId, discussion);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

projectDiscussionRouter.delete('/:discussionId', async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    if (!discussionId) {
      res.status(400).send('discussionId is required');
    }

    const result = await discussionService.remove(discussionId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default projectDiscussionRouter;
