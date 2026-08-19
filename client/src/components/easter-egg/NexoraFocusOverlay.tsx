import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Shield, Zap, X } from 'lucide-react';

interface NexoraFocusOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NexoraFocusOverlay: React.FC<NexoraFocusOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-[#0C101B] to-black border border-brand-500/40 shadow-glow-lg overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold uppercase tracking-wider">
                      Secret Protocol Activated
                    </span>
                    <span className="text-xs text-slate-500 font-mono">v2.4.0</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5 tracking-tight">
                    Nexora Executive Focus Stream
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-brand-400">
                  <Terminal className="w-4 h-4" />
                  <span>INTELLIGENCE STREAM INITIALIZED</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-sans text-sm">
                  You discovered the hidden Nexora trigger! This mode is designed for rapid executive synthesis: filtering low-signal noise, aggregating multi-repository blockers, and orchestrating sprint velocity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-sans font-semibold text-xs">
                    <Zap className="w-3.5 h-3.5" />
                    Momentum Sync
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">94.2%</div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">Workspace efficiency</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-sans font-semibold text-xs">
                    <Shield className="w-3.5 h-3.5" />
                    Blocker Resolver
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">03 Active</div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">Mitigation pathways ready</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 font-sans font-semibold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Engine Status
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white font-mono">Nominal</div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">Sub-50ms latency</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-medium text-sm transition-all shadow-glow-sm"
              >
                Return to Workspace
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
