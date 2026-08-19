import api from './api';
import { AIInsight, MomentumPoint } from '../types';
import { localDB } from './localStore';

export interface InsightPayload {
  summary: {
    totalProjects: number;
    healthyProjects: number;
    atRiskProjects: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    blockedCount: number;
    completionRate: number;
  };
  insights: AIInsight[];
  blockedTasks: {
    id: string;
    title: string;
    projectId: string;
    reason: string;
    blockedDays: number;
    assignee: string;
    priority: string;
  }[];
}

export interface AskNexoraResult {
  query: string;
  answer: string;
  detail: string;
  steps: string[];
  recommendedAction: {
    label: string;
    route: string;
  };
}

export const insightService = {
  async getInsights(): Promise<InsightPayload> {
    try {
      const response = await api.get<{ success: boolean; data: InsightPayload }>('/insights');
      return response.data.data;
    } catch {
      const projects = localDB.getProjects();
      const tasks = localDB.getTasks();

      const healthy = projects.filter((p) => p.status === 'Healthy').length;
      const atRisk = projects.filter((p) => p.status === 'At Risk' || p.status === 'Delayed').length;
      const completed = tasks.filter((t) => t.status === 'Done').length;
      const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
      const blocked = tasks.filter((t) => t.status === 'Blocked');

      const insights: AIInsight[] = [
        {
          id: 'ins-1',
          type: 'warning',
          category: 'Project Atlas',
          title: 'Project Atlas is slowing down',
          description: `${blocked.length || 2} tasks have been blocked for more than 2 days. Upstream network authorization is stalling testing.`,
          suggestedAction: 'Move API integration ahead of the documentation milestone to unblock team throughput.',
          impact: 'High',
          actionLabel: 'Review Project Atlas →',
          targetProject: 'ATL',
        },
        {
          id: 'ins-2',
          type: 'opportunity',
          category: 'Project Orion',
          title: 'Project Orion has 91% velocity momentum',
          description: 'Design system tokens and responsive viewport tests are pacing 3 days ahead of schedule.',
          suggestedAction: 'Lock design tokens and release staging candidate for QA audit.',
          impact: 'Positive',
          actionLabel: 'View Orion Milestone →',
          targetProject: 'ORI',
        },
        {
          id: 'ins-3',
          type: 'risk',
          category: 'Project Nova',
          title: 'SAML SSO security review deadline in 5 days',
          description: 'Storage allocation ticket for audit logging is currently waiting for approval.',
          suggestedAction: 'Escalate DevOps storage ticket to prevent SSO compliance delays.',
          impact: 'Medium',
          actionLabel: 'Unblock Storage Ticket →',
          targetProject: 'NOV',
        },
      ];

      return {
        summary: {
          totalProjects: projects.length,
          healthyProjects: healthy,
          atRiskProjects: atRisk,
          totalTasks: tasks.length,
          completedTasks: completed,
          inProgressTasks: inProgress,
          blockedCount: blocked.length,
          completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
        },
        insights,
        blockedTasks: blocked.map((t) => ({
          id: t._id,
          title: t.title,
          projectId: typeof t.projectId === 'object' ? (t.projectId as any)?._id : t.projectId,
          reason: t.blockedReason || 'Staging subnet clearance pending',
          blockedDays: t.blockedDays || 2,
          assignee: t.assignee?.name || 'David Kim',
          priority: t.priority,
        })),
      };
    }
  },

  async getMomentum(): Promise<MomentumPoint[]> {
    try {
      const response = await api.get<{ success: boolean; data: MomentumPoint[] }>('/insights/momentum');
      return response.data.data;
    } catch {
      return [
        { date: 'Mon', velocity: 45, completedTasks: 3, plannedTasks: 5 },
        { date: 'Tue', velocity: 52, completedTasks: 5, plannedTasks: 6 },
        { date: 'Wed', velocity: 68, completedTasks: 8, plannedTasks: 10 },
        { date: 'Thu', velocity: 74, completedTasks: 6, plannedTasks: 8 },
        { date: 'Fri', velocity: 86, completedTasks: 12, plannedTasks: 14 },
        { date: 'Sat', velocity: 79, completedTasks: 4, plannedTasks: 5 },
        { date: 'Sun', velocity: 92, completedTasks: 9, plannedTasks: 10 },
      ];
    }
  },

  async askNexora(query: string): Promise<AskNexoraResult> {
    try {
      const response = await api.post<{ success: boolean; data: AskNexoraResult }>('/insights/ask', { query });
      return response.data.data;
    } catch {
      const clean = query.toLowerCase();
      if (clean.includes('attention') || clean.includes('atlas') || clean.includes('risk') || clean.includes('block')) {
        return {
          query,
          answer: 'Atlas needs attention.',
          detail: 'Two tasks are currently blocked and its next milestone is approaching in 14 days. The API integration review should be prioritized.',
          steps: [
            'Reviewing active workspace projects...',
            'Checking task activity & velocity logs...',
            'Looking for blockers & stale dependencies...',
          ],
          recommendedAction: { label: 'View Atlas →', route: '/projects' },
        };
      }
      return {
        query,
        answer: 'Orion is your healthiest project at 91% completion.',
        detail: 'Marcus completed responsive tests. All micro-interactions are pacing ahead of schedule.',
        steps: [
          'Scanning milestone progress across active projects...',
          'Evaluating team velocity and commit momentum...',
          'Calculating on-time completion probability...',
        ],
        recommendedAction: { label: 'Inspect Orion →', route: '/projects' },
      };
    }
  },
};
