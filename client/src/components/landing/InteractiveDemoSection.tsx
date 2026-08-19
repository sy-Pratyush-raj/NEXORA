import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

type TabType = 'overview' | 'projects' | 'tasks' | 'insights';

export const InteractiveDemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
    { id: 'projects' as TabType, label: 'Projects', icon: FolderKanban },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'insights' as TabType, label: 'Insights', icon: Sparkles },
  ];

  return (
    <section id="demo-section" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand" size="md" className="mb-4">
            Interactive Product Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See your work differently.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Switch between core views to understand how Nexora synthesizes high-velocity team signals into immediate operational clarity.
          </p>
        </div>

        {/* Interactive Tab Switcher Bar */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800 max-w-xl mx-auto mb-8 shadow-inner overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDemoTabIndicator"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#151D2F] border border-slate-300/80 dark:border-slate-700 shadow-sm"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : ''}`} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Canvas Area */}
        <div className="relative rounded-2xl bg-white dark:bg-[#0C111D] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl min-h-[420px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Metric Summary Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">Active Projects</p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">4</p>
                    <span className="text-[11px] text-emerald-500 font-medium">100% on-track baseline</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">Tasks Completed</p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">58</p>
                    <span className="text-[11px] text-brand-500 font-medium">78% sprint completion</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">Upcoming Milestones</p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">3</p>
                    <span className="text-[11px] text-slate-400 font-medium">Within 14 days</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium">Projects At Risk</p>
                    <p className="text-2xl font-extrabold text-amber-500 mt-1">2</p>
                    <span className="text-[11px] text-amber-500 font-medium">Atlas, Nova flagged</span>
                  </div>
                </div>

                {/* Grid of Momentum & Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-brand-500" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          Project Velocity Momentum
                        </span>
                      </div>
                      <Badge variant="healthy" size="sm">
                        +18% this week
                      </Badge>
                    </div>
                    <div className="h-28 flex items-end gap-3 pt-3">
                      {[
                        { day: 'Mon', val: 50 },
                        { day: 'Tue', val: 65 },
                        { day: 'Wed', val: 78 },
                        { day: 'Thu', val: 70 },
                        { day: 'Fri', val: 92 },
                        { day: 'Sat', val: 84 },
                        { day: 'Sun', val: 95 },
                      ].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                          <div
                            style={{ height: `${item.val}%` }}
                            className="w-full bg-gradient-to-t from-brand-600 to-indigo-400 rounded-t-md transition-all duration-500"
                          />
                          <span className="text-[10px] text-slate-400 font-mono">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        Recent Workspace Activity
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Live Demo Stream</span>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Sarah completed API integration
                          </p>
                          <p className="text-slate-400 text-[11px]">8 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Project Atlas moved to review
                          </p>
                          <p className="text-slate-400 text-[11px]">24 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            New milestone created for Q3 Launch
                          </p>
                          <p className="text-slate-400 text-[11px]">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Active Projects Portfolio
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Demo Dataset</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Atlas */}
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">ATL</span>
                      <Badge variant="risk" size="sm">
                        At Risk
                      </Badge>
                    </div>
                    <div>
                      <h5 className="font-bold text-base text-slate-900 dark:text-white">Atlas</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Core infrastructure & telemetry engine</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-amber-500">82%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full w-[82%]" />
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Lead: Alex Vance</span>
                      <span>Target: In 14 days</span>
                    </div>
                  </div>

                  {/* Nova */}
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">NOV</span>
                      <Badge variant="risk" size="sm">
                        At Risk
                      </Badge>
                    </div>
                    <div>
                      <h5 className="font-bold text-base text-slate-900 dark:text-white">Nova</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Enterprise SAML SSO & authorization</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-amber-500">64%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full w-[64%]" />
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Lead: Sarah Chen</span>
                      <span>Target: In 28 days</span>
                    </div>
                  </div>

                  {/* Orion */}
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">ORI</span>
                      <Badge variant="healthy" size="sm">
                        Healthy
                      </Badge>
                    </div>
                    <div>
                      <h5 className="font-bold text-base text-slate-900 dark:text-white">Orion</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Design system & responsive client parity</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-emerald-500">91%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full w-[91%]" />
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Lead: Marcus Thorne</span>
                      <span>Target: In 7 days</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Workspace Task Matrix
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Real-time breakdown</span>
                </div>

                <div className="space-y-2.5">
                  {/* Completed Task */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-through opacity-75">
                          Update landing page
                        </p>
                        <p className="text-xs text-slate-400">Design token alignment & optical contrast calibration</p>
                      </div>
                    </div>
                    <Badge variant="completed" size="sm">
                      Completed
                    </Badge>
                  </div>

                  {/* In Progress Task */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Review API integration
                        </p>
                        <p className="text-xs text-slate-400">Validate OAuth token refresh backoff and rate limiter</p>
                      </div>
                    </div>
                    <Badge variant="brand" size="sm">
                      In progress
                    </Badge>
                  </div>

                  {/* Upcoming Task */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Prepare release notes
                        </p>
                        <p className="text-xs text-slate-400">Document breaking changes and migration guide for v2.4</p>
                      </div>
                    </div>
                    <Badge variant="neutral" size="sm">
                      Upcoming
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Workspace Intelligence Signals
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Automated Synthesis</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      <span>CRITICAL BLOCKER INSIGHT</span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Atlas velocity dropped by 14%
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      3 tasks have been blocked for more than 2 days on network security clearance. Staging migration is stalled.
                    </p>
                    <div className="pt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Recommendation: Move API integration ahead of documentation.
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 text-brand-500 font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>VELOCITY OPPORTUNITY</span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Orion pacing 3 days ahead
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Marcus completed responsive testing ahead of target. Team can lock release candidate earlier.
                    </p>
                    <div className="pt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                      Recommendation: Trigger staging deployment for design audit.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              This interactive demonstration runs directly on realistic demo data.
            </p>
            <Button
              size="sm"
              onClick={() => navigate('/register')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Open Live Workspace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
