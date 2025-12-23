// KPI Types
export interface KPIMetric {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  target?: number; // target value for comparison
  change?: number; // percentage change (deprecated, use target instead)
  changeType?: 'increase' | 'decrease' | 'neutral';
  trend?: number[]; // array of historical values for sparkline
  icon?: string;
  description?: string;
}

export interface KPICategory {
  category: string;
  metrics: KPIMetric[];
}

export interface KPIDashboardData {
  categories: KPICategory[];
  lastUpdated: string;
}

// Predictive Model Types
export interface PredictionDataPoint {
  date: string;
  actual?: number;
  predicted: number;
  confidence?: {
    lower: number;
    upper: number;
  };
}

export interface ModelMetrics {
  accuracy: number;
  mae: number; // Mean Absolute Error
  rmse: number; // Root Mean Square Error
  r2Score: number;
}

export interface PredictiveModel {
  id: string;
  name: string;
  description: string;
  modelType: string;
  predictions: PredictionDataPoint[];
  metrics: ModelMetrics;
  features: string[];
  lastTrained: string;
  nextUpdate?: string;
}

export interface PredictiveModelDashboardData {
  models: PredictiveModel[];
  summary: {
    totalModels: number;
    averageAccuracy: number;
    lastUpdated: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Prediction Request/Response Types
export interface PredictionRequest {
  gender: 'F' | 'M';
  age_band: '0-35' | '35-55' | '55<=';
  studied_credits: number | string;
  num_of_prev_attempts: number | string;
  total_clicks: number | string;
  avg_assessment_score: number | string;
}

export interface PredictionByIdRequest {
  student_id: number;
}

export interface PredictionResponse {
  success: boolean;
  prediction: string;
  message?: string;
}
