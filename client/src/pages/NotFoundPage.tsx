import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-500 shadow-glow-sm mb-6">
        <Layers className="w-6 h-6" />
      </div>

      <span className="font-mono text-xs font-bold text-brand-500 uppercase tracking-widest">
        404 • Resource Not Found
      </span>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
        Lost in the telemetry?
      </h1>

      <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-md">
        The workspace path or project page you requested does not exist or has been archived.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link to="/">
          <Button variant="secondary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Homepage
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
