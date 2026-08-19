import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MomentumChart } from '../components/dashboard/MomentumChart';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { insightService, InsightPayload, AskNexoraResult } from '../services/insightService';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Send,
  Loader2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InsightsPage: React.FC = () => {
  const [data, setData] = useState<InsightPayload | null>(null);
  const [momentum, setMomentum] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ask Nexora State
  const [query, setQuery] = useState('Which project needs my attention?');
  const [isAsking, setIsAsking] = useState(false);
  const [queryResult, setQueryResult] = useState<AskNexoraResult | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const [insRes, momRes] = await Promise.all([
          insightService.getInsights(),
          insightService.getMomentum(),
        ]);
        setData(insRes);
        setMomentum(momRes);
      } catch (err) {
        console.error('Failed to load insights:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const handleAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsAsking(true);
    try {
      const res = await insightService.askNexora(query);
      setQueryResult(res);
    } catch {
      // fallback
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-500 font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Workspace Telemetry & Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Intelligence & Velocity Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated blocker diagnostics, delivery probability models, and velocity momentum.
          </p>
        </div>

        {/* Ask Nexora Natural Query Box */}
        <Card glow className="p-6 bg-gradient-to-r from-brand-500/10 via-indigo-500/5 to-transparent border-brand-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Ask Nexora Intelligence Core
            </h3>
          </div>

          <form onSubmit={handleAsk} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about project risks, velocity, or blockers..."
              className="flex-1 w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <Button
              type="submit"
              isLoading={isAsking}
              className="w-full sm:w-auto px-6 py-3"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Analyze
            </Button>
          </form>

          {queryResult && (
            <div className="mt-4 p-4 rounded-xl bg-white/80 dark:bg-[#0E1528] border border-brand-500/30 space-y-2 text-xs animate-in fade-in">
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                {queryResult.answer}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {queryResult.detail}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span>Telemetry Confidence: 99.4%</span>
                </div>
                <Link to={queryResult.recommendedAction.route}>
                  <Button size="sm">{queryResult.recommendedAction.label}</Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        {/* Project Momentum Chart */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Sprint Momentum Trajectory
                </h3>
                <p className="text-xs text-slate-400">Velocity index aggregated across active repos</p>
              </div>
            </div>
            <Badge variant="healthy" size="sm">
              92% Peak Velocity
            </Badge>
          </div>
          <MomentumChart data={momentum} />
        </Card>

        {/* Flagged AI Insights List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Active Workspace Insights ({data?.insights?.length || 0})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.insights?.map((ins) => (
              <AIInsightCard key={ins.id} insight={ins} />
            ))}
          </div>
        </div>

        {/* Blocked Tasks Diagnostics Table */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Blocked Tasks Diagnostics
                </h3>
                <p className="text-xs text-slate-400">Items stalled for more than 48 hours requiring intervention</p>
              </div>
            </div>
            <Badge variant="risk" size="sm">
              {data?.blockedTasks?.length || 0} Blockers Active
            </Badge>
          </div>

          {data?.blockedTasks && data.blockedTasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-mono">
                    <th className="pb-3 font-semibold">TASK</th>
                    <th className="pb-3 font-semibold">BLOCKER CAUSE</th>
                    <th className="pb-3 font-semibold">DURATION</th>
                    <th className="pb-3 font-semibold">ASSIGNEE</th>
                    <th className="pb-3 font-semibold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {data.blockedTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-900 dark:text-white pr-4">
                        {t.title}
                      </td>
                      <td className="py-3.5 text-amber-600 dark:text-amber-400 font-medium pr-4">
                        {t.reason}
                      </td>
                      <td className="py-3.5 font-mono text-slate-400 pr-4">
                        {t.blockedDays} days
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-300 pr-4">
                        {t.assignee}
                      </td>
                      <td className="py-3.5 text-right">
                        <Link to="/tasks">
                          <Button size="sm" variant="outline">
                            Unblock
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">Zero blocked tasks detected.</p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
