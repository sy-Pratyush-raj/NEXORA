import React from 'react';
import { Card } from '../common/Card';
import { ActivityItem } from '../../types';
import { formatTimeAgo } from '../../utils/helpers';
import { CheckCircle2, RefreshCw, Flag, AlertCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityFeedProps {
  activities?: ActivityItem[];
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = [], limit = 5 }) => {
  const displayActivities = activities.slice(0, limit);

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'task_blocked':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'project_created':
      case 'task_created':
        return <PlusCircle className="w-4 h-4 text-brand-500" />;
      case 'milestone_reached':
        return <Flag className="w-4 h-4 text-purple-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        <Link to="/activity" className="text-xs text-brand-500 hover:underline font-medium">
          View all
        </Link>
      </div>

      {displayActivities.length === 0 ? (
        <p className="text-xs text-slate-400 py-4 text-center">No recent activity recorded.</p>
      ) : (
        <div className="space-y-3">
          {displayActivities.map((act) => (
            <div
              key={act._id}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(act.type)}</div>
              <div className="flex-1 min-w-0 text-xs">
                <p className="font-semibold text-slate-900 dark:text-white truncate">
                  {act.title}
                </p>
                {act.description && (
                  <p className="text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {act.description}
                  </p>
                )}
                <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                  {formatTimeAgo(act.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
