'use client';

import { ModelMetrics } from '@/types/dashboard';

interface ModelMetricsCardProps {
  metrics: ModelMetrics;
  modelName: string;
}

export default function ModelMetricsCard({ metrics, modelName }: ModelMetricsCardProps) {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBgColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-100 dark:bg-green-900';
    if (accuracy >= 80) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {modelName} - Performance Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Accuracy */}
        <div className={`${getAccuracyBgColor(metrics.accuracy)} rounded-lg p-4`}>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
            Accuracy
          </p>
          <p className={`text-3xl font-bold ${getAccuracyColor(metrics.accuracy)}`}>
            {metrics.accuracy.toFixed(1)}%
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                metrics.accuracy >= 90
                  ? 'bg-green-600'
                  : metrics.accuracy >= 80
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${metrics.accuracy}%` }}
            />
          </div>
        </div>

        {/* R² Score */}
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
            R² Score
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.r2Score.toFixed(3)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Goodness of fit
          </p>
        </div>

        {/* MAE */}
        <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
            MAE
          </p>
          <p className="text-2xl font-bold text-purple-600">
            {metrics.mae >= 1000
              ? `${(metrics.mae / 1000).toFixed(1)}K`
              : metrics.mae.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Mean Absolute Error
          </p>
        </div>

        {/* RMSE */}
        <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
            RMSE
          </p>
          <p className="text-2xl font-bold text-orange-600">
            {metrics.rmse >= 1000
              ? `${(metrics.rmse / 1000).toFixed(1)}K`
              : metrics.rmse.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Root Mean Square Error
          </p>
        </div>
      </div>

      {/* Metric Explanations */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <strong>Accuracy:</strong> Overall prediction correctness. 
          <strong className="ml-2">R²:</strong> How well the model fits the data (closer to 1 is better).
        </p>
      </div>
    </div>
  );
}
