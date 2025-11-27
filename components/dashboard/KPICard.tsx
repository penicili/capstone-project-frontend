'use client';

import { KPIMetric } from '@/types/dashboard';

interface KPICardProps {
  metric: KPIMetric;
}

export default function KPICard({ metric }: KPICardProps) {
  const { title, value, unit, change, changeType, description } = metric;

  const formatValue = (val: number | string) => {
    if (typeof val === 'number' && unit === 'Rp') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(val);
    }
    return val;
  };

  const getChangeColor = () => {
    if (!changeType) return 'text-gray-600';
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    if (!changeType) return null;
    if (changeType === 'increase') {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
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

      {change !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <span className={`flex items-center text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500">vs last period</span>
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
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

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
        className="text-blue-500"
      />
    </svg>
  );
}
