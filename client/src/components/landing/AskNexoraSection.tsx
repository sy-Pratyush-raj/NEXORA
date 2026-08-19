import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, ArrowRight, Loader2, RefreshCw, Terminal, Command } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const AskNexoraSection: React.FC = () => {
  const [query, setQuery] = useState('Which project needs my attention?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasResult, setHasResult] = useState(false);
  const navigate = useNavigate();

  const handleAsk = () => {
    setIsAnalyzing(true);
    setHasResult(false);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
    }, 500);

    setTimeout(() => {
      setCurrentStep(3);
    }, 1000);

    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 1500);
  };

  const sampleQueries = [
    'Which project needs my attention?',
    'Show our healthiest project',
    'What tasks are currently blocked?',
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Natural Query Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ask Nexora.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Query your entire engineering portfolio in plain English. Nexora synthesizes multi-repository telemetry in milliseconds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Query Input Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 metallic-border">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about your workspace..."
                  className="w-full pl-4 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#060912] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-sm font-medium"
                />
              </div>
              <Button
                onClick={handleAsk}
                disabled={isAnalyzing || !query.trim()}
                className="w-full sm:w-auto px-6 py-3.5 font-semibold"
                rightIcon={isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {isAnalyzing ? 'Analyzing...' : 'Ask'}
              </Button>
            </div>

            {/* Quick Sample Questions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-mono">Suggested:</span>
              {sampleQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(q);
                    setTimeout(() => handleAsk(), 100);
                  }}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-brand-500/15 hover:text-brand-400 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Progress / Step-by-Step Analysis */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 font-mono text-xs"
              >
                <div className="text-brand-500 flex items-center gap-2 font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing workspace telemetry...</span>
                </div>

                <div className="space-y-1.5 pl-6 text-slate-500 dark:text-slate-400">
                  <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-emerald-500 font-semibold' : ''}`}>
                    {currentStep >= 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                    <span>Reviewing projects</span>
                  </div>
                  <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-emerald-500 font-semibold' : ''}`}>
                    {currentStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                    <span>Checking task activity</span>
                  </div>
                  <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-emerald-500 font-semibold' : ''}`}>
                    {currentStep >= 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                    <span>Looking for blockers</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Simulated Query Answer Card */}
            <AnimatePresence>
              {hasResult && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-cyan-500/5 to-transparent border border-brand-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-400" />
                      <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-wider">
                        Workspace Synthesis Output
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {query.includes('health')
                        ? 'Orion is currently your healthiest project at 91% completion.'
                        : 'Atlas needs attention.'}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {query.includes('health')
                        ? 'All 22 tasks are completed or pacing on schedule. Milestone target is comfortably within reach in 7 days.'
                        : 'Two tasks are currently blocked on infrastructure access, and its next milestone is approaching in 14 days.'}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <Button
                        size="sm"
                        onClick={() => navigate('/projects')}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {query.includes('health') ? 'View Orion →' : 'View Atlas →'}
                      </Button>
                      <button
                        onClick={handleAsk}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors font-mono"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Re-evaluate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
