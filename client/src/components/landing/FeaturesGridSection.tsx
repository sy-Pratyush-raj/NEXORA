import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Sparkles,
  Compass,
  Zap,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  ShieldAlert,
  BarChart2,
  GitBranch,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const FeaturesGridSection: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" size="md" className="mb-4">
            Product Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for engineering truth.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Four specialized intelligence layers designed to replace subjective status updates with direct, undeniable workspace telemetry.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Unified Workspace (Large 7 Columns) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0C1220] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between group hover:border-brand-500/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-500 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">01 • CORE</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Unified Workspace
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                "Keep projects, tasks and activity connected in one place."
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                Consolidates disconnected pull requests, tasks, and team discussions into a single continuous stream of verified project deliverables.
              </p>
            </div>

            {/* Live Interactive Bento Widget */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Multi-Repo Linkage</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  4 Repos Synced
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <p className="font-mono font-bold text-slate-900 dark:text-white">ATL</p>
                  <p className="text-[10px] text-amber-500">82%</p>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <p className="font-mono font-bold text-slate-900 dark:text-white">NOV</p>
                  <p className="text-[10px] text-amber-500">64%</p>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <p className="font-mono font-bold text-slate-900 dark:text-white">ORI</p>
                  <p className="text-[10px] text-emerald-500">91%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Intelligent Insights (5 Columns) */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0C1220] border border-amber-500/30 shadow-xl flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">02 • SIGNALS</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Intelligent Insights
              </h3>
              <p className="mt-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                "Surface blockers, trends and priorities automatically."
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Flags aging tasks exceeding 48 hours without progress, identifying bottlenecks before release deadlines are compromised.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>48-Hour Blocker Alert</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                Staging VPC subnet authorization is stalling 3 downstream integration tests.
              </p>
            </div>
          </div>

          {/* Card 3: Project Intelligence (5 Columns) */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0C1220] border border-emerald-500/30 shadow-xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">03 • TELEMETRY</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Project Intelligence
              </h3>
              <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                "Understand project health without digging through endless updates."
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculates objective health indices from real task velocity, completion throughput, and active milestone dates.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-emerald-500 font-mono">Orion Health Index</span>
                <span className="text-emerald-500 font-bold">91%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[91%]" />
              </div>
            </div>
          </div>

          {/* Card 4: Focused Execution (7 Columns) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0C1220] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between group hover:border-brand-500/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-500 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">04 • ACTION</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Focused Execution
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                "Turn insights into clear next actions."
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                Provides high-impact resolution pathways directly from telemetry cards, enabling engineering leads to re-prioritize in one click.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Recommended: Prioritize API integration
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-bold uppercase">
                1-Click Mitigation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
