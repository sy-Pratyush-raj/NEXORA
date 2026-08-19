import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface TaskCompletionChartProps {
  data?: { name: string; count: number; color: string }[];
}

export const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const defaultData = [
    { name: 'Completed', count: 18, color: '#10B981' },
    { name: 'In Progress', count: 9, color: '#6366F1' },
    { name: 'Blocked', count: 3, color: '#F59E0B' },
    { name: 'Todo', count: 12, color: '#94A3B8' },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? '#1E293B' : '#E2E8F0'}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#CBD5E1',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
            labelStyle={{ color: isDark ? '#F1F5F9' : '#0F172A', fontWeight: 700 }}
            formatter={(value: any) => [`${value} Tasks`, 'Count']}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
