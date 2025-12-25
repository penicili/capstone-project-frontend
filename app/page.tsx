'use client';

import { useState, useEffect } from 'react';
import { fetchKPIData } from '@/lib/api';
import { KPIDashboardData } from '@/types/dashboard';
import KPISection from '@/components/dashboard/KPISection';
import PageHeader from '@/components/layout/PageHeader';

export default function Home() {
  const [kpiData, setKpiData] = useState<KPIDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <PageHeader
        title="Student Performance Metrics"
        description="Monitor key performance indicators from OULAD dataset"
        subtitle={kpiData ? `Last updated: ${new Date(kpiData.lastUpdated).toLocaleString()}` : undefined}
        breadcrumbs={[
          { label: 'Student Metrics' }
        ]}
        actions={
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-5 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Content */}
        <div className="space-y-6">
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
                className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30"
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
      </div>
    </div>
  );
}
