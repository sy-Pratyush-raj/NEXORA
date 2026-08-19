import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, User, Calendar, CheckSquare, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface ProjectInfo {
  id: string;
  name: string;
  key: string;
  status: 'Healthy' | 'At Risk';
  progress: number;
  lead: string;
  targetDate: string;
  description: string;
  tasksCompleted: string;
  keyBlocker?: string;
}

export const ProjectHealthSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('atlas');
  const navigate = useNavigate();

  const projects: ProjectInfo[] = [
    {
      id: 'atlas',
      name: 'Atlas',
      key: 'ATL',
      status: 'At Risk',
      progress: 82,
      lead: 'Alex Vance',
      targetDate: '14 days remaining',
      description: 'Core infrastructure overhaul, distributed telemetry and GraphQL gateway migration.',
      tasksCompleted: '14 / 18 tasks done',
      keyBlocker: 'Staging subnet firewall clearance from DevOps pending for 3 days.',
    },
    {
      id: 'nova',
      name: 'Nova',
      key: 'NOV',
      status: 'At Risk',
      progress: 64,
      lead: 'Sarah Chen',
      targetDate: '28 days remaining',
      description: 'Enterprise SSO, role-based permissions engine, and security compliance audit.',
      tasksCompleted: '14 / 22 tasks done',
      keyBlocker: 'Storage allocation ticket for audit logging table pending review.',
    },
    {
      id: 'orion',
      name: 'Orion',
      key: 'ORI',
      status: 'Healthy',
      progress: 91,
      lead: 'Marcus Thorne',
      targetDate: '7 days remaining',
      description: 'Design system tokens, unified micro-interaction suite, and mobile client parity.',
      tasksCompleted: '22 / 24 tasks done',
    },
  ];

  const active = projects.find((p) => p.id === selectedProject) || projects[0];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="brand" size="md" className="mb-4">
            Live Health Matrix
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transparent project health.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Click any project to inspect its underlying telemetry, blocker diagnostics, and delivery timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Project List / Selectors */}
          <div className="lg:col-span-5 space-y-3.5">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProject;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white dark:bg-[#101728] border-brand-500 shadow-glow-sm scale-[1.02]'
                      : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-slate-400">[{proj.key}]</span>
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {proj.name}
                      </span>
                    </div>
                    <Badge variant={proj.status === 'Healthy' ? 'healthy' : 'risk'} size="sm">
                      {proj.status}
                    </Badge>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Completion</span>
                      <span className={proj.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}>
                        {proj.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${proj.progress}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          proj.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Project Detail Card / Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0E1526] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-brand-500 font-bold uppercase">
                      Telemetry Inspection
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                      Project {active.name}
                    </h3>
                  </div>
                  <Badge variant={active.status === 'Healthy' ? 'healthy' : 'risk'} size="md">
                    {active.status} ({active.progress}%)
                  </Badge>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {active.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <User className="w-3.5 h-3.5" />
                      <span>Owner</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{active.lead}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Deadline</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{active.targetDate}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Throughput</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{active.tasksCompleted}</p>
                  </div>
                </div>

                {active.keyBlocker && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Flagged Blocker</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {active.keyBlocker}
                    </p>
                  </div>
                )}

                <div className="pt-3 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => navigate('/projects')}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Open in Workspace
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
