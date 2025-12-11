import { API_BASE_URL } from './config';
import type { PredictionRequest, PredictionResponse } from '@/types/dashboard';

/**
 * Predict student final result
 */
export async function predictFinalResult(data: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict/final-result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Prediction failed');
  }

  return result;
}

/**
 * Predict student dropout risk
 */
export async function predictDropout(data: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict/dropout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Prediction failed');
  }

  return result;
}
