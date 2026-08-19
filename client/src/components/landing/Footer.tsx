import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Github, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070A10] text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and Tagline Column */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                NEXORA
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Your work, understood. An intelligent workspace for modern product engineering teams to turn scattered project noise into decisive action.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Acdyon Engineering Challenge • Part 2</span>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Product
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#product" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Company
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  About
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  Engineering
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Legal
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  Security
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nexora Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400">
              Easter Egg: Type <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-brand-500 font-bold">NEXORA</kbd>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
