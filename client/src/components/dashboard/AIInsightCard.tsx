import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AlertTriangle, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { AIInsight } from '../../types';
import { useNavigate } from 'react-router-dom';

interface AIInsightCardProps {
  insight: AIInsight;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  const navigate = useNavigate();

  const isWarning = insight.type === 'warning' || insight.type === 'risk';

  return (
    <Card
      glow
      className={`p-5 space-y-3.5 border ${
        isWarning
          ? 'border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent'
          : 'border-brand-500/30 bg-gradient-to-r from-brand-500/5 via-transparent to-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isWarning ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-500/10 text-brand-500'
            }`}
          >
            {isWarning ? <AlertTriangle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            {insight.category}
          </span>
        </div>
        <Badge variant={isWarning ? 'risk' : 'healthy'} size="sm">
          {insight.impact}
        </Badge>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
          {insight.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          {insight.description}
        </p>
      </div>

      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Suggested Action: </span>
        <span className="text-slate-600 dark:text-slate-400">{insight.suggestedAction}</span>
      </div>

      <div className="pt-1 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate('/projects')}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          {insight.actionLabel}
        </Button>
      </div>
    </Card>
  );
};
