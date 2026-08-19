import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Sparkles,
  Activity,
  Settings,
  Layers,
  ChevronRight,
  Plus,
  Home,
  X,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/projects', label: 'Projects', icon: FolderKanban, count: '4' },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare, badge: '3 risk', badgeVariant: 'risk' as const },
    { to: '/insights', label: 'Insights', icon: Sparkles, badge: 'Live', badgeVariant: 'brand' as const },
    { to: '/activity', label: 'Activity', icon: Activity },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const quickProjects = [
    { name: 'Atlas', key: 'ATL', status: 'risk' as const, progress: 82 },
    { name: 'Nova', key: 'NOV', status: 'risk' as const, progress: 64 },
    { name: 'Orion', key: 'ORI', status: 'healthy' as const, progress: 91 },
    { name: 'Aurora', key: 'AUR', status: 'healthy' as const, progress: 48 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#0A0E1A] border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 dark:border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                NEXORA
              </span>
            </Link>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 font-mono">
              Core Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <Badge variant={item.badgeVariant || 'neutral'} size="sm">
                      {item.badge}
                    </Badge>
                  ) : item.count ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {item.count}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>

          {/* Quick Active Projects */}
          <div className="px-4 pt-2 space-y-1">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Active Projects
              </span>
              <Link to="/projects" className="text-[10px] text-brand-500 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-1">
              {quickProjects.map((p) => (
                <Link
                  key={p.key}
                  to={`/projects`}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400">[{p.key}]</span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <Badge variant={p.status} size="sm">
                    {p.progress}%
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Home & Status Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
