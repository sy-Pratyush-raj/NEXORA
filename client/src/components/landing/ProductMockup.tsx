import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Sparkles,
  Activity as ActivityIcon,
  Search,
  AlertTriangle,
  TrendingUp,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Zap,
  Filter,
  BarChart2,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProductMockup: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<'ATL' | 'NOV' | 'ORI'>('ATL');
  const [tasksState, setTasksState] = useState([
    { id: 1, title: 'Review API integration & rate limiting', status: 'done', proj: 'ATL' },
    { id: 2, title: 'Kafka event stream partition rebalancing', status: 'blocked', proj: 'ATL' },
    { id: 3, title: 'Schema validation for webhook ingress', status: 'blocked', proj: 'ATL' },
    { id: 4, title: 'Update landing page typography tokens', status: 'done', proj: 'ORI' },
  ]);

  const toggleTask = (id: number) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t))
    );
  };

  const projectDetails = {
    ATL: {
      name: 'Project Atlas',
      key: 'ATL',
      progress: 82,
      status: 'At Risk',
      statusVariant: 'risk' as const,
      lead: 'Alex Vance',
      desc: 'Core infrastructure overhaul, distributed telemetry and GraphQL migration.',
      insight: 'Atlas is slowing down: 2 tasks blocked over 48 hours. Staging firewall authorization pending.',
      recommendation: 'Move API integration ahead of documentation milestone.',
      velocity: [45, 52, 68, 74, 82, 79, 88],
    },
    NOV: {
      name: 'Project Nova',
      key: 'NOV',
      progress: 64,
      status: 'At Risk',
      statusVariant: 'risk' as const,
      lead: 'Sarah Chen',
      desc: 'Enterprise SAML SSO, role-based permissions matrix, and compliance audit.',
      insight: 'SAML SSO review deadline approaching in 5 days. Audit logging table pending storage ticket.',
      recommendation: 'Escalate DevOps storage allocation ticket immediately.',
      velocity: [30, 42, 50, 58, 64, 60, 64],
    },
    ORI: {
      name: 'Project Orion',
      key: 'ORI',
      progress: 91,
      status: 'Healthy',
      statusVariant: 'healthy' as const,
      lead: 'Marcus Thorne',
      desc: 'Design system tokens, unified micro-interaction suite, and mobile client parity.',
      insight: 'Orion velocity pacing 3 days ahead of target release date. Micro-interactions calibrated.',
      recommendation: 'Deploy release candidate to staging environment for design audit.',
      velocity: [60, 72, 80, 85, 89, 90, 96],
    },
  };

  const activeProj = projectDetails[selectedProject];

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-b from-slate-200/80 via-slate-300/40 to-slate-200/20 dark:from-slate-700/50 dark:via-[#131A2E]/60 dark:to-transparent shadow-2xl transition-all duration-300">
      {/* Outer Glow Ray */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-brand-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Application Container */}
      <div className="rounded-2xl overflow-hidden bg-white/95 dark:bg-[#070B14] border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-slate-100">
        {/* Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-[#05080F] border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
            <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline-block">
              nexora.workspace/alex-vance/telemetry
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              <Search className="w-3.5 h-3.5 text-brand-500" />
              <span className="hidden sm:inline">Search workspace...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE
            </span>
          </div>
        </div>

        {/* Inner Application Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-left">
          {/* Left Mini Sidebar */}
          <div className="hidden md:flex md:col-span-3 bg-slate-50/70 dark:bg-[#080C16] p-4 border-r border-slate-200 dark:border-slate-800/80 flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1.5 font-mono">
                Active Projects
              </div>
              {(['ATL', 'NOV', 'ORI'] as const).map((key) => {
                const p = projectDetails[key];
                const isSelected = selectedProject === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProject(key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold opacity-75">[{key}]</span>
                      <span>{p.name.replace('Project ', '')}</span>
                    </div>
                    <Badge variant={p.statusVariant} size="sm">
                      {p.progress}%
                    </Badge>
                  </button>
                );
              })}

              <div className="pt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1.5 font-mono">
                Workspace Lenses
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Signals & Insights</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-brand-500" />
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors cursor-pointer">
                <ActivityIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>Velocity Stream</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Alex Vance"
                  className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
                <div>
                  <p className="font-bold text-[11px] text-slate-900 dark:text-white">Alex Vance</p>
                  <p className="text-[10px] text-slate-400">Engineering Lead</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dynamic Viewport */}
          <div className="col-span-1 md:col-span-9 p-4 sm:p-6 space-y-5 bg-white/50 dark:bg-[#070B14]/80">
            {/* Top Project Focus Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded">
                    {activeProj.key}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {activeProj.name}
                  </h3>
                  <Badge variant={activeProj.statusVariant} size="sm">
                    {activeProj.status} ({activeProj.progress}%)
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{activeProj.desc}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-slate-400 font-mono">Click tab to switch:</span>
                {(['ATL', 'NOV', 'ORI'] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSelectedProject(k)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedProject === k
                        ? 'bg-brand-600 text-white shadow-glow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Trajectory Sparkline Graph */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <TrendingUp className="w-4 h-4 text-brand-500" />
                  <span>Velocity Trajectory (Sprint W34)</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                  {selectedProject === 'ORI' ? '+22% Pacing Ahead' : '-14% Blocker Impact'}
                </span>
              </div>

              <div className="h-16 flex items-end gap-2 pt-2">
                {activeProj.velocity.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      layout
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                      className={`w-full rounded-t ${
                        selectedProject === 'ORI'
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                          : idx >= 5
                          ? 'bg-gradient-to-t from-amber-600 to-yellow-400'
                          : 'bg-gradient-to-t from-brand-600 to-indigo-400'
                      }`}
                    />
                    <span className="text-[9px] text-slate-400 font-mono">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Tasks Checklist (Try clicking!) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white px-1">
                <span>Active Deliverables (Interactive)</span>
                <span className="text-[10px] text-slate-400 font-mono">Toggle state:</span>
              </div>
              <div className="space-y-1.5">
                {tasksState.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : task.status === 'blocked' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span
                        className={
                          task.status === 'done'
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 dark:text-slate-200 font-medium'
                        }
                      >
                        {task.title}
                      </span>
                    </div>
                    <Badge
                      variant={
                        task.status === 'done'
                          ? 'completed'
                          : task.status === 'blocked'
                          ? 'risk'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time AI Insight Diagnostic Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-transparent border border-amber-500/30 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-amber-500 uppercase tracking-wide">
                    AI Diagnostic
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">• {activeProj.key}</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeProj.insight}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px]">
                  <span className="font-semibold text-brand-500">Action:</span> {activeProj.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
