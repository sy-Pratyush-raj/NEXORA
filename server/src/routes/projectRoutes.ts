import { Router } from 'express';
import { z } from 'zod';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticate } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateMiddleware';

const router = Router();

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  key: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['Healthy', 'At Risk', 'Delayed', 'Completed']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  progress: z.number().min(0).max(100).optional(),
  leadName: z.string().optional(),
  targetDate: z.string().or(z.date()).optional(),
  tags: z.array(z.string()).optional(),
});

const updateProjectSchema = createProjectSchema.partial();

router.use(authenticate);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', validateBody(createProjectSchema), createProject);
router.put('/:id', validateBody(updateProjectSchema), updateProject);
router.delete('/:id', deleteProject);

export default router;
