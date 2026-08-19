import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useToast } from '../context/ToastContext';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { formatDate } from '../utils/helpers';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Calendar,
  User,
  CheckSquare,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    status: 'Healthy' as any,
    priority: 'Medium' as any,
    progress: 0,
    leadName: 'Alex Vance',
  });
  const [submitting, setSubmitting] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects({
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        priority: priorityFilter !== 'all' ? priorityFilter : undefined,
      });
      setProjects(data);
    } catch (err: any) {
      toastError('Fetch Error', 'Failed to retrieve workspace projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter, priorityFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      key: '',
      description: '',
      status: 'Healthy',
      priority: 'Medium',
      progress: 0,
      leadName: 'Alex Vance',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      key: project.key,
      description: project.description,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      leadName: project.leadName,
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitting(true);

    try {
      if (editingProject) {
        await projectService.updateProject(editingProject._id, formData);
        success('Project updated', `"${formData.name}" saved successfully.`);
      } else {
        await projectService.createProject(formData);
        success('Project created', `"${formData.name}" initialized in workspace.`);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      toastError('Save Error', err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await projectService.deleteProject(id);
      success('Project deleted', `"${name}" removed from workspace.`);
      fetchProjects();
    } catch {
      toastError('Delete Failed', 'Could not remove project.');
    }
  };

  return (
    <DashboardLayout onOpenNewProjectModal={handleOpenCreateModal}>
      <div className="space-y-6">
        {/* Header & New Project Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Projects Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your engineering deliverables, milestone pacing, and health metrics.
            </p>
          </div>

          <Button
            size="md"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Project
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects by name, description, or key..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </form>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Healthy">Healthy</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
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

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <FolderKanban className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create your first project or clear your search filters to view your engineering portfolio.
            </p>
            <Button size="sm" onClick={handleOpenCreateModal} className="mt-2">
              Create First Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => {
              const isHealthy = p.status === 'Healthy';
              const isRisk = p.status === 'At Risk' || p.status === 'Delayed';

              return (
                <Card
                  key={p._id}
                  glow
                  className="p-6 flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded">
                          {p.key}
                        </span>
                        <Badge
                          variant={isHealthy ? 'healthy' : isRisk ? 'risk' : 'neutral'}
                          size="sm"
                        >
                          {p.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p._id, p.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {p.description || 'No description provided.'}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Completion</span>
                        <span className={isHealthy ? 'text-emerald-500' : 'text-amber-500'}>
                          {p.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${p.progress}%` }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHealthy ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{p.leadName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(p.targetDate)}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        description="Configure project delivery parameters and metadata."
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <Input
            label="Project Name"
            placeholder="e.g. Project Orion"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Project Key (3-4 chars)"
              placeholder="ORI"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
            />

            <Input
              label="Lead Name"
              placeholder="Marcus Thorne"
              value={formData.leadName}
              onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What does this project accomplish?"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                <option value="Healthy">Healthy</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
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

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                className="w-full mt-2 accent-brand-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
