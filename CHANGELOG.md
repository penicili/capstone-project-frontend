# API Integration & Design Changes

## Changes Made (December 11, 2025)

### 1. API Integration with OpenAPI Specification

#### Updated API Endpoints
- **KPI Endpoint**: Changed from `/api/kpi/dashboard` to `/api/kpi/overview`
- **Models Endpoint**: Changed from `/api/models/dashboard` to `/api/models/status`
- **Base URL**: Updated to `http://localhost:8000` (removed `/api` suffix)

#### Updated KPI Metrics
Now shows only available metrics from OpenAPI spec:

**Student Performance:**
- Total Students
- Passed
- Distinction
- Failed
- Withdrawn
- Average Credits

**VLE Engagement:**
- Total VLE Clicks
- Avg Clicks per Student
- Active Students
- Min Clicks
- Max Clicks

#### Updated Predictive Models
Reduced from 3 to 2 models matching OpenAPI:

1. **Final Result Prediction**
   - Predicts: Pass/Fail/Distinction/Withdrawn
   - Features: Gender, Age Band, Studied Credits, Previous Attempts, Total VLE Clicks, Avg Assessment Score

2. **Student Dropout Prediction**
   - Predicts: Dropout likelihood
   - Features: Same 6 features as Final Result

### 2. Color Theme Changes

#### New Red & White Theme
- **Primary Color**: Red (#DC2626, #EF4444, #B91C1C)
- **Background**: White (#FFFFFF) with red accents
- **Accent**: Red-50, Red-100 for secondary elements

#### Updated Components:
- ✅ Home page cards - Red borders and icons
- ✅ Dashboard header - Red border-bottom
- ✅ Tab navigation - Red active state
- ✅ Buttons - Red background
- ✅ KPI Cards - Red left border and sparklines
- ✅ Model Charts - Red gradient and lines
- ✅ Feature badges - Red background
- ✅ Loading spinners - Red color
- ✅ Summary cards - Red background

### 3. New Features

#### Prediction Form Component
- New tab "Make Prediction" in dashboard
- Real-time predictions using POST endpoints:
  - `/api/predict/final-result`
  - `/api/predict/dropout`
- Form inputs for all 6 features:
  - Gender (F/M)
  - Age Band (0-35, 35-55, 55<=)
  - Studied Credits
  - Previous Attempts
  - Total VLE Clicks
  - Average Assessment Score
- Display prediction results and errors
- Red-themed UI matching dashboard

### 4. File Changes

#### Modified Files:
- `lib/api/dashboard.ts` - Updated endpoints and mock data
- `app/page.tsx` - Red theme and gradient title
- `app/dashboard/page.tsx` - Red theme, 3 tabs
- `components/dashboard/KPICard.tsx` - Red borders and sparklines
- `components/dashboard/ModelPredictionChart.tsx` - Red charts
- `components/dashboard/ModelMetricsCard.tsx` - Red accents
- `components/dashboard/PredictiveModelsSection.tsx` - Red summary card
- `.env.local` - Updated API URL
- `.env.example` - Updated API URL

#### New Files:
- `components/dashboard/PredictionForm.tsx` - Prediction interface

### 5. API Request/Response Format

#### KPI Overview Request:
```
GET /api/kpi/overview
```

#### KPI Overview Response:
```json
{
  "success": true,
  "data": {
    "student_performance": { ... },
    "vle_engagement": { ... },
    "assessment_summary": [],
    "module_statistics": []
  }
}
```

#### Prediction Request:
```
POST /api/predict/final-result
Content-Type: application/json

{
  "gender": "F",
  "age_band": "0-35",
  "studied_credits": 60,
  "num_of_prev_attempts": 0,
  "total_clicks": 1000,
  "avg_assessment_score": 70.0
}
```

#### Prediction Response:
```json
{
  "success": true,
  "prediction": "Pass",
  "message": "Prediction completed successfully"
}
```

### 6. Testing

To test the changes:

1. **Start Backend**: Ensure backend is running on `http://localhost:8000`
2. **Start Frontend**: `npm run dev`
3. **Test KPI Tab**: Should show Student Performance and VLE Engagement metrics
4. **Test Model Status Tab**: Should show 2 models (Final Result & Dropout)
5. **Test Make Prediction Tab**: Fill form and submit to get predictions

### 7. Next Steps

- [ ] Connect to real backend API
- [ ] Add loading states for predictions
- [ ] Add form validation
- [ ] Add error handling for network issues
- [ ] Add success animations
- [ ] Add more detailed model information
- [ ] Add historical prediction logs
