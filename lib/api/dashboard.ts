import {
  ApiResponse,
  KPIDashboardData,
  PredictiveModelDashboardData,
} from '@/types/dashboard';

// Base API URL - ganti dengan URL backend Anda nanti
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Fetch KPI dashboard data
 */
export async function fetchKPIData(): Promise<KPIDashboardData> {
  try {
    const response = await fetch(`${API_BASE_URL}/kpi/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Uncomment jika butuh authentication
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<KPIDashboardData> = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch KPI data');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    // Return mock data untuk development
    return getMockKPIData();
  }
}

/**
 * Fetch predictive model dashboard data
 */
export async function fetchPredictiveModelData(): Promise<PredictiveModelDashboardData> {
  try {
    const response = await fetch(`${API_BASE_URL}/models/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<PredictiveModelDashboardData> = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch predictive model data');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching predictive model data:', error);
    // Return mock data untuk development
    return getMockPredictiveModelData();
  }
}

/**
 * Fetch specific model predictions
 */
export async function fetchModelPredictions(modelId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}/predictions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching predictions for model ${modelId}:`, error);
    throw error;
  }
}

/**
 * Refresh/retrain a specific model
 */
export async function retrainModel(modelId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}/retrain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error retraining model ${modelId}:`, error);
    throw error;
  }
}

// ========== MOCK DATA (untuk development) ==========

function getMockKPIData(): KPIDashboardData {
  return {
    categories: [
      {
        category: 'Student Engagement',
        metrics: [
          {
            id: 'total-students',
            title: 'Total Students',
            value: 28785,
            change: 8.3,
            changeType: 'increase',
            trend: [26000, 26500, 27200, 28000, 28785],
            description: 'Total enrolled students',
          },
          {
            id: 'active-students',
            title: 'Active Students',
            value: 24567,
            change: 5.7,
            changeType: 'increase',
            trend: [22000, 22800, 23500, 24000, 24567],
            description: 'Students with activity in last 7 days',
          },
          {
            id: 'avg-vle-clicks',
            title: 'Avg VLE Interactions',
            value: 1847,
            change: 12.4,
            changeType: 'increase',
            trend: [1500, 1600, 1700, 1780, 1847],
            description: 'Average VLE clicks per student',
          },
        ],
      },
      {
        category: 'Student Performance',
        metrics: [
          {
            id: 'pass-rate',
            title: 'Pass Rate',
            value: '68.5',
            unit: '%',
            change: 3.2,
            changeType: 'increase',
            trend: [64, 65, 66.5, 67.8, 68.5],
            description: 'Students passing assessments',
          },
          {
            id: 'avg-score',
            title: 'Average Score',
            value: 72.3,
            unit: 'pts',
            change: 2.8,
            changeType: 'increase',
            trend: [68, 69.5, 70.8, 71.5, 72.3],
            description: 'Mean assessment score',
          },
          {
            id: 'completion-rate',
            title: 'Completion Rate',
            value: '76.2',
            unit: '%',
            change: -1.5,
            changeType: 'decrease',
            trend: [79, 78.5, 77.8, 77, 76.2],
            description: 'Students completing courses',
          },
        ],
      },
      {
        category: 'Course Analytics',
        metrics: [
          {
            id: 'total-courses',
            title: 'Active Courses',
            value: 22,
            change: 0,
            changeType: 'neutral',
            description: 'Currently running courses',
          },
          {
            id: 'avg-course-engagement',
            title: 'Avg Engagement Rate',
            value: '82.4',
            unit: '%',
            change: 4.1,
            changeType: 'increase',
            trend: [76, 78, 79.5, 81, 82.4],
            description: 'Average student engagement per course',
          },
          {
            id: 'at-risk-students',
            title: 'At-Risk Students',
            value: 3842,
            change: -8.2,
            changeType: 'increase',
            trend: [4500, 4300, 4100, 3950, 3842],
            description: 'Students predicted to fail/withdraw',
          },
        ],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

function getMockPredictiveModelData(): PredictiveModelDashboardData {
  const today = new Date();
  
  // Student Pass/Fail predictions (percentage of students predicted to pass)
  const passPredictions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const baseValue = 68 + Math.random() * 8; // 68-76% pass rate
    return {
      date: date.toISOString().split('T')[0],
      actual: i < 15 ? 68 + Math.random() * 10 : undefined,
      predicted: baseValue,
      confidence: {
        lower: baseValue - 5,
        upper: baseValue + 5,
      },
    };
  });

  // Student withdrawal predictions (number of students at risk)
  const withdrawalPredictions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const baseValue = 150 + Math.random() * 50; // 150-200 students
    return {
      date: date.toISOString().split('T')[0],
      actual: i < 15 ? 145 + Math.random() * 60 : undefined,
      predicted: baseValue,
      confidence: {
        lower: baseValue * 0.8,
        upper: baseValue * 1.2,
      },
    };
  });

  // Assessment score predictions
  const scorePredictions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const baseValue = 70 + Math.random() * 15; // 70-85 points
    return {
      date: date.toISOString().split('T')[0],
      actual: i < 15 ? 68 + Math.random() * 18 : undefined,
      predicted: baseValue,
      confidence: {
        lower: baseValue - 8,
        upper: baseValue + 8,
      },
    };
  });

  return {
    models: [
      {
        id: 'student-performance',
        name: 'Student Performance Prediction',
        description: 'Predicts student pass/fail outcomes based on VLE engagement and assessment history',
        modelType: 'XGBoost Classifier',
        predictions: passPredictions,
        metrics: {
          accuracy: 89.7,
          mae: 0.082,
          rmse: 0.124,
          r2Score: 0.86,
        },
        features: ['VLE Clicks', 'Assessment Scores', 'Submission Time', 'Demographics', 'Previous Course History'],
        lastTrained: new Date(Date.now() - 86400000 * 2).toISOString(),
        nextUpdate: new Date(Date.now() + 86400000 * 5).toISOString(),
      },
      {
        id: 'withdrawal-prediction',
        name: 'Student Withdrawal Prediction',
        description: 'Identifies students at high risk of course withdrawal or dropout',
        modelType: 'Random Forest Classifier',
        predictions: withdrawalPredictions,
        metrics: {
          accuracy: 87.3,
          mae: 18.5,
          rmse: 24.7,
          r2Score: 0.82,
        },
        features: ['VLE Activity Decline', 'Assessment Submission Rate', 'Forum Participation', 'Login Frequency', 'Early Assessment Scores'],
        lastTrained: new Date(Date.now() - 86400000 * 3).toISOString(),
        nextUpdate: new Date(Date.now() + 86400000 * 4).toISOString(),
      },
      {
        id: 'assessment-score',
        name: 'Assessment Score Prediction',
        description: 'Predicts final assessment scores based on continuous assessment and VLE engagement',
        modelType: 'Neural Network (MLP)',
        predictions: scorePredictions,
        metrics: {
          accuracy: 91.4,
          mae: 6.8,
          rmse: 9.2,
          r2Score: 0.88,
        },
        features: ['Cumulative Assessment Score', 'VLE Engagement Level', 'Resource Access Pattern', 'Time Spent on Materials', 'Peer Interaction'],
        lastTrained: new Date(Date.now() - 86400000 * 1).toISOString(),
        nextUpdate: new Date(Date.now() + 86400000 * 6).toISOString(),
      },
    ],
    summary: {
      totalModels: 3,
      averageAccuracy: 89.47,
      lastUpdated: new Date().toISOString(),
    },
  };
}
