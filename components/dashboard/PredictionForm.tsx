'use client';

import { useState } from 'react';
import { predictFinalResult, predictDropout, predictFinalResultById, predictDropoutById } from '@/lib/api';
import type { PredictionRequest, PredictionResponse } from '@/types/dashboard';

export default function PredictionForm() {
  const [activeModel, setActiveModel] = useState<'final-result' | 'dropout'>('final-result');
  const [inputMode, setInputMode] = useState<'manual' | 'id'>('manual');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<number>(1);

  const [formData, setFormData] = useState<PredictionRequest>({
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
      let data: PredictionResponse;
      
      if (inputMode === 'manual') {
        // Convert empty strings to 0 before submitting
        const cleanedFormData = {
          ...formData,
          studied_credits: Number(formData.studied_credits) || 0,
          num_of_prev_attempts: Number(formData.num_of_prev_attempts) || 0,
          total_clicks: Number(formData.total_clicks) || 0,
          avg_assessment_score: Number(formData.avg_assessment_score) || 0,
        };
        
        data = activeModel === 'final-result'
          ? await predictFinalResult(cleanedFormData)
          : await predictDropout(cleanedFormData);
      } else {
        const cleanedStudentId = Number(studentId) || 1;
        data = activeModel === 'final-result'
          ? await predictFinalResultById(cleanedStudentId)
          : await predictDropoutById(cleanedStudentId);
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
    setFormData((prev: PredictionRequest) => ({
      ...prev,
      [name]: ['studied_credits', 'num_of_prev_attempts', 'total_clicks', 'avg_assessment_score'].includes(name)
        ? (value === '' ? '' : Number(value))
        : value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Model & Input Method Selection - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Selection - Dropdown */}
        <div className="space-y-2">
          <label htmlFor="model-select" className="text-base font-semibold text-slate-700">
            Prediction Model
          </label>
          <select
            id="model-select"
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value as 'final-result' | 'dropout')}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all bg-white"
          >
            <option value="final-result">Final Result Prediction</option>
            <option value="dropout">Dropout Risk Prediction</option>
          </select>
        </div>

        {/* Input Mode Selection - Dropdown */}
        <div className="space-y-2">
          <label htmlFor="input-mode-select" className="text-base font-semibold text-slate-700">
            Input Method
          </label>
          <select
            id="input-mode-select"
            value={inputMode}
            onChange={(e) => {
              setInputMode(e.target.value as 'manual' | 'id');
              setError(null);
              setResult(null);
            }}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all bg-white"
          >
            <option value="manual">Manual Data Entry</option>
            <option value="id">By Student ID</option>
          </select>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {inputMode === 'id' ? (
          /* Student ID Input */
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <label className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              Student ID
            </label>
            <input
              type="number"
              value={studentId || ''}
              onChange={(e) => setStudentId(e.target.value === '' ? 0 : Number(e.target.value))}
              min="1"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
              placeholder="Enter student ID (e.g., 12345)"
            />
          </div>
        ) : (
          /* Manual Input Form */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                >
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </div>

              {/* Age Band */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Age Band
                </label>
                <select
                  name="age_band"
                  value={formData.age_band}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                >
                  <option value="0-35">0-35 years</option>
                  <option value="35-55">35-55 years</option>
                  <option value="55<=">55+ years</option>
                </select>
              </div>

              {/* Studied Credits */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Studied Credits
                </label>
                <input
                  type="number"
                  name="studied_credits"
                  value={formData.studied_credits || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                  placeholder="e.g., 60"
                />
              </div>

              {/* Previous Attempts */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Previous Attempts
                </label>
                <input
                  type="number"
                  name="num_of_prev_attempts"
                  value={formData.num_of_prev_attempts || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                  placeholder="e.g., 0"
                />
              </div>

              {/* Total Clicks */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Total VLE Clicks
                </label>
                <input
                  type="number"
                  name="total_clicks"
                  value={formData.total_clicks || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                  placeholder="e.g., 1000"
                />
              </div>

              {/* Average Assessment Score */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Avg Assessment Score
                </label>
                <input
                  type="number"
                  name="avg_assessment_score"
                  value={formData.avg_assessment_score || ''}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 transition-all"
                  placeholder="0-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Prediction
            </>
          )}
        </button>
      </form>

      {/* Result Display */}
      {result && (() => {
        // Format prediction text
        let displayText = result.prediction;
        let isNegative = false;
        let iconSvg = null;
        
        if (activeModel === 'dropout') {
          // Convert 0/1 to readable text
          if (result.prediction === 1 || result.prediction === 'true') {
            displayText = 'Student at Risk of Dropping Out';
            isNegative = true;
            iconSvg = (
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            );
          } else if (result.prediction === 0 || result.prediction === 'false') {
            displayText = 'Student Not at Risk';
            isNegative = false;
            iconSvg = (
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
          }
        } else {
          // Final result - check if fail or withdrawn
          const predictionLower = String(result.prediction).toLowerCase();
          isNegative = predictionLower === 'fail' || predictionLower === 'withdrawn';
          if (isNegative) {
            iconSvg = (
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
            displayText = typeof result.prediction === 'string'
              ? result.prediction.charAt(0).toUpperCase() + result.prediction.slice(1)
              : String(result.prediction);
          } else {
            iconSvg = (
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
            displayText = typeof result.prediction === 'string'
              ? result.prediction.charAt(0).toUpperCase() + result.prediction.slice(1)
              : String(result.prediction);
          }
        }
        
        return (
          <div className={`p-6 rounded-xl border-2 ${
            isNegative 
              ? 'bg-red-50 border-red-300' 
              : 'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-start gap-4">
              <div className="shrink-0">{iconSvg}</div>
              <div className="flex-1">
                <h3 className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                  isNegative ? 'text-red-700' : 'text-green-700'
                }`}>
                  Prediction Result
                </h3>
                <p className={`text-2xl font-bold mb-2 ${
                  isNegative ? 'text-red-900' : 'text-green-900'
                }`}>
                  {displayText}
                </p>
                {result.message && (
                  <p className={`text-sm ${
                    isNegative ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {result.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Error Display */}
      {error && (
        <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-700 mb-2 uppercase tracking-wide">
                Error
              </h3>
              <p className="text-red-900">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
