import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, Zap, Radio } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const AIInsightsSection: React.FC = () => {
  const [resolved, setResolved] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="insights" className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Continuous Telemetry Stream</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nexora sees what you might miss.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Instead of forcing you to piece together scattered updates across multiple tools, Nexora surfaces underlying risks, bottlenecks, and high-impact actions automatically.
          </p>
        </div>

        {/* The Flagship AI Insight Showcase Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0B101E] border border-amber-500/30 shadow-2xl overflow-hidden metallic-border"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                      AI INSIGHT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• Project Atlas (ATL)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5 tracking-tight">
                    Project Atlas is slowing down.
                  </h3>
                </div>
              </div>

              <Badge variant="risk" size="sm">
                High Priority Signal
              </Badge>
            </div>

            {/* Diagnostic Details */}
            <div className="py-6 space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B14] border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4" />
                  <span>3 tasks have been blocked for more than 2 days.</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  The upstream firewall authorization on the staging subnet has delayed the distributed Kafka stream ingestion tests.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/25 space-y-2">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs">
                  <Zap className="w-4 h-4" />
                  <span>Suggested action:</span>
                </div>
                <p className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  Move API integration ahead of the documentation milestone to unblock team throughput.
                </p>
              </div>
            </div>

            {/* Card Interactive Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                {resolved ? '✓ Action dispatched to sprint backlog' : 'Simulated product diagnostic'}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setResolved(!resolved)}
                  className="w-full sm:w-auto"
                >
                  {resolved ? 'Reopen Signal' : 'Apply Suggested Action'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/projects')}
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Review project →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
