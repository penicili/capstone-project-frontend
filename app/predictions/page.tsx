'use client';

import PredictionForm from '@/components/dashboard/PredictionForm';
import PageHeader from '@/components/layout/PageHeader';

export default function PredictionsPage() {
  return (
    <>
      <PageHeader
        title="Student Prediction Model"
        description="Student result prediction using machine learning"
        breadcrumbs={[
          { label: 'Predictions' }
        ]}
      />

      <div className="px-6 py-8">
        <PredictionForm />
      </div>
    </>
  );
}
