import { Project, Task, ActivityItem, User, AIInsight, MomentumPoint } from '../types';

const STORAGE_KEYS = {
  USERS: 'nexora_db_users',
  PROJECTS: 'nexora_db_projects',
  TASKS: 'nexora_db_tasks',
  ACTIVITIES: 'nexora_db_activities',
};

// Seed initial workspace data into localStorage if empty
export const initializeLocalStore = (userId: string = 'user_demo_alex', userName: string = 'Alex Vance') => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    const initialProjects: Project[] = [
      {
        _id: 'proj_atlas',
        userId,
        name: 'Project Atlas',
        key: 'ATL',
        description: 'Core infrastructure overhaul, distributed telemetry and GraphQL gateway migration.',
        status: 'At Risk',
        priority: 'Urgent',
        progress: 82,
        leadName: userName,
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['infrastructure', 'v2-launch'],
        metrics: { totalTasks: 18, completedTasks: 14, blockedTasks: 2, velocityScore: 74 },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'proj_nova',
        userId,
        name: 'Project Nova',
        key: 'NOV',
        description: 'Enterprise SSO, role-based permissions engine, and security compliance audit.',
        status: 'At Risk',
        priority: 'High',
        progress: 64,
        leadName: 'Sarah Chen',
        targetDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['security', 'enterprise'],
        metrics: { totalTasks: 22, completedTasks: 14, blockedTasks: 3, velocityScore: 68 },
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'proj_orion',
        userId,
        name: 'Project Orion',
        key: 'ORI',
        description: 'Design system tokens, unified micro-interaction suite, and mobile client parity.',
        status: 'Healthy',
        priority: 'Medium',
        progress: 91,
        leadName: 'Marcus Thorne',
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['design-system', 'ui-craft'],
        metrics: { totalTasks: 24, completedTasks: 22, blockedTasks: 0, velocityScore: 96 },
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'proj_aurora',
        userId,
        name: 'Project Aurora',
        key: 'AUR',
        description: 'Real-time collaborative canvas and automated workspace indexing engine.',
        status: 'Healthy',
        priority: 'Medium',
        progress: 48,
        leadName: 'Elena Rostova',
        targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['collaboration', 'canvas'],
        metrics: { totalTasks: 16, completedTasks: 8, blockedTasks: 0, velocityScore: 88 },
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    const initialTasks: Task[] = [
      {
        _id: 'task_1',
        userId,
        projectId: 'proj_atlas',
        title: 'Review API integration & rate limiting',
        description: 'Verify OAuth2 token exchange and handle gateway retry backoffs.',
        status: 'In Progress',
        priority: 'Urgent',
        assignee: { name: 'Sarah Chen' },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'task_2',
        userId,
        projectId: 'proj_atlas',
        title: 'Kafka event stream partition rebalancing',
        description: 'Blocked waiting on staging subnet security clearance from devops.',
        status: 'Blocked',
        priority: 'High',
        assignee: { name: 'David Kim' },
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        blockedReason: 'Awaiting network security clearance on staging subnet.',
        blockedDays: 3,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'task_3',
        userId,
        projectId: 'proj_atlas',
        title: 'Schema validation for webhook ingress',
        description: 'Vendor contract agreement validation.',
        status: 'Blocked',
        priority: 'Medium',
        assignee: { name: 'Sarah Chen' },
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        blockedReason: 'Vendor specification mismatch on batch dispatch endpoints.',
        blockedDays: 2,
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'task_4',
        userId,
        projectId: 'proj_orion',
        title: 'Update landing page typography & spacing tokens',
        description: 'Refined responsive fluid scales and optical contrast balance.',
        status: 'Done',
        priority: 'Medium',
        assignee: { name: 'Marcus Thorne' },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'task_5',
        userId,
        projectId: 'proj_atlas',
        title: 'Prepare release notes & changelog for v2.4',
        description: 'Document breaking API deprecations and migration steps.',
        status: 'Todo',
        priority: 'Low',
        assignee: { name: 'Elena Rostova' },
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(initialTasks));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    const initialActivities: ActivityItem[] = [
      {
        _id: 'act_1',
        type: 'task_completed',
        actor: { name: 'Sarah Chen' },
        title: 'Sarah completed API integration review',
        description: 'Verified payload serialization and response latency under 45ms.',
        createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      },
      {
        _id: 'act_2',
        type: 'project_updated',
        actor: { name: 'Alex Vance' },
        title: 'Project Atlas moved to Stage 2 Review',
        description: 'Core infrastructure migration passed automated regression checks.',
        createdAt: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
      },
      {
        _id: 'act_3',
        type: 'milestone_reached',
        actor: { name: 'Sarah Chen' },
        title: 'New milestone reached: Enterprise SSO Specs',
        description: 'Security architecture documents approved by compliance lead.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'act_4',
        type: 'task_completed',
        actor: { name: 'Marcus Thorne' },
        title: 'Design review completed for dark mode palette',
        description: 'Obsidian tokens (#0A0D14) calibrated for WCAG AAA contrast.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initialActivities));
  }
};

export const localDB = {
  getProjects: (): Project[] => {
    initializeLocalStore();
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [];
  },

  saveProject: (projectData: Partial<Project>): Project => {
    initializeLocalStore();
    const projects = localDB.getProjects();
    const newProject: Project = {
      _id: 'proj_' + Math.random().toString(36).substr(2, 9),
      userId: 'user_active',
      name: projectData.name || 'New Project',
      key: projectData.key || (projectData.name?.substr(0, 3).toUpperCase() || 'PRJ'),
      description: projectData.description || '',
      status: projectData.status || 'Healthy',
      priority: projectData.priority || 'Medium',
      progress: projectData.progress || 0,
      leadName: projectData.leadName || 'Alex Vance',
      targetDate: projectData.targetDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      tags: projectData.tags || ['core'],
      metrics: { totalTasks: 0, completedTasks: 0, blockedTasks: 0, velocityScore: 85 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

    localDB.addActivity({
      type: 'project_created',
      actor: { name: newProject.leadName },
      title: `Created project "${newProject.name}"`,
      description: `Project initialized with key [${newProject.key}]`,
    });

    return newProject;
  },

  updateProject: (id: string, updates: Partial<Project>): Project => {
    const projects = localDB.getProjects();
    const idx = projects.findIndex((p) => p._id === id);
    if (idx === -1) throw new Error('Project not found');

    const updated = { ...projects[idx], ...updates, updatedAt: new Date().toISOString() };
    projects[idx] = updated;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

    localDB.addActivity({
      type: 'project_updated',
      actor: { name: updated.leadName },
      title: `Updated project "${updated.name}"`,
      description: `Progress updated to ${updated.progress}% (${updated.status})`,
    });

    return updated;
  },

  deleteProject: (id: string): void => {
    let projects = localDB.getProjects();
    const proj = projects.find((p) => p._id === id);
    projects = projects.filter((p) => p._id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

    // Cascade delete tasks
    let tasks = localDB.getTasks();
    tasks = tasks.filter((t) => (typeof t.projectId === 'object' ? (t.projectId as any)?._id !== id : t.projectId !== id));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    if (proj) {
      localDB.addActivity({
        type: 'project_deleted',
        actor: { name: 'User' },
        title: `Deleted project "${proj.name}"`,
      });
    }
  },

  getTasks: (): Task[] => {
    initializeLocalStore();
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    const tasks: Task[] = data ? JSON.parse(data) : [];
    const projects = localDB.getProjects();

    // Populate project reference
    return tasks.map((t) => {
      const projId = typeof t.projectId === 'object' && t.projectId !== null ? (t.projectId as any)._id : t.projectId;
      const foundProject = projects.find((p) => p._id === projId);
      return {
        ...t,
        projectId: foundProject ? { _id: foundProject._id, name: foundProject.name, key: foundProject.key, status: foundProject.status } : t.projectId,
      };
    });
  },

  saveTask: (taskData: Partial<Task>): Task => {
    initializeLocalStore();
    const tasks = localDB.getTasks();
    const projId = typeof taskData.projectId === 'object' && taskData.projectId !== null ? (taskData.projectId as any)._id : taskData.projectId;
    const projects = localDB.getProjects();
    const project = projects.find((p) => p._id === projId);

    const newTask: Task = {
      _id: 'task_' + Math.random().toString(36).substr(2, 9),
      userId: 'user_active',
      projectId: project ? { _id: project._id, name: project.name, key: project.key } : (projId as string),
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      status: taskData.status || 'Todo',
      priority: taskData.priority || 'Medium',
      assignee: taskData.assignee || { name: 'Alex Vance' },
      dueDate: taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      blockedReason: taskData.status === 'Blocked' ? taskData.blockedReason || 'Pending clearance' : '',
      blockedDays: taskData.status === 'Blocked' ? 2 : 0,
      order: tasks.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    localDB.addActivity({
      type: newTask.status === 'Blocked' ? 'task_blocked' : 'task_created',
      actor: { name: newTask.assignee?.name || 'User' },
      title: `Created task "${newTask.title}"`,
      description: project ? `Added to project ${project.name}` : undefined,
    });

    return newTask;
  },

  updateTask: (id: string, updates: Partial<Task>): Task => {
    const tasks = localDB.getTasks();
    const idx = tasks.findIndex((t) => t._id === id);
    if (idx === -1) throw new Error('Task not found');

    const oldTask = tasks[idx];
    const updated = { ...oldTask, ...updates, updatedAt: new Date().toISOString() };
    tasks[idx] = updated;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    let actType = 'task_updated';
    let actTitle = `Updated task "${updated.title}"`;
    if (updates.status === 'Done' && oldTask.status !== 'Done') {
      actType = 'task_completed';
      actTitle = `Completed task "${updated.title}"`;
    } else if (updates.status === 'Blocked' && oldTask.status !== 'Blocked') {
      actType = 'task_blocked';
      actTitle = `Flagged task "${updated.title}" as Blocked`;
    }

    localDB.addActivity({
      type: actType,
      actor: { name: updated.assignee?.name || 'User' },
      title: actTitle,
      description: updates.blockedReason || `Status is now ${updated.status}`,
    });

    return updated;
  },

  deleteTask: (id: string): void => {
    let tasks = localDB.getTasks();
    const task = tasks.find((t) => t._id === id);
    tasks = tasks.filter((t) => t._id !== id);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));

    if (task) {
      localDB.addActivity({
        type: 'task_deleted',
        actor: { name: 'User' },
        title: `Deleted task "${task.title}"`,
      });
    }
  },

  getActivities: (): ActivityItem[] => {
    initializeLocalStore();
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : [];
  },

  addActivity: (act: Partial<ActivityItem>): void => {
    const activities = localDB.getActivities();
    const newAct: ActivityItem = {
      _id: 'act_' + Math.random().toString(36).substr(2, 9),
      type: act.type || 'task_updated',
      actor: act.actor || { name: 'Alex Vance' },
      title: act.title || 'Workspace updated',
      description: act.description || '',
      createdAt: new Date().toISOString(),
    };
    activities.unshift(newAct);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities.slice(0, 50)));
  },
};
