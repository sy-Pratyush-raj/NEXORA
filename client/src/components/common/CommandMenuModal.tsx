import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderKanban, CheckSquare, Sparkles, Activity, Settings, ArrowRight, X, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const commands = [
    { id: '1', title: 'Open Project Atlas', category: 'Projects', route: '/projects', icon: FolderKanban, badge: '82% • At Risk' },
    { id: '2', title: 'Open Project Nova', category: 'Projects', route: '/projects', icon: FolderKanban, badge: '64% • At Risk' },
    { id: '3', title: 'Open Project Orion', category: 'Projects', route: '/projects', icon: FolderKanban, badge: '91% • Healthy' },
    { id: '4', title: 'Review Blocked Tasks', category: 'Tasks', route: '/tasks', icon: CheckSquare, badge: '2 Blocked' },
    { id: '5', title: 'Telemetry Velocity Insights', category: 'Signals', route: '/insights', icon: Sparkles, badge: 'Live Stream' },
    { id: '6', title: 'Workspace Audit Log', category: 'Activity', route: '/activity', icon: Activity, badge: 'Chronological' },
    { id: '7', title: 'Workspace Settings & Themes', category: 'Preferences', route: '/settings', icon: Settings, badge: 'Config' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // toggle handled in parent or global
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#0C1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80">
              <Search className="w-4 h-4 text-brand-500 mr-3 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search workspace..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-400 mr-2">
                ESC
              </kbd>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No commands matching "{query}"
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd.route)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-brand-500 group-hover:bg-brand-500/10 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {cmd.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{cmd.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800">
                          {cmd.badge}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span>Navigation: <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">↓</kbd></span>
                <span>Select: <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">↵</kbd></span>
              </div>
              <span className="text-brand-500 font-semibold">Nexora Command Core</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
