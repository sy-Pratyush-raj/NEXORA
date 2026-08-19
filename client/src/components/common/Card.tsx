import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 transition-all duration-200',
          'bg-white dark:bg-[#0F1523]/80 backdrop-blur-xl',
          'border border-slate-200/80 dark:border-slate-800/80',
          'shadow-card-light dark:shadow-card-dark',
          glow && 'glow-border hover:border-brand-500/40 hover:shadow-glow-sm',
          interactive && 'hover:translate-y-[-2px] cursor-pointer hover:border-slate-300 dark:hover:border-slate-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
