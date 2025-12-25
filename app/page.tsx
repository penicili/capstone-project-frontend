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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Learning Analytics Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Monitor student performance and view predictive insights using OULAD dataset
              </p>
            </div>
            {activeTab === 'kpi' && (
              <button
                onClick={handleRefresh}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-sm p-1.5 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('kpi')}
              className={`px-6 py-3 font-medium transition-all rounded-xl ${
                activeTab === 'kpi'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              📊 Student Metrics
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className={`px-6 py-3 font-medium transition-all rounded-xl ${
                activeTab === 'predict'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              🔮 Prediction Model
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'kpi' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Key Performance Indicators</h2>
                {kpiData && (
                  <p className="text-slate-600 mt-1">
                    Last updated: {new Date(kpiData.lastUpdated).toLocaleString()}
                  </p>
                )}
              </div>
              
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-red-600"></div>
                    <p className="mt-4 text-slate-600 font-medium">Loading KPI data...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-red-100">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Error Loading KPI Data</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {kpiData && !loading && !error && (
                <div className="space-y-6">
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
                <h2 className="text-2xl font-bold text-slate-900">Prediction Model</h2>
                <p className="text-slate-600 mt-1">
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
