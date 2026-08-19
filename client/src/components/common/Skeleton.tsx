import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800/70',
        className
      )}
      {...props}
    />
  );
};
