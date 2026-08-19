import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, RefreshCw, Flag, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ActivityTimelineSection: React.FC = () => {
  const activities = [
    {
      actor: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      action: 'completed API integration',
      time: '8 minutes ago',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      tag: 'ATL-204',
    },
    {
      actor: 'Alex Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action: 'moved Project Atlas to review',
      time: '24 minutes ago',
      icon: RefreshCw,
      color: 'text-blue-500',
      tag: 'Stage 2',
    },
    {
      actor: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      action: 'created new milestone: Enterprise SSO Specs',
      time: '1 hour ago',
      icon: Flag,
      color: 'text-amber-500',
      tag: 'Milestone',
    },
    {
      actor: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      action: 'completed design review for dark mode palette',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      tag: 'ORI-102',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Audit Stream
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Real-time workspace activity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A chronological timeline of project and task lifecycle events. Every milestone and state transition recorded with clarity.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
              {activities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Circle Node Indicator */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-500 group-hover:scale-125 transition-transform" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.actor}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            <span className="text-brand-600 dark:text-brand-400">{item.actor}</span>{' '}
                            <span className="font-normal text-slate-600 dark:text-slate-300">{item.action}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Icon className={`w-4 h-4 ${item.color} flex-shrink-0 mt-1`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-mono">
                Simulated live stream of workspace engineering events
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
