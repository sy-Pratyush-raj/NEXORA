import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { MomentumPoint } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface MomentumChartProps {
  data?: MomentumPoint[];
}

export const MomentumChart: React.FC<MomentumChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const defaultData: MomentumPoint[] = [
    { date: 'Mon', velocity: 45, completedTasks: 3, plannedTasks: 5 },
    { date: 'Tue', velocity: 52, completedTasks: 5, plannedTasks: 6 },
    { date: 'Wed', velocity: 68, completedTasks: 8, plannedTasks: 10 },
    { date: 'Thu', velocity: 74, completedTasks: 6, plannedTasks: 8 },
    { date: 'Fri', velocity: 86, completedTasks: 12, plannedTasks: 14 },
    { date: 'Sat', velocity: 79, completedTasks: 4, plannedTasks: 5 },
    { date: 'Sun', velocity: 92, completedTasks: 9, plannedTasks: 10 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? '#1E293B' : '#E2E8F0'}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#CBD5E1',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
            itemStyle={{ color: '#6366F1', fontWeight: 600 }}
            labelStyle={{ color: isDark ? '#F1F5F9' : '#0F172A', fontWeight: 700 }}
            formatter={(value: any) => [`${value}% Velocity Score`, 'Momentum']}
          />
          <Area
            type="monotone"
            dataKey="velocity"
            stroke="#6366F1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#velocityGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
