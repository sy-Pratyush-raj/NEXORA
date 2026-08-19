import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Project } from '../models/Project';
import { Task } from '../models/Task';
import { Activity } from '../models/Activity';
import { AuthRequest } from '../types';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { status, priority, search, sort = 'createdAt', order = 'desc' } = req.query;

    const filter: any = { userId };

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { key: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = {};
    sortOption[sort as string] = order === 'asc' ? 1 : -1;

    const projects = await Project.find(filter).sort(sortOption);

    // Calculate dynamic task metrics for each project
    const projectsWithLiveMetrics = await Promise.all(
      projects.map(async (project) => {
        const total = await Task.countDocuments({ projectId: project._id });
        const completed = await Task.countDocuments({ projectId: project._id, status: 'Done' });
        const blocked = await Task.countDocuments({ projectId: project._id, status: 'Blocked' });

        return {
          ...project.toObject(),
          metrics: {
            totalTasks: total,
            completedTasks: completed,
            blockedTasks: blocked,
            velocityScore: project.metrics?.velocityScore || 85,
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      count: projectsWithLiveMetrics.length,
      data: projectsWithLiveMetrics,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const project = await Project.findOne({ _id: id, userId });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    const tasks = await Task.find({ projectId: project._id, userId }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...project.toObject(),
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, key, description, status, priority, progress, leadName, targetDate, tags } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: 'Project name is required.' });
      return;
    }

    const generatedKey = key || name.substring(0, 3).toUpperCase();

    const project = await Project.create({
      userId,
      name,
      key: generatedKey,
      description: description || '',
      status: status || 'Healthy',
      priority: priority || 'Medium',
      progress: progress || 0,
      leadName: leadName || req.user?.name || 'Alex Vance',
      targetDate: targetDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      tags: tags || ['project'],
      metrics: {
        totalTasks: 0,
        completedTasks: 0,
        blockedTasks: 0,
        velocityScore: 85,
      },
    });

    // Create Activity Log
    await Activity.create({
      userId,
      projectId: project._id,
      type: 'project_created',
      actor: { name: req.user?.name || 'Alex Vance' },
      title: `${req.user?.name || 'User'} created project ${project.name}`,
      description: `Project initialized with key [${project.key}] and status ${project.status}`,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    // Create Activity Log
    await Activity.create({
      userId,
      projectId: project._id,
      type: 'project_updated',
      actor: { name: req.user?.name || 'Alex Vance' },
      title: `Project ${project.name} updated`,
      description: updates.status ? `Status changed to ${updates.status}` : `Progress updated to ${project.progress}%`,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const project = await Project.findOneAndDelete({ _id: id, userId });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    // Cascade delete associated tasks
    await Task.deleteMany({ projectId: project._id, userId });

    // Create Activity Log
    await Activity.create({
      userId,
      type: 'project_deleted',
      actor: { name: req.user?.name || 'Alex Vance' },
      title: `Project ${project.name} deleted`,
      description: `Project and associated tasks removed from workspace.`,
    });

    res.status(200).json({
      success: true,
      message: 'Project and associated tasks deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
