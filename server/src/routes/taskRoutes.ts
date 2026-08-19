import { Router } from 'express';
import { z } from 'zod';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateMiddleware';

const router = Router();

const createTaskSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  status: z.enum(['Todo', 'In Progress', 'Blocked', 'Done']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  assignee: z
    .object({
      name: z.string(),
      avatar: z.string().optional(),
    })
    .optional(),
  dueDate: z.string().or(z.date()).optional(),
  blockedReason: z.string().optional(),
  blockedDays: z.number().optional(),
});

const updateTaskSchema = createTaskSchema.partial();

router.use(authenticate);

router.get('/', getTasks);
router.post('/', validateBody(createTaskSchema), createTask);
router.put('/:id', validateBody(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
