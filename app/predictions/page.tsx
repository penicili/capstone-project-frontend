'use client';

import PredictionForm from '@/components/dashboard/PredictionForm';
import PageHeader from '@/components/layout/PageHeader';

export default function PredictionsPage() {
  return (
    <>
      <PageHeader
        title="Student Prediction Model"
        description="Enter student information to predict their final result or dropout risk"
        breadcrumbs={[
          { label: 'Predictions' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <PredictionForm />
      </div>
    </>
  );
}
