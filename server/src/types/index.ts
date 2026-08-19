import { Request } from 'express';
import { Types } from 'mongoose';

export type ProjectStatus = 'Healthy' | 'At Risk' | 'Delayed' | 'Completed';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Done';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'admin' | 'member' | 'lead';
  workspaceName: string;
  themePreference: 'dark' | 'light' | 'system';
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  key: string;
  description: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  progress: number;
  leadName: string;
  targetDate: Date;
  tags: string[];
  metrics: {
    totalTasks: number;
    completedTasks: number;
    blockedTasks: number;
    velocityScore: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: PriorityLevel;
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: Date;
  blockedReason?: string;
  blockedDays?: number;
  tags?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ActivityType =
  | 'project_created'
  | 'project_updated'
  | 'project_deleted'
  | 'task_created'
  | 'task_updated'
  | 'task_completed'
  | 'task_blocked'
  | 'task_deleted'
  | 'milestone_reached'
  | 'insight_generated';

export interface IActivity {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  projectId?: Types.ObjectId;
  taskId?: Types.ObjectId;
  type: ActivityType;
  actor: {
    name: string;
    avatar?: string;
  };
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
