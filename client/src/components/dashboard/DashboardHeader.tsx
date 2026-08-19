import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Sparkles,
  User as UserIcon,
  LogOut,
  Settings,
  Plus,
  Menu,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  onOpenNewTaskModal?: () => void;
  onOpenNewProjectModal?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  onOpenNewTaskModal,
  onOpenNewProjectModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 dark:bg-[#090D18]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      {/* Left: Mobile Sidebar Trigger & Global Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 lg:hidden rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden sm:flex items-center w-64 md:w-80">
          <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, tasks, or insights..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-400 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Quick Action Buttons, Theme, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Quick Add Project / Task Buttons */}
        {onOpenNewTaskModal && (
          <button
            onClick={onOpenNewTaskModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          </button>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <span className="hidden md:inline-block text-xs font-semibold text-slate-700 dark:text-slate-200">
              {user?.name?.split(' ')[0] || 'Alex'}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 p-1.5 rounded-2xl bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">{user?.name || 'Alex Vance'}</p>
                <p className="text-slate-400 truncate mt-0.5">{user?.email || 'alex.vance@nexora.io'}</p>
                <Badge variant="brand" size="sm" className="mt-2">
                  {user?.workspaceName || 'Core Workspace'}
                </Badge>
              </div>

              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Workspace Settings
                </Link>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
