import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useToast } from '../context/ToastContext';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { Task, Project } from '../types';
import { formatDate } from '../utils/helpers';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Edit2,
  Trash2,
  User,
  Calendar,
  Layers,
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    status: 'Todo' as any,
    priority: 'Medium' as any,
    assigneeName: 'Sarah Chen',
    blockedReason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchTasksAndProjects = async () => {
    try {
      setLoading(true);
      const [taskList, projectList] = await Promise.all([
        taskService.getTasks({
          search: search || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          priority: priorityFilter !== 'all' ? priorityFilter : undefined,
          projectId: projectFilter !== 'all' ? projectFilter : undefined,
        }),
        projectService.getProjects(),
      ]);

      setTasks(taskList);
      setProjects(projectList);
      if (projectList.length > 0 && !formData.projectId) {
        setFormData((prev) => ({ ...prev, projectId: projectList[0]._id }));
      }
    } catch {
      toastError('Fetch Error', 'Failed to retrieve workspace tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndProjects();
  }, [statusFilter, priorityFilter, projectFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTasksAndProjects();
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      projectId: projects[0]?._id || '',
      status: 'Todo',
      priority: 'Medium',
      assigneeName: 'Sarah Chen',
      blockedReason: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    const projId = typeof task.projectId === 'object' && task.projectId !== null ? task.projectId._id : (task.projectId as string);
    setFormData({
      title: task.title,
      description: task.description || '',
      projectId: projId || '',
      status: task.status,
      priority: task.priority,
      assigneeName: task.assignee?.name || 'Sarah Chen',
      blockedReason: task.blockedReason || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.projectId) return;
    setSubmitting(true);

    try {
      const payload: Partial<Task> = {
        title: formData.title,
        description: formData.description,
        projectId: formData.projectId,
        status: formData.status,
        priority: formData.priority,
        assignee: { name: formData.assigneeName },
        blockedReason: formData.status === 'Blocked' ? formData.blockedReason : '',
      };

      if (editingTask) {
        await taskService.updateTask(editingTask._id, payload);
        success('Task updated', `"${formData.title}" saved.`);
      } else {
        await taskService.createTask(payload);
        success('Task created', `"${formData.title}" added to project.`);
      }

      setIsModalOpen(false);
      fetchTasksAndProjects();
    } catch (err: any) {
      toastError('Save Error', err.response?.data?.message || 'Failed to save task.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const nextStatus = task.status === 'Done' ? 'Todo' : 'Done';
      await taskService.updateTask(task._id, { status: nextStatus });
      success(nextStatus === 'Done' ? 'Task completed' : 'Task reopened');
      fetchTasksAndProjects();
    } catch {
      toastError('Error', 'Could not toggle task status.');
    }
  };

  const handleDeleteTask = async (id: string, title: string) => {
    if (!window.confirm(`Delete task "${title}"?`)) return;
    try {
      await taskService.deleteTask(id);
      success('Task deleted');
      fetchTasksAndProjects();
    } catch {
      toastError('Error', 'Could not delete task.');
    }
  };

  return (
    <DashboardLayout onOpenNewTaskModal={handleOpenCreateModal}>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Task Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track deliverables, unblock dependencies, and assign sprint tasks.
            </p>
          </div>

          <Button
            size="md"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Task
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks by title or details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </form>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="all">All Projects</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    [{p.key}] {p.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Task List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <CheckSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No tasks match filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create a task or modify your active filter parameters.
            </p>
            <Button size="sm" onClick={handleOpenCreateModal} className="mt-2">
              Create Task
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {tasks.map((t) => {
              const isDone = t.status === 'Done';
              const isBlocked = t.status === 'Blocked';
              const projectName =
                typeof t.projectId === 'object' && t.projectId !== null
                  ? t.projectId.name
                  : 'Project';

              return (
                <Card
                  key={t._id}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-all ${
                    isBlocked
                      ? 'border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/5'
                      : isDone
                      ? 'opacity-70 bg-slate-50 dark:bg-slate-900/30'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <button
                      onClick={() => handleToggleStatus(t)}
                      className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-brand-500 transition-colors"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isBlocked ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p
                          className={`text-sm font-bold truncate ${
                            isDone
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {t.title}
                        </p>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {projectName}
                        </span>
                      </div>

                      {t.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {t.description}
                        </p>
                      )}

                      {isBlocked && t.blockedReason && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          Blocker: {t.blockedReason}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {t.assignee?.name || 'Unassigned'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(t.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Badges */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                    <Badge
                      variant={
                        isDone
                          ? 'completed'
                          : isBlocked
                          ? 'risk'
                          : t.priority === 'Urgent'
                          ? 'urgent'
                          : 'brand'
                      }
                      size="sm"
                    >
                      {t.status} • {t.priority}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(t)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(t._id, t.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Task Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        description="Set assignees, priority levels, and blocker notes."
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Audit SAML assertions"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Project
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
              required
            >
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  [{p.key}] {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <Input
            label="Assignee Name"
            placeholder="Sarah Chen"
            value={formData.assigneeName}
            onChange={(e) => setFormData({ ...formData, assigneeName: e.target.value })}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Task Details / Notes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide technical context or acceptance criteria..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
            />
          </div>

          {formData.status === 'Blocked' && (
            <Input
              label="Blocker Reason"
              placeholder="e.g. Waiting on firewall authorization"
              value={formData.blockedReason}
              onChange={(e) => setFormData({ ...formData, blockedReason: e.target.value })}
              required
            />
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingTask ? 'Save Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
