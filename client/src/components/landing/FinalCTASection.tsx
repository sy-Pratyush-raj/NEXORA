import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/15 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0E1528] dark:via-[#090D18] dark:to-[#060910] border border-brand-500/30 dark:border-brand-500/30 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Production</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Clarity starts here.
          </h2>

          <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Bring your work into focus.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto font-semibold shadow-glow-md text-base"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Building →
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto text-base"
            >
              Explore Alex's Demo Workspace
            </Button>
          </div>

          <p className="mt-6 text-xs text-slate-400 font-mono">
            Persistent MERN Stack • Full CRUD • Zero Setup Required
          </p>
        </motion.div>
      </div>
    </section>
  );
};
