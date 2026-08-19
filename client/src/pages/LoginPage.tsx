import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Mail, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, demoLogin } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      success('Welcome back to Nexora!', 'Workspace synchronized.');
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      setError(msg);
      toastError('Authentication Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError('');
    try {
      await demoLogin();
      success('Logged in as Alex Vance', 'Loaded full demo workspace portfolio.');
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Could not connect to demo workspace.';
      setError(msg);
      toastError('Demo Login Failed', msg);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            NEXORA
          </span>
        </Link>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sign in to your workspace
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Or{' '}
          <Link to="/register" className="font-semibold text-brand-500 hover:underline">
            create a new workspace
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="rounded-2xl bg-white dark:bg-[#0E1424] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          {/* 1-Click Demo Button */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-transparent border border-brand-500/30 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Reviewer Access</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              One-click instant login with Alex Vance's pre-seeded portfolio.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDemoLogin}
              isLoading={demoLoading}
              className="w-full mt-2 font-semibold"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Sign in as Alex Vance (Demo)
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#0E1424] px-3 text-xs text-slate-400 font-mono uppercase">
              Or sign in with email
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="alex.vance@nexora.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="secondary"
              size="md"
              isLoading={isLoading}
              className="w-full font-semibold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 font-mono">
          Nexora Engineering Platform • v2.4
        </p>
      </div>
    </div>
  );
};
