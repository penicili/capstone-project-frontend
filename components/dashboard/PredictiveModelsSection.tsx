'use client';

import { PredictiveModelDashboardData } from '@/types/dashboard';
import ModelPredictionChart from './ModelPredictionChart';
import ModelMetricsCard from './ModelMetricsCard';

interface PredictiveModelsSectionProps {
  data: PredictiveModelDashboardData;
}

export default function PredictiveModelsSection({ data }: PredictiveModelsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Predictive Models Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm opacity-90">Total Models</p>
            <p className="text-3xl font-bold">{data.summary.totalModels}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Average Accuracy</p>
            <p className="text-3xl font-bold">{data.summary.averageAccuracy.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Last Updated</p>
            <p className="text-lg font-medium">
              {new Date(data.summary.lastUpdated).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Individual Models */}
      {data.models.map((model) => (
        <div key={model.id} className="space-y-4">
          <ModelPredictionChart model={model} />
          <ModelMetricsCard metrics={model.metrics} modelName={model.name} />
        </div>
      ))}
    </div>
  );
}
