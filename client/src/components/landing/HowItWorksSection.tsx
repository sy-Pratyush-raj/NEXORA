import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Radio, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Connect your work',
      description: 'Bring projects and tasks together.',
      details: 'Organize your active initiatives into projects with defined leads, target milestones, and priority tiers.',
      icon: GitBranch,
    },
    {
      num: '02',
      title: "Understand what's happening",
      description: 'Nexora organizes activity and surfaces important signals.',
      details: 'Automated telemetry tracks task aging, blocker bottlenecks, and sprint velocity to provide an accurate health score.',
      icon: Radio,
    },
    {
      num: '03',
      title: 'Take action',
      description: 'Turn insights into your next best action.',
      details: 'Execute high-impact mitigations directly. Unblock stalled tasks, shift milestones, and communicate with clarity.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" size="md" className="mb-4">
            Workflow Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Nexora works.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A continuous loop from raw project activities to synthesized intelligence and decisive execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative rounded-2xl p-8 bg-white dark:bg-[#0E1424] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between group hover:border-brand-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-300 dark:text-slate-800 font-mono group-hover:text-brand-500/30 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {step.description}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
