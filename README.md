# Learning Analytics Dashboard - OULAD

Dashboard Next.js untuk monitoring student performance dan predictive analytics menggunakan Open University Learning Analytics Dataset (OULAD) dengan TypeScript.

## 🚀 Features

- **Student Metrics Dashboard**: Monitoring real-time untuk student engagement, performance, dan course analytics
- **Predictive Models**: Visualisasi prediksi student performance, withdrawal risk, dan assessment scores
- **OULAD Dataset**: Menggunakan Open University Learning Analytics Dataset
- **Responsive Design**: UI yang responsif dengan Tailwind CSS
- **Mock Data**: Data dummy berdasarkan OULAD untuk development sebelum backend siap
- **API Integration**: Struktur API yang siap untuk integrasi dengan backend

## 📦 Tech Stack

- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Library untuk visualisasi chart dan grafik

## 🛠️ Installation & Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat landing page, dan klik untuk masuk ke dashboard di [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## 📁 Project Structure

```
capstone-project-frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   └── dashboard/
│       ├── KPICard.tsx        # KPI metric card component
│       ├── KPISection.tsx     # KPI section dengan kategori
│       ├── ModelPredictionChart.tsx  # Chart untuk prediksi
│       ├── ModelMetricsCard.tsx      # Card untuk model metrics
│       └── PredictiveModelsSection.tsx # Section untuk semua models
├── lib/
│   └── api/
│       └── dashboard.ts       # API functions untuk fetch data
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

API service sudah disiapkan di `lib/api/dashboard.ts` dengan endpoints:

1. **GET `/api/kpi/dashboard`** - Fetch KPI dashboard data
2. **GET `/api/models/dashboard`** - Fetch predictive model data
3. **GET `/api/models/:id/predictions`** - Fetch specific model predictions
4. **POST `/api/models/:id/retrain`** - Retrain specific model

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

## 📊 Student Metrics (KPIs)

Dashboard menampilkan metrics dalam 3 kategori:

1. **Student Engagement**
   - Total Students
   - Active Students
   - Average VLE Interactions

2. **Student Performance**
   - Pass Rate
   - Average Score
   - Completion Rate

3. **Course Analytics**
   - Active Courses
   - Average Engagement Rate
   - At-Risk Students

## 🤖 Predictive Models

Dashboard menampilkan 3 jenis model berdasarkan OULAD:

1. **Student Performance Prediction** - Prediksi pass/fail outcomes berdasarkan VLE engagement dan assessment history
2. **Student Withdrawal Prediction** - Identifikasi students berisiko dropout/withdrawal
3. **Assessment Score Prediction** - Prediksi final assessment scores berdasarkan continuous assessment

Setiap model menampilkan:
- Chart dengan actual vs predicted values
- Confidence intervals
- Performance metrics (Accuracy, R², MAE, RMSE)
- Features dari OULAD yang digunakan (VLE clicks, assessment scores, demographics, etc.)
- Last trained timestamp

## 🎨 Customization

### Menambah KPI Baru

Edit `lib/api/dashboard.ts` di function `getMockKPIData()` atau fetch dari backend:

```typescript
{
  id: 'unique-id',
  title: 'Your Metric',
  value: 1234,
  unit: 'Rp',
  change: 5.2,
  changeType: 'increase',
  description: 'Description'
}
```

### Menambah Model Baru

Edit `lib/api/dashboard.ts` di function `getMockPredictiveModelData()`:

```typescript
{
  id: 'model-id',
  name: 'Your Model',
  description: 'Model description',
  modelType: 'Algorithm name',
  predictions: [...],
  metrics: {...},
  features: [...],
  lastTrained: '...',
}
```

## 🔄 Development Notes

- Saat ini menggunakan **mock data** untuk development
- API calls akan fallback ke mock data jika backend belum tersedia
- Untuk production, pastikan backend endpoint sudah siap dan update `NEXT_PUBLIC_API_URL`

## 🚀 Deployment

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📝 TODO

- [ ] Implementasi authentication
- [ ] Add loading skeletons
- [ ] Add error boundaries
- [ ] Implement real-time updates dengan WebSocket
- [ ] Add export functionality (PDF/Excel)
- [ ] Add filtering dan date range selector
- [ ] Implement model retraining functionality

## 📚 Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## 📄 License

MIT License
