import React from 'react';
import { cn } from '../../utils/helpers';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'healthy' | 'risk' | 'delayed' | 'completed' | 'neutral' | 'brand' | 'urgent';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
}) => {
  const variants = {
    healthy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    risk: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    delayed: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    completed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    neutral: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
    urgent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  };

  const dotColors = {
    healthy: 'bg-emerald-500',
    risk: 'bg-amber-500',
    delayed: 'bg-rose-500',
    completed: 'bg-blue-500',
    neutral: 'bg-slate-400',
    brand: 'bg-brand-500',
    urgent: 'bg-red-500 animate-ping',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
