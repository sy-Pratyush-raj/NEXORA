import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Play, Shield, Activity, Zap, Search } from 'lucide-react';
import { Button } from '../common/Button';
import { ProductMockup } from './ProductMockup';
import { CommandMenuModal } from '../common/CommandMenuModal';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Animated Light Grid & Conic Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] sm:w-[950px] sm:h-[500px] bg-gradient-to-tr from-brand-600/25 via-cyan-500/15 to-purple-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-mask opacity-60 pointer-events-none -z-10" />

      {/* Floating Telemetry Chips */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden xl:flex absolute left-8 top-1/3 items-center gap-3 p-3 rounded-2xl glass-panel shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 hover:scale-105 transition-transform"
      >
        <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
          <Zap className="w-4 h-4" />
        </div>
        <div className="text-left text-xs">
          <p className="font-bold text-slate-900 dark:text-white">Orion Velocity</p>
          <p className="text-[11px] text-emerald-500 font-mono font-semibold">91% • +3 days ahead</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden xl:flex absolute right-8 top-1/3 items-center gap-3 p-3 rounded-2xl glass-panel shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 hover:scale-105 transition-transform"
      >
        <div className="p-2 rounded-lg bg-amber-500/15 text-amber-500">
          <Activity className="w-4 h-4" />
        </div>
        <div className="text-left text-xs">
          <p className="font-bold text-slate-900 dark:text-white">Atlas Blocker</p>
          <p className="text-[11px] text-amber-500 font-mono font-semibold">48h Threshold Flagged</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Telemetry Beacon Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold tracking-wide mb-6 shadow-sm hover:border-brand-500/50 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-slate-800 dark:text-slate-200">Continuous Workspace Intelligence</span>
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span className="text-brand-500 font-mono">v2.4 Production</span>
        </motion.div>

        {/* Primary Value Proposition Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          Turn scattered work into{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 via-cyan-400 to-indigo-400">
            clear direction.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Nexora brings your projects, tasks and activity together, then turns the noise into actionable insights.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto font-semibold shadow-glow-md text-base"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Building →
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsCommandOpen(true)}
            className="w-full sm:w-auto text-base"
            leftIcon={<Search className="w-4 h-4 text-brand-500" />}
          >
            Quick Spotlight (⌘K)
          </Button>
        </motion.div>

        {/* Honest Assurance Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-xs text-slate-400 font-mono"
        >
          Full-Stack MERN Architecture • Live Persistent Database • Zero Setup Required
        </motion.p>

        {/* Live Product Mockup Render */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 sm:mt-16"
        >
          <ProductMockup />
        </motion.div>
      </div>

      <CommandMenuModal isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </section>
  );
};
