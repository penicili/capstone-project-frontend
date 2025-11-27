'use client';

import { PredictiveModel } from '@/types/dashboard';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface ModelPredictionChartProps {
  model: PredictiveModel;
}

export default function ModelPredictionChart({ model }: ModelPredictionChartProps) {
  // Format data untuk recharts
  const chartData = model.predictions.map((pred) => ({
    date: new Date(pred.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
    actual: pred.actual,
    predicted: pred.predicted,
    lowerBound: pred.confidence?.lower,
    upperBound: pred.confidence?.upper,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {model.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {model.description}
        </p>
      </div>

      {/* Model Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500">Model Type</p>
          <p className="text-sm font-medium text-gray-900">{model.modelType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Accuracy</p>
          <p className="text-sm font-medium text-green-600">{model.metrics.accuracy.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">R² Score</p>
          <p className="text-sm font-medium text-gray-900">
            {model.metrics.r2Score.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Last Trained</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(model.lastTrained).toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value.toFixed(0);
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number | string) => {
                if (typeof value === 'number') {
                  return new Intl.NumberFormat('id-ID').format(value);
                }
                return value;
              }}
            />
            <Legend />
            
            {/* Confidence interval */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#colorConfidence)"
              fillOpacity={1}
              name="Confidence Upper"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="url(#colorConfidence)"
              fillOpacity={1}
              name="Confidence Lower"
            />

            {/* Actual values */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Actual"
              connectNulls={false}
            />

            {/* Predicted values */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Features */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-2">Key Features:</p>
        <div className="flex flex-wrap gap-2">
          {model.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
