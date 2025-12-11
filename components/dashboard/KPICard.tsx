'use client';

import { KPIMetric } from '@/types/dashboard';

interface KPICardProps {
  metric: KPIMetric;
}

export default function KPICard({ metric }: KPICardProps) {
  const { title, value, unit, target, description } = metric;

  const formatValue = (val: number | string) => {
    if (typeof val === 'number' && unit === 'Rp') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(val);
    }
    if (typeof val === 'number') {
      return new Intl.NumberFormat('en-US').format(val);
    }
    return val;
  };

  // Calculate target achievement percentage
  const getTargetAchievement = () => {
    if (target === undefined || target === null || typeof value !== 'number') return null;
    const targetNum = typeof target === 'string' ? parseFloat(target) : target;
    if (isNaN(targetNum) || targetNum === 0) return null;
    const percentage = ((value / targetNum) * 100).toFixed(1);
    const diff = value - targetNum;
    const isAchieved = value >= targetNum;
    return { percentage: parseFloat(percentage), diff, isAchieved };
  };

  const targetData = getTargetAchievement();

  const getAchievementColor = () => {
    if (!targetData) return 'text-gray-600';
    if (targetData.isAchieved) return 'text-green-600';
    if (targetData.percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAchievementIcon = () => {
    if (!targetData) return null;
    if (targetData.isAchieved) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-red-500 hover:border-red-600">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">
              {formatValue(value)}
            </h3>
            {unit && unit !== 'Rp' && (
              <span className="text-sm text-gray-500">{unit}</span>
            )}
          </div>
        </div>
      </div>

      {targetData && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className={`flex items-center gap-1 text-sm font-medium ${getAchievementColor()}`}>
              {getAchievementIcon()}
              {targetData.percentage}% of target
            </span>
            <span className="text-xs text-gray-500">
              Target: {formatValue(target!)}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                targetData.isAchieved
                  ? 'bg-green-500'
                  : targetData.percentage >= 80
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(targetData.percentage, 100)}%` }}
            />
          </div>
        </div>
      )}

      {description && (
        <p className="mt-2 text-xs text-gray-500">
          {description}
        </p>
      )}

      {/* Mini sparkline visualization (optional) */}
      {metric.trend && metric.trend.length > 0 && (
        <div className="mt-4">
          <MiniSparkline data={metric.trend} />
        </div>
      )}
    </div>
  );
}

// Simple sparkline component
function MiniSparkline({ data }: { data: number[] }) {
  if (!data || data.length < 2) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Avoid division by zero
  if (range === 0) {
    return (
      <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="currentColor"
          strokeWidth="2"
          className="text-red-500"
        />
      </svg>
    );
  }

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-red-500"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
