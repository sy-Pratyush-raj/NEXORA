import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  CheckSquare,
  Clock,
  Bell,
  ArrowDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ChaosToClaritySection: React.FC = () => {
  const [viewState, setViewState] = useState<'chaos' | 'clarity'>('clarity');

  const chaosItems = [
    { icon: CheckSquare, title: 'Scattered Tasks', desc: '14 issues untracked across 3 trackers', color: 'text-rose-400' },
    { icon: MessageSquare, title: 'Chat Noise', desc: '42 unread updates in random channels', color: 'text-amber-400' },
    { icon: FileText, title: 'Outdated Docs', desc: 'Architecture specs missing blocker context', color: 'text-blue-400' },
    { icon: Clock, title: 'Missed Deadlines', desc: 'Silent bottlenecks caught too late', color: 'text-red-400' },
    { icon: Bell, title: 'Alarm Fatigue', desc: 'Notifications with zero actionable priority', color: 'text-purple-400' },
  ];

  const clarityItems = [
    { title: 'Unified Prioritization', desc: 'Clear top 3 actions for today across every project', icon: Zap },
    { title: 'Automated Blocker Detection', desc: 'Stalled tasks flagged after 48h before delivery is impacted', icon: Sparkles },
    { title: 'Deterministic Team Momentum', desc: 'Real-time velocity trajectory with verifiable completion dates', icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-slate-900/20 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From chaos to clarity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Work scatters across chats, documents, spreadsheets, and issue trackers. Nexora synthesizes the noise into a singular source of truth.
          </p>

          {/* Interactive Toggle Pill */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setViewState('chaos')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewState === 'chaos'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              The Chaos
            </button>
            <button
              onClick={() => setViewState('clarity')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewState === 'clarity'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              The Nexora Clarity
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="relative max-w-4xl mx-auto">
          {viewState === 'chaos' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {chaosItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0D1220] border border-rose-500/25 shadow-lg space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                );
              })}
              <div className="p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-950/20 border border-dashed border-rose-500/40 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-mono text-rose-400 font-bold uppercase">Signal Lost in Noise</span>
                <span className="text-[11px] text-slate-400 mt-1">High cognitive overhead</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Central Nexora Engine Transformer */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0C1222] dark:via-[#090D18] dark:to-[#050810] border border-brand-500/40 shadow-glow-lg text-center relative overflow-hidden metallic-border">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-mono font-bold mb-4">
                  <Layers className="w-3.5 h-3.5" />
                  NEXORA SYNTHESIS CORE
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-4">
                  {clarityItems.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-brand-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-brand-500 dark:text-brand-400 font-bold text-sm">
                          <Icon className="w-4 h-4" />
                          <span>{c.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{c.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    INPUT: Multi-repository commit & task noise
                  </span>
                  <span className="text-emerald-500 font-mono font-bold">
                    OUTPUT: Decisive actionable engineering flow
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
