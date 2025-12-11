import { PredictiveModelDashboardData } from '@/types/dashboard';

import { API_BASE_URL } from './config';
/**
 * Fetch predictive model dashboard data
 */
export async function fetchModelStatus(): Promise<PredictiveModelDashboardData> {
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

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch model status');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching model status:', error);
    throw error;
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
