'use client';

import { useState, useEffect } from 'react';
import { fetchKPIData, fetchPredictiveModelData } from '@/lib/api/dashboard';
import { KPIDashboardData, PredictiveModelDashboardData } from '@/types/dashboard';
import KPISection from '@/components/dashboard/KPISection';
import PredictiveModelsSection from '@/components/dashboard/PredictiveModelsSection';
import PredictionForm from '@/components/dashboard/PredictionForm';

export default function Home() {
  const [kpiData, setKpiData] = useState<KPIDashboardData | null>(null);
  const [modelData, setModelData] = useState<PredictiveModelDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'kpi' | 'models' | 'predict'>('kpi');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [kpi, models] = await Promise.all([
        fetchKPIData(),
        fetchPredictiveModelData(),
      ]);

      setKpiData(kpi);
      setModelData(models);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-b-4 border-red-600">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Learning Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor student performance and view predictive insights using OULAD dataset
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('kpi')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'kpi'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              Student Metrics
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'models'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              Model Status
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'predict'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              Make Prediction
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'kpi' && kpiData && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Key Performance Indicators</h2>
                <p className="text-gray-600">
                  Last updated: {new Date(kpiData.lastUpdated).toLocaleString()}
                </p>
              </div>
              <div className="space-y-8">
                {kpiData.categories.map((category) => (
                  <KPISection key={category.category} category={category} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && modelData && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Predictive Models</h2>
                <p className="text-gray-600">
                  Last updated: {new Date(modelData.summary.lastUpdated).toLocaleString()}
                </p>
              </div>
              <PredictiveModelsSection data={modelData} />
            </div>
          )}

          {activeTab === 'predict' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Make a Prediction</h2>
                <p className="text-gray-600">
                  Enter student information to predict their final result or dropout risk
                </p>
              </div>
              <PredictionForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
