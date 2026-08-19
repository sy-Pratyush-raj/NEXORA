import React, { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import {
  User,
  Moon,
  Sun,
  Bell,
  Lock,
  LogOut,
  Sparkles,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Alex Vance');
  const [workspaceName, setWorkspaceName] = useState(user?.workspaceName || 'Nexora Core Workspace');
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    blockerAlerts: true,
    weeklyDigest: true,
    taskAssignments: true,
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/user/profile', {
        name,
        workspaceName,
        avatar,
        themePreference: theme,
      });
      updateUser(res.data.user);
      success('Settings updated', 'Profile and preferences synchronized.');
    } catch {
      toastError('Save Failed', 'Could not update profile preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    success('Signed out', 'Session closed.');
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Workspace Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your profile, team workspace preferences, and appearance.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
              <p className="text-xs text-slate-400">{user?.email || 'alex.vance@nexora.io'}</p>
              <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-semibold uppercase">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Workspace Name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                required
              />
            </div>

            <Input
              label="Avatar Image URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <div className="pt-2 flex justify-end">
              <Button type="submit" isLoading={isSaving}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Appearance & Theme Selector */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance</h3>
              <p className="text-xs text-slate-500">
                Switch between high-contrast dark mode and silky light mode.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'dark'
                  ? 'border-brand-500 bg-brand-500/10 text-white shadow-glow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-brand-400" />
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Deep Obsidian (Dark)</p>
                  <p className="text-xs text-slate-400">Calibrated for night focus</p>
                </div>
              </div>
              {theme === 'dark' && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
            </button>

            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'light'
                  ? 'border-brand-500 bg-brand-500/10 shadow-glow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Crisp Slate (Light)</p>
                  <p className="text-xs text-slate-400">High-clarity daylight palette</p>
                </div>
              </div>
              {theme === 'light' && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
            </button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Blocker Aging Alerts (48h threshold)
                </p>
                <p className="text-[11px] text-slate-400">Receive alerts when tasks remain stalled</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.blockerAlerts}
                onChange={(e) =>
                  setNotifications({ ...notifications, blockerAlerts: e.target.checked })
                }
                className="w-4 h-4 rounded accent-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Weekly Engineering Velocity Digest
                </p>
                <p className="text-[11px] text-slate-400">Summary of completed deliverables and momentum</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={(e) =>
                  setNotifications({ ...notifications, weeklyDigest: e.target.checked })
                }
                className="w-4 h-4 rounded accent-brand-500"
              />
            </label>
          </div>
        </Card>

        {/* Danger Zone / Logout */}
        <Card className="p-6 border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">Account Session</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Terminate active JWT authentication session on this device.
            </p>
          </div>
          <Button variant="danger" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out of Nexora
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};
