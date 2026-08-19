import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { MomentumChart } from '../components/dashboard/MomentumChart';
import { TaskCompletionChart } from '../components/dashboard/TaskCompletionChart';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { UpcomingTaskList } from '../components/dashboard/UpcomingTaskList';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { insightService, InsightPayload } from '../services/insightService';
import { activityService } from '../services/activityService';
import { Project, Task, ActivityItem, MomentumPoint } from '../types';
import {
  FolderKanban,
  CheckSquare,
  Clock,
  AlertTriangle,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [insightsData, setInsightsData] = useState<InsightPayload | null>(null);
  const [momentumData, setMomentumData] = useState<MomentumPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick Task Creation Modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProjectId, setTaskProjectId] = useState('');
  const [taskPriority, setTaskPriority] = useState<any>('Medium');
  const [taskSubmitting, setTaskSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [projRes, taskRes, actRes, insRes, momRes] = await Promise.all([
        projectService.getProjects(),
        taskService.getTasks(),
        activityService.getActivities('all', 6),
        insightService.getInsights(),
        insightService.getMomentum(),
      ]);

      const safeProjects = Array.isArray(projRes) ? projRes : [];
      const safeTasks = Array.isArray(taskRes) ? taskRes : [];
      const safeActivities = Array.isArray(actRes) ? actRes : [];
      const safeMomentum = Array.isArray(momRes) ? momRes : [];

      setProjects(safeProjects);
      setTasks(safeTasks);
      setActivities(safeActivities);
      setInsightsData(insRes || null);
      setMomentumData(safeMomentum);

      if (safeProjects.length > 0 && !taskProjectId) {
        setTaskProjectId(safeProjects[0]._id);
      }
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleTaskStatus = async (task: Task) => {
    try {
      const nextStatus = task.status === 'Done' ? 'Todo' : 'Done';
      await taskService.updateTask(task._id, { status: nextStatus });
      success(
        nextStatus === 'Done' ? 'Task completed!' : 'Task reopened',
        `"${task.title}" status updated.`
      );
      fetchDashboardData();
    } catch {
      toastError('Update Failed', 'Could not update task status.');
    }
  };

  const handleCreateQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskProjectId) return;
    setTaskSubmitting(true);
    try {
      await taskService.createTask({
        title: taskTitle,
        projectId: taskProjectId,
        priority: taskPriority,
        status: 'Todo',
      });
      success('Task created', `"${taskTitle}" added to workspace.`);
      setTaskTitle('');
      setIsTaskModalOpen(false);
      fetchDashboardData();
    } catch (err: any) {
      toastError('Error', err.response?.data?.message || 'Failed to create task.');
    } finally {
      setTaskSubmitting(false);
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeActivities = Array.isArray(activities) ? activities : [];

  const activeProjectsCount = safeProjects.length;
  const completedTasksCount = safeTasks.filter((t) => t && t.status === 'Done').length;
  const atRiskCount = safeProjects.filter((p) => p && (p.status === 'At Risk' || p.status === 'Delayed')).length;
  const upcomingCount = safeTasks.filter((t) => t && t.status !== 'Done').length;

  return (
    <DashboardLayout onOpenNewTaskModal={() => setIsTaskModalOpen(true)}>
      <div className="space-y-8">
        {/* Top Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>{user?.workspaceName || 'Core Workspace'}</span>
              <span>•</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Good morning, {user?.name?.split(' ')[0] || 'Alex'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setIsTaskModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Active Projects"
            value={activeProjectsCount}
            subtitle={`${activeProjectsCount} tracked repositories`}
            badge="100% Synced"
            badgeVariant="healthy"
            icon={FolderKanban}
          />
          <StatCard
            title="Tasks Completed"
            value={completedTasksCount}
            subtitle={`${safeTasks.length} total tasks`}
            badge="78% velocity"
            badgeVariant="brand"
            icon={CheckSquare}
          />
          <StatCard
            title="Upcoming Tasks"
            value={upcomingCount}
            subtitle="Active sprint backlog"
            badge="Scheduled"
            badgeVariant="neutral"
            icon={Clock}
          />
          <StatCard
            title="Projects At Risk"
            value={atRiskCount}
            subtitle="Atlas, Nova flagged"
            badge="2 Blockers"
            badgeVariant="risk"
            icon={AlertTriangle}
          />
        </div>

        {/* Dual Chart Row: Project Momentum & Task Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Project Momentum
                  </h3>
                  <p className="text-xs text-slate-400">Velocity score trajectory over last 7 days</p>
                </div>
              </div>
              <Badge variant="healthy" size="sm">
                +14% vs baseline
              </Badge>
            </div>
            <MomentumChart data={momentumData} />
          </Card>

          <Card className="lg:col-span-5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Task Status Distribution
                  </h3>
                  <p className="text-xs text-slate-400">Current sprint backlog breakdown</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">
                {safeTasks.length} total
              </Badge>
            </div>
            <TaskCompletionChart />
          </Card>
        </div>

        {/* AI Insight Feed & Blocker Callouts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Workspace AI Insights
              </h3>
            </div>
            <Link to="/insights" className="text-xs text-brand-500 hover:underline font-medium">
              View deeper analysis →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insightsData?.insights?.map((ins) => (
              <AIInsightCard key={ins.id} insight={ins} />
            ))}
          </div>
        </div>

        {/* Bottom Split: Recent Activity & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingTaskList tasks={safeTasks} onToggleStatus={handleToggleTaskStatus} />
          <ActivityFeed activities={safeActivities} />
        </div>
      </div>

      {/* Quick Task Creation Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
        description="Add an actionable deliverable to your project."
      >
        <form onSubmit={handleCreateQuickTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Optimize Redis cache invalidation"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Project
            </label>
            <select
              value={taskProjectId}
              onChange={(e) => setTaskProjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              required
            >
              {safeProjects.map((p) => (
                <option key={p._id} value={p._id}>
                  [{p.key}] {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Priority
            </label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={taskSubmitting}>
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
