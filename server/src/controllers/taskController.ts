import { Response, NextFunction } from 'express';
import { Task } from '../models/Task';
import { Project } from '../models/Project';
import { Activity } from '../models/Activity';
import { AuthRequest } from '../types';

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { projectId, status, priority, search, sort = 'createdAt', order = 'desc' } = req.query;

    const filter: any = { userId };

    if (projectId && projectId !== 'all') {
      filter.projectId = projectId;
    }
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = {};
    sortOption[sort as string] = order === 'asc' ? 1 : -1;

    const tasks = await Task.find(filter)
      .populate('projectId', 'name key status')
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { projectId, title, description, status, priority, assignee, dueDate, blockedReason, blockedDays } = req.body;

    if (!title || !projectId) {
      res.status(400).json({ success: false, message: 'Task title and project selection are required.' });
      return;
    }

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      res.status(404).json({ success: false, message: 'Selected project does not exist.' });
      return;
    }

    const task = await Task.create({
      userId,
      projectId,
      title,
      description: description || '',
      status: status || 'Todo',
      priority: priority || 'Medium',
      assignee: assignee || { name: req.user?.name || 'Alex Vance' },
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      blockedReason: status === 'Blocked' ? blockedReason || 'Awaiting dependency' : '',
      blockedDays: status === 'Blocked' ? blockedDays || 1 : 0,
    });

    // Create Activity Log
    await Activity.create({
      userId,
      projectId,
      taskId: task._id,
      type: status === 'Blocked' ? 'task_blocked' : 'task_created',
      actor: { name: req.user?.name || 'Alex Vance' },
      title: `${req.user?.name || 'User'} created task "${task.title}"`,
      description: `Assigned in project ${project.name}`,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updates = req.body;

    const oldTask = await Task.findOne({ _id: id, userId });
    if (!oldTask) {
      res.status(404).json({ success: false, message: 'Task not found.' });
      return;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('projectId', 'name key');

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found.' });
      return;
    }

    // Determine activity type
    let activityType: any = 'task_updated';
    let activityTitle = `Task "${task.title}" updated`;
    if (updates.status === 'Done' && oldTask.status !== 'Done') {
      activityType = 'task_completed';
      activityTitle = `Completed task "${task.title}"`;
    } else if (updates.status === 'Blocked' && oldTask.status !== 'Blocked') {
      activityType = 'task_blocked';
      activityTitle = `Flagged task "${task.title}" as Blocked`;
    }

    await Activity.create({
      userId,
      projectId: task.projectId,
      taskId: task._id,
      type: activityType,
      actor: { name: req.user?.name || 'Alex Vance' },
      title: activityTitle,
      description: updates.blockedReason || `Status is now ${task.status}`,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found.' });
      return;
    }

    await Activity.create({
      userId,
      type: 'task_deleted',
      actor: { name: req.user?.name || 'Alex Vance' },
      title: `Deleted task "${task.title}"`,
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
