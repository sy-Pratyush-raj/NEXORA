import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Moon, Sun, Menu, X, ArrowRight, Sparkles, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { CommandMenuModal } from '../common/CommandMenuModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/80 dark:bg-[#070B14]/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              NEXORA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#product"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Product
            </a>
            <a
              href="#features"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              How it works
            </a>
            <a
              href="#insights"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Insights
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Command Trigger */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-brand-500" />
              <span>Spotlight</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-400" />}
                >
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-6 py-6 mt-2 space-y-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700 dark:text-slate-200">
              <a
                href="#product"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-500"
              >
                Product
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-500"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-500"
              >
                How it works
              </a>
              <a
                href="#insights"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-brand-500"
              >
                Insights
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full"
                  >
                    Sign Out ({user?.name})
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/register');
                    }}
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <CommandMenuModal isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
