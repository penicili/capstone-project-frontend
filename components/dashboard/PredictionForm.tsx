'use client';

import { useState } from 'react';

interface FinalResultRequest {
  gender: 'F' | 'M';
  age_band: '0-35' | '35-55' | '55<=';
  studied_credits: number;
  num_of_prev_attempts: number;
  total_clicks: number;
  avg_assessment_score: number;
}

interface PredictionResponse {
  success: boolean;
  prediction: string;
  message?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PredictionForm() {
  const [activeModel, setActiveModel] = useState<'final-result' | 'dropout'>('final-result');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FinalResultRequest>({
    gender: 'F',
    age_band: '0-35',
    studied_credits: 60,
    num_of_prev_attempts: 0,
    total_clicks: 1000,
    avg_assessment_score: 70,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const endpoint = activeModel === 'final-result' 
        ? '/predict/final-result'
        : '/predict/dropout';

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['studied_credits', 'num_of_prev_attempts', 'total_clicks', 'avg_assessment_score'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Student Data</h2>

      {/* Model Selection */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveModel('final-result')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeModel === 'final-result'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Final Result Prediction
        </button>
        <button
          onClick={() => setActiveModel('dropout')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            activeModel === 'dropout'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Dropout Prediction
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            >
              <option value="F" className="text-gray-900">Female</option>
              <option value="M" className="text-gray-900">Male</option>
            </select>
          </div>

          {/* Age Band */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Band
            </label>
            <select
              name="age_band"
              value={formData.age_band}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            >
              <option value="0-35" className="text-gray-900">0-35</option>
              <option value="35-55" className="text-gray-900">35-55</option>
              <option value="55<=" className="text-gray-900">55 or above</option>
            </select>
          </div>

          {/* Studied Credits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Studied Credits
            </label>
            <input
              type="number"
              name="studied_credits"
              value={formData.studied_credits}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            />
          </div>

          {/* Previous Attempts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Attempts
            </label>
            <input
              type="number"
              name="num_of_prev_attempts"
              value={formData.num_of_prev_attempts}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            />
          </div>

          {/* Total Clicks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total VLE Clicks
            </label>
            <input
              type="number"
              name="total_clicks"
              value={formData.total_clicks}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            />
          </div>

          {/* Average Assessment Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Assessment Score (0-100)
            </label>
            <input
              type="number"
              name="avg_assessment_score"
              value={formData.avg_assessment_score}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h3 className="font-semibold text-green-900 mb-2">Prediction Result:</h3>
          <p className="text-2xl font-bold text-green-700">{result.prediction}</p>
          {result.message && (
            <p className="text-sm text-green-600 mt-2">{result.message}</p>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <h3 className="font-semibold text-red-900 mb-2">Error:</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
