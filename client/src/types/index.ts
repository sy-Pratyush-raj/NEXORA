export type ProjectStatus = 'Healthy' | 'At Risk' | 'Delayed' | 'Completed';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'lead';
  workspaceName: string;
  themePreference: 'dark' | 'light' | 'system';
}

export interface Project {
  _id: string;
  userId: string;
  name: string;
  key: string;
  description: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  progress: number;
  leadName: string;
  targetDate: string;
  tags: string[];
  metrics: {
    totalTasks: number;
    completedTasks: number;
    blockedTasks: number;
    velocityScore: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  userId: string;
  projectId: string | { _id: string; name: string; key: string; status?: ProjectStatus };
  title: string;
  description?: string;
  status: TaskStatus;
  priority: PriorityLevel;
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  blockedReason?: string;
  blockedDays?: number;
  tags?: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  _id: string;
  type: string;
  actor: {
    name: string;
    avatar?: string;
  };
  title: string;
  description?: string;
  projectId?: { _id: string; name: string; key: string };
  taskId?: { _id: string; title: string; status: string };
  createdAt: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'risk';
  category: string;
  title: string;
  description: string;
  suggestedAction: string;
  impact: string;
  actionLabel: string;
  targetProject?: string;
}

export interface MomentumPoint {
  date: string;
  velocity: number;
  completedTasks: number;
  plannedTasks: number;
}
