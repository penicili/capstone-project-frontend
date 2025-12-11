import { KPIDashboardData, KPIMetric } from '@/types/dashboard';
import { API_BASE_URL } from './config';

// Backend KPI response structure
interface BackendKPI {
  kpi_id: number;
  name: string;
  value: number | string;
  unit: string;
  category: string;
  definition: string;
}

// Target values for each KPI (set in frontend)
const KPI_TARGETS: Record<string, number> = {
  'Login Frequency': 1500,
  'Active Learning Time': 500,
  'Material Access Rate': 80,
  'Course Engagement Score': 75,
  'Attendance Consistency': 85,
  'Task Completion Ratio': 80,
  'Assignment Timeliness': 75,
  'Quiz Participation Rate': 85,
  'Grade Performance Index': 70,
  'Low Activity Alert Index': 15, // lower is better
  'Predicted Dropout Risk': 20, // lower is better
};

/**
 * Fetch KPI dashboard data from new endpoint
 */
export async function fetchKPIData(): Promise<KPIDashboardData> {
  try {
    const response = await fetch(`${API_BASE_URL}/kpi/metrics`, {
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
    const backendKPIs: BackendKPI[] = result.data;
    
    // Group KPIs by category
    const categoriesMap = new Map<string, KPIMetric[]>();
    
    backendKPIs.forEach((kpi) => {
      const metric: KPIMetric = {
        id: `kpi-${kpi.kpi_id}`,
        title: kpi.name,
        value: typeof kpi.value === 'string' ? Number(kpi.value) : kpi.value,
        unit: kpi.unit,
        target: KPI_TARGETS[kpi.name],
        description: kpi.definition,
      };
      
      if (!categoriesMap.has(kpi.category)) {
        categoriesMap.set(kpi.category, []);
      }
      categoriesMap.get(kpi.category)!.push(metric);
    });
    
    // Convert map to array format
    const categories = Array.from(categoriesMap.entries()).map(([category, metrics]) => ({
      category,
      metrics,
    }));

    const transformedData: KPIDashboardData = {
      categories,
      lastUpdated: new Date().toISOString(),
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    throw error;
  }
}
