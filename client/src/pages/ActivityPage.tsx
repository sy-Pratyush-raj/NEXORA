import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { activityService } from '../services/activityService';
import { ActivityItem } from '../types';
import { formatTimeAgo, formatDate } from '../utils/helpers';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Flag,
  RefreshCw,
  Filter,
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await activityService.getActivities(filterType);
      setActivities(data);
    } catch (err) {
      console.error('Failed to load activity stream:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [filterType]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'task_blocked':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'project_created':
      case 'task_created':
        return <PlusCircle className="w-5 h-5 text-brand-500" />;
      case 'milestone_reached':
        return <Flag className="w-5 h-5 text-purple-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Audit Stream & Activity
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verifiable chronological event log across all workspace initiatives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none shadow-sm"
            >
              <option value="all">All Events</option>
              <option value="task_completed">Task Completed</option>
              <option value="task_blocked">Task Blocked</option>
              <option value="project_created">Project Created</option>
              <option value="task_created">Task Created</option>
              <option value="milestone_reached">Milestone Reached</option>
            </select>
          </div>
        </div>

        {/* Timeline Log */}
        <Card className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No activity records found.</p>
          ) : (
            <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
              {activities.map((act) => (
                <div key={act._id} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-500 group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getIcon(act.type)}</div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {act.title}
                        </p>
                        {act.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {act.description}
                          </p>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                          Actor: {act.actor?.name || 'Alex Vance'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <span className="text-xs text-slate-400 font-mono">
                        {formatTimeAgo(act.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
