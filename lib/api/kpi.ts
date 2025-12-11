import { KPIDashboardData } from '@/types/dashboard';
import { API_BASE_URL } from './config';

/**
 * Fetch KPI dashboard data
 */
export async function fetchKPIData(): Promise<KPIDashboardData> {
  try {
    const response = await fetch(`${API_BASE_URL}/kpi/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch KPI data');
    }

    // Transform backend response to frontend format
    const backendData = result.data;
    const transformedData: KPIDashboardData = {
      categories: [
        {
          category: 'Student Performance',
          metrics: [
            {
              id: 'total-students',
              title: 'Total Students',
              value: backendData.student_performance?.total_students || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Total enrolled students',
            },
            {
              id: 'total-pass',
              title: 'Passed',
              value: backendData.student_performance?.total_pass || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Students who passed',
            },
            {
              id: 'total-distinction',
              title: 'Distinction',
              value: backendData.student_performance?.total_distinction || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Students with distinction',
            },
            {
              id: 'total-fail',
              title: 'Failed',
              value: backendData.student_performance?.total_fail || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Students who failed',
            },
            {
              id: 'total-withdrawn',
              title: 'Withdrawn',
              value: backendData.student_performance?.total_withdrawn || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Students who withdrew',
            },
            {
              id: 'avg-credits',
              title: 'Avg Credits',
              value: backendData.student_performance?.avg_credits || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Average studied credits',
            },
          ],
        },
        {
          category: 'VLE Engagement',
          metrics: [
            {
              id: 'total-clicks',
              title: 'Total VLE Clicks',
              value: backendData.vle_engagement?.total_clicks || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Total VLE interactions',
            },
            {
              id: 'avg-clicks',
              title: 'Avg Clicks per Student',
              value: backendData.vle_engagement?.avg_clicks_per_student || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Average clicks per student',
            },
            {
              id: 'active-students',
              title: 'Active Students',
              value: backendData.vle_engagement?.total_active_students || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Students with VLE activity',
            },
            {
              id: 'min-clicks',
              title: 'Min Clicks',
              value: backendData.vle_engagement?.min_clicks || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Minimum clicks by a student',
            },
            {
              id: 'max-clicks',
              title: 'Max Clicks',
              value: backendData.vle_engagement?.max_clicks || 0,
              change: 0,
              changeType: 'neutral',
              description: 'Maximum clicks by a student',
            },
          ],
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    throw error;
  }
}
