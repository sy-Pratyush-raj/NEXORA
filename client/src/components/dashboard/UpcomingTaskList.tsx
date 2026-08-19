import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Task } from '../../types';
import { CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpcomingTaskListProps {
  tasks?: Task[];
  onToggleStatus?: (task: Task) => void;
}

export const UpcomingTaskList: React.FC<UpcomingTaskListProps> = ({
  tasks = [],
  onToggleStatus,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Done':
        return <Badge variant="completed" size="sm">Done</Badge>;
      case 'Blocked':
        return <Badge variant="risk" size="sm">Blocked</Badge>;
      case 'In Progress':
        return <Badge variant="brand" size="sm">In Progress</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Todo</Badge>;
    }
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Tasks</h3>
        <Link to="/tasks" className="text-xs text-brand-500 hover:underline font-medium">
          Manage all
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-xs text-slate-400 py-4 text-center">No tasks available.</p>
      ) : (
        <div className="space-y-2.5">
          {tasks.slice(0, 5).map((t) => {
            const isDone = t.status === 'Done';
            const isBlocked = t.status === 'Blocked';

            return (
              <div
                key={t._id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(t)}
                    className="flex-shrink-0 text-slate-400 hover:text-brand-500 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : isBlocked ? (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold truncate ${
                        isDone
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {typeof t.projectId === 'object' && t.projectId !== null
                        ? t.projectId.name
                        : 'Project'}
                      {t.assignee?.name && ` • ${t.assignee.name}`}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-2">{getStatusBadge(t.status)}</div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
