import { Types } from 'mongoose';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Task } from '../models/Task';
import { Activity } from '../models/Activity';
import { logger } from '../utils/logger';

export const seedWorkspaceDataForUser = async (userId: Types.ObjectId, userName: string = 'Alex Vance') => {
  try {
    // Clear existing data for user to ensure fresh clean state if re-seeding
    await Project.deleteMany({ userId });
    await Task.deleteMany({ userId });
    await Activity.deleteMany({ userId });

    // 1. Create Core Projects
    const atlas = await Project.create({
      userId,
      name: 'Project Atlas',
      key: 'ATL',
      description: 'Core infrastructure overhaul, distributed telemetry and GraphQL gateway migration.',
      status: 'At Risk',
      priority: 'Urgent',
      progress: 82,
      leadName: 'Alex Vance',
      targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      tags: ['infrastructure', 'v2-launch', 'backend'],
      metrics: {
        totalTasks: 18,
        completedTasks: 14,
        blockedTasks: 2,
        velocityScore: 74,
      },
    });

    const nova = await Project.create({
      userId,
      name: 'Project Nova',
      key: 'NOV',
      description: 'Enterprise SSO, role-based permissions engine, and security compliance audit.',
      status: 'At Risk',
      priority: 'High',
      progress: 64,
      leadName: 'Sarah Chen',
      targetDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      tags: ['security', 'enterprise', 'auth'],
      metrics: {
        totalTasks: 22,
        completedTasks: 14,
        blockedTasks: 3,
        velocityScore: 68,
      },
    });

    const orion = await Project.create({
      userId,
      name: 'Project Orion',
      key: 'ORI',
      description: 'Design system tokens, unified micro-interaction suite, and mobile client parity.',
      status: 'Healthy',
      priority: 'Medium',
      progress: 91,
      leadName: 'Marcus Thorne',
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      tags: ['design-system', 'frontend', 'ui-craft'],
      metrics: {
        totalTasks: 24,
        completedTasks: 22,
        blockedTasks: 0,
        velocityScore: 96,
      },
    });

    const aurora = await Project.create({
      userId,
      name: 'Project Aurora',
      key: 'AUR',
      description: 'Real-time collaborative canvas and automated workspace indexing engine.',
      status: 'Healthy',
      priority: 'Medium',
      progress: 48,
      leadName: 'Elena Rostova',
      targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      tags: ['collaboration', 'realtime', 'canvas'],
      metrics: {
        totalTasks: 16,
        completedTasks: 8,
        blockedTasks: 0,
        velocityScore: 88,
      },
    });

    // 2. Create Realistic Tasks for Atlas, Nova, Orion, Aurora
    const tasks = [
      // Project Atlas Tasks
      {
        userId,
        projectId: atlas._id,
        title: 'Review API integration & rate limiting',
        description: 'Verify OAuth2 token exchange and handle edge-case gateway retry backoffs.',
        status: 'In Progress',
        priority: 'Urgent',
        assignee: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        order: 1,
      },
      {
        userId,
        projectId: atlas._id,
        title: 'Kafka event stream partition rebalancing',
        description: 'Blocked waiting on upstream cluster firewall port opening from devops.',
        status: 'Blocked',
        priority: 'High',
        assignee: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        blockedReason: 'Awaiting network security clearance on staging VPC subnet.',
        blockedDays: 3,
        order: 2,
      },
      {
        userId,
        projectId: atlas._id,
        title: 'Schema validation for webhook ingress',
        description: 'Waiting for vendor contract agreement on payload structure.',
        status: 'Blocked',
        priority: 'Medium',
        assignee: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        blockedReason: 'Vendor specification mismatch on batch dispatch endpoints.',
        blockedDays: 2,
        order: 3,
      },
      {
        userId,
        projectId: atlas._id,
        title: 'Database connection pooling optimization',
        description: 'Configured connection retry exponential backoff for resilience.',
        status: 'Done',
        priority: 'High',
        assignee: {
          name: 'Alex Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        order: 4,
      },
      {
        userId,
        projectId: atlas._id,
        title: 'Prepare release notes & changelog for v2.4',
        description: 'Document breaking API deprecations and migration steps.',
        status: 'Todo',
        priority: 'Low',
        assignee: {
          name: 'Elena Rostova',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        order: 5,
      },

      // Project Nova Tasks
      {
        userId,
        projectId: nova._id,
        title: 'Implement SAML 2.0 Identity Provider assertions',
        description: 'SAML response XML signature validation and claims mapping.',
        status: 'In Progress',
        priority: 'High',
        assignee: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        order: 1,
      },
      {
        userId,
        projectId: nova._id,
        title: 'Audit logging table schema partitioning',
        description: 'Waiting on database disk quota increase request.',
        status: 'Blocked',
        priority: 'Urgent',
        assignee: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        blockedReason: 'Storage allocation ticket pending approval from DevOps.',
        blockedDays: 4,
        order: 2,
      },
      {
        userId,
        projectId: nova._id,
        title: 'Role-based permission matrix unit tests',
        description: 'Ensure granular resource hierarchy checks pass edge cases.',
        status: 'Done',
        priority: 'Medium',
        assignee: {
          name: 'Alex Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        order: 3,
      },

      // Project Orion Tasks
      {
        userId,
        projectId: orion._id,
        title: 'Update landing page typography & spacing tokens',
        description: 'Refined responsive fluid scales and optical contrast balance.',
        status: 'Done',
        priority: 'Medium',
        assignee: {
          name: 'Marcus Thorne',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        order: 1,
      },
      {
        userId,
        projectId: orion._id,
        title: 'Micro-interaction physics tuning for modal dismissals',
        description: 'Spring curves: stiffness 400, damping 30 for tactile snap.',
        status: 'Done',
        priority: 'Low',
        assignee: {
          name: 'Marcus Thorne',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        order: 2,
      },
      {
        userId,
        projectId: orion._id,
        title: 'Verify 390px mobile viewport & touch target fidelity',
        description: 'Ensure 44px minimum tap boundaries across all interactive controls.',
        status: 'In Progress',
        priority: 'High',
        assignee: {
          name: 'Marcus Thorne',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        order: 3,
      },

      // Project Aurora Tasks
      {
        userId,
        projectId: aurora._id,
        title: 'WebRTC data-channel mesh sync protocol',
        description: 'CRDT state synchronization over lightweight WebSockets.',
        status: 'In Progress',
        priority: 'High',
        assignee: {
          name: 'Elena Rostova',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        },
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        order: 1,
      },
    ];

    await Task.insertMany(tasks);

    // 3. Create Realistic Activity Log
    const activities = [
      {
        userId,
        projectId: atlas._id,
        type: 'task_updated',
        actor: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
        title: 'Sarah completed API integration review',
        description: 'Verified payload serialization and response latency under 45ms.',
        createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 mins ago
      },
      {
        userId,
        projectId: atlas._id,
        type: 'project_updated',
        actor: { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        title: 'Project Atlas moved to Stage 2 Review',
        description: 'Core infrastructure migration passed automated regression checks.',
        createdAt: new Date(Date.now() - 24 * 60 * 1000), // 24 mins ago
      },
      {
        userId,
        projectId: nova._id,
        type: 'milestone_reached',
        actor: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
        title: 'New milestone reached: Enterprise SSO Specs',
        description: 'Security architecture documents approved by compliance lead.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
      {
        userId,
        projectId: orion._id,
        type: 'task_completed',
        actor: { name: 'Marcus Thorne', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
        title: 'Design review completed for dark mode palette',
        description: 'Obsidian tokens (#0A0D14) calibrated for WCAG AAA contrast.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        userId,
        projectId: atlas._id,
        type: 'task_blocked',
        actor: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
        title: 'Blocker flagged on Kafka partition stream',
        description: 'Awaiting network security clearance on staging VPC subnet.',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
    ];

    await Activity.insertMany(activities);

    logger.success(`Seeded demo workspace successfully for user ${userName} (${userId})`);
  } catch (error: any) {
    logger.error(`Error seeding demo data: ${error.message}`);
  }
};
