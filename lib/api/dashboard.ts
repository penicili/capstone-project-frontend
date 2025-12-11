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
    const response = await fetch(`${API_BASE_URL}/kpi/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const response = await fetch(`${API_BASE_URL}/models/status`, {
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

// ========== MOCK DATA (be blom jadi) ==========

function getMockKPIData(): KPIDashboardData {
  return {
    categories: [
      {
        category: 'Student Performance',
        metrics: [
          {
            id: 'total-students',
            title: 'Total Students',
            value: 1000,
            change: 5.2,
            changeType: 'increase',
            trend: [950, 970, 985, 995, 1000],
            description: 'Total enrolled students',
          },
          {
            id: 'total-pass',
            title: 'Passed',
            value: 450,
            change: 8.3,
            changeType: 'increase',
            trend: [400, 415, 430, 440, 450],
            description: 'Students who passed',
          },
          {
            id: 'total-distinction',
            title: 'Distinction',
            value: 100,
            change: 12.4,
            changeType: 'increase',
            trend: [80, 85, 90, 95, 100],
            description: 'Students with distinction',
          },
          {
            id: 'total-fail',
            title: 'Failed',
            value: 200,
            change: -3.5,
            changeType: 'increase',
            trend: [220, 215, 210, 205, 200],
            description: 'Students who failed',
          },
          {
            id: 'total-withdrawn',
            title: 'Withdrawn',
            value: 250,
            change: -5.7,
            changeType: 'increase',
            trend: [280, 270, 265, 255, 250],
            description: 'Students who withdrew',
          },
          {
            id: 'avg-credits',
            title: 'Avg Credits',
            value: 45.5,
            change: 2.1,
            changeType: 'increase',
            trend: [43, 43.5, 44.2, 45, 45.5],
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
            value: 500000,
            change: 15.2,
            changeType: 'increase',
            trend: [420000, 445000, 470000, 485000, 500000],
            description: 'Total VLE interactions',
          },
          {
            id: 'avg-clicks',
            title: 'Avg Clicks per Student',
            value: 500,
            change: 9.8,
            changeType: 'increase',
            trend: [450, 465, 480, 490, 500],
            description: 'Average clicks per student',
          },
          {
            id: 'active-students',
            title: 'Active Students',
            value: 1000,
            change: 3.1,
            changeType: 'increase',
            trend: [950, 970, 985, 995, 1000],
            description: 'Students with VLE activity',
          },
          {
            id: 'min-clicks',
            title: 'Min Clicks',
            value: 10,
            change: 0,
            changeType: 'neutral',
            description: 'Minimum clicks by a student',
          },
          {
            id: 'max-clicks',
            title: 'Max Clicks',
            value: 5000,
            change: 25.0,
            changeType: 'increase',
            trend: [3800, 4200, 4500, 4750, 5000],
            description: 'Maximum clicks by a student',
          },
        ],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

function getMockPredictiveModelData(): PredictiveModelDashboardData {
  const today = new Date();
  
  // Final Result predictions (Pass/Fail/Distinction/Withdrawn)
  const finalResultPredictions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - 15 + i);
    const baseValue = 65 + Math.random() * 15; // 65-80% accuracy
    return {
      date: date.toISOString().split('T')[0],
      actual: i < 15 ? 60 + Math.random() * 25 : undefined,
      predicted: baseValue,
      confidence: {
        lower: baseValue - 10,
        upper: baseValue + 10,
      },
    };
  });

  // Dropout predictions
  const dropoutPredictions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - 15 + i);
    const baseValue = 70 + Math.random() * 15; // 70-85% accuracy
    return {
      date: date.toISOString().split('T')[0],
      actual: i < 15 ? 65 + Math.random() * 25 : undefined,
      predicted: baseValue,
      confidence: {
        lower: baseValue - 12,
        upper: baseValue + 12,
      },
    };
  });

  return {
    models: [
      {
        id: 'final-result',
        name: 'Final Result Prediction',
        description: 'Predicts student final result (Pass/Fail/Distinction/Withdrawn) based on 6 key features',
        modelType: 'Machine Learning Classifier',
        predictions: finalResultPredictions,
        metrics: {
          accuracy: 75.5,
          mae: 0.15,
          rmse: 0.22,
          r2Score: 0.78,
        },
        features: ['Gender', 'Age Band', 'Studied Credits', 'Previous Attempts', 'Total VLE Clicks', 'Avg Assessment Score'],
        lastTrained: new Date(Date.now() - 86400000 * 2).toISOString(),
        nextUpdate: new Date(Date.now() + 86400000 * 5).toISOString(),
      },
      {
        id: 'dropout',
        name: 'Student Dropout Prediction',
        description: 'Predicts whether a student will dropout based on engagement and performance metrics',
        modelType: 'Machine Learning Classifier',
        predictions: dropoutPredictions,
        metrics: {
          accuracy: 78.3,
          mae: 0.18,
          rmse: 0.25,
          r2Score: 0.75,
        },
        features: ['Gender', 'Age Band', 'Studied Credits', 'Previous Attempts', 'Total VLE Clicks', 'Avg Assessment Score'],
        lastTrained: new Date(Date.now() - 86400000 * 3).toISOString(),
        nextUpdate: new Date(Date.now() + 86400000 * 4).toISOString(),
      },
    ],
    summary: {
      totalModels: 2,
      averageAccuracy: 76.9,
      lastUpdated: new Date().toISOString(),
    },
  };
}
