'use client';

import { useState, useEffect } from 'react';
import { fetchKPIData } from '@/lib/api';
import { KPIDashboardData } from '@/types/dashboard';
import KPISection from '@/components/dashboard/KPISection';
import PredictionForm from '@/components/dashboard/PredictionForm';

export default function Home() {
  const [kpiData, setKpiData] = useState<KPIDashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'kpi' | 'predict'>('predict');

  // Load KPI data only when KPI tab is first accessed
  useEffect(() => {
    if (activeTab === 'kpi' && !kpiData && !loading && !error) {
      loadDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const kpi = await fetchKPIData();

      setKpiData(kpi);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

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
            {activeTab === 'kpi' && (
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh KPI
              </button>
            )}
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
              onClick={() => setActiveTab('predict')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'predict'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              Prediction Model
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'kpi' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Key Performance Indicators</h2>
                {kpiData && (
                  <p className="text-gray-600">
                    Last updated: {new Date(kpiData.lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
              
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    <p className="mt-4 text-gray-600">Loading KPI data...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="text-red-600 text-5xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading KPI Data</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {kpiData && !loading && !error && (
                <div className="space-y-8">
                  {kpiData.categories.map((category) => (
                    <KPISection key={category.category} category={category} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'predict' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Prediction Model</h2>
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
