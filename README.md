# Learning Analytics Dashboard - OULAD

Dashboard Next.js untuk monitoring student performance dan predictive analytics menggunakan Open University Learning Analytics Dataset (OULAD) dengan TypeScript.


## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat dashboard.

## 📁 Project Structure

```
capstone-project-frontend/
├── app/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main dashboard page (root)
│   └── globals.css            # Global styles
├── components/
│   └── dashboard/
│       ├── KPICard.tsx                  # KPI metric card component
│       ├── KPISection.tsx               # KPI section dengan kategori
│       ├── PredictionForm.tsx           # Form untuk prediksi student
│       ├── ModelPredictionChart.tsx     # Chart untuk prediksi (tidak digunakan)
│       ├── ModelMetricsCard.tsx         # Card untuk model metrics (tidak digunakan)
│       └── PredictiveModelsSection.tsx  # Section untuk semua models (tidak digunakan)
├── lib/
│   └── api/
│       ├── index.ts           # Central API export
│       ├── config.ts          # API configuration
│       ├── kpi.ts             # KPI-related APIs
│       ├── models.ts          # ML model APIs
│       ├── predictions.ts     # Prediction APIs
│       └── dashboard.ts       # [DEPRECATED] Old API file
├── types/
│   └── dashboard.ts           # TypeScript types dan interfaces
└── .env.local                 # Environment variables
```

## 🔌 API Integration

### Konfigurasi Backend URL

Edit file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### API Endpoints

API service sudah disiapkan di `lib/api/` dengan struktur modular:

**KPI APIs (`lib/api/kpi.ts`):**
- **GET `/api/kpi/overview`** - Fetch KPI dashboard data

**Prediction APIs (`lib/api/predictions.ts`):**
- **POST `/api/predict/final-result`** - Predict student final result (manual input)
- **POST `/api/predict/dropout`** - Predict student dropout risk (manual input)
- **GET `/api/predict/final-result/:id`** - Predict student final result by student ID
- **GET `/api/predict/dropout/:id`** - Predict student dropout risk by student ID

**Model APIs (`lib/api/models.ts`):**
- **GET `/api/models/status`** - Fetch model status
- **GET `/api/models/:id/predictions`** - Fetch specific model predictions
- **POST `/api/models/:id/retrain`** - Retrain specific model

### Response Format

Semua API endpoint mengharapkan response format:

```typescript
{
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
```

## 📊 Dashboard Features

### Tab 1: Student Metrics (KPIs)

Dashboard menampilkan metrics dalam 2 kategori:

1. **Student Performance**
   - Total Students
   - Passed
   - Distinction
   - Failed
   - Withdrawn
   - Average Credits

2. **VLE Engagement**
   - Total VLE Clicks
   - Average Clicks per Student
   - Active Students
   - Min Clicks
   - Max Clicks

### Tab 2: Make Prediction

Form interaktif untuk memprediksi student outcomes dengan 2 mode input:

**Mode 1: Manual Input**
Form dengan 6 features:
- Gender (F/M)
- Age Band (0-35, 35-55, 55<=)
- Studied Credits
- Previous Attempts
- Total VLE Clicks
- Average Assessment Score (0-100)

**Mode 2: By Student ID**
Input menggunakan student ID untuk mendapatkan prediksi langsung dari data mahasiswa yang sudah ada.

Dua model prediksi tersedia:
1. **Final Result Prediction** - Prediksi hasil akhir mahasiswa (Pass/Fail/Distinction/Withdrawn)
2. **Dropout Prediction** - Prediksi risiko dropout mahasiswa

## 🎨 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts (untuk future features)
- **UI Theme**: Red & White color scheme
- **API**: RESTful with FastAPI backend

## 🔧 API Usage Examples

### Import API Functions

```typescript
// Import dari central API
import { 
  fetchKPIData, 
  predictFinalResult, 
  predictDropout,
  predictFinalResultById,
  predictDropoutById 
} from '@/lib/api';
import type { PredictionRequest, PredictionResponse } from '@/types/dashboard';
```

### Fetch KPI Data

```typescript
const kpiData = await fetchKPIData();
```

### Make Prediction (Manual Input)

```typescript
const request: PredictionRequest = {
  gender: 'F',
  age_band: '0-35',
  studied_credits: 60,
  num_of_prev_attempts: 0,
  total_clicks: 1000,
  avg_assessment_score: 75.5,
};

const result = await predictFinalResult(request);
console.log(result.prediction); // "Pass", "Fail", "Distinction", or "Withdrawn"
```

### Make Prediction (By Student ID)

```typescript
const studentId = 123;
const result = await predictFinalResultById(studentId);
console.log(result.prediction); // "Pass", "Fail", "Distinction", or "Withdrawn"
```

## 🔄 Development Notes

- API terhubung langsung ke backend FastAPI di `http://localhost:8000/api`
- Error handling otomatis dengan fallback yang informatif
- CORS harus dikonfigurasi di backend untuk mengizinkan request dari `http://localhost:3000`
- Untuk production, update `NEXT_PUBLIC_API_URL` di `.env.local`

## 🚀 Deployment

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📝 Notes

### Completed Features
- ✅ KPI dashboard dengan data dari backend
- ✅ Interactive prediction form dengan 2 models
- ✅ Red & white theme design
- ✅ Modular API structure
- ✅ Type-safe TypeScript implementation
- ✅ Responsive design

