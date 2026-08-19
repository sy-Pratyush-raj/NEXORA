import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'healthy' | 'risk' | 'delayed' | 'completed' | 'neutral' | 'brand';
  icon: LucideIcon;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  badgeVariant = 'brand',
  icon: Icon,
}) => {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-500">
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-500 font-medium">{title}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
          {value}
        </p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </Card>
  );
};
