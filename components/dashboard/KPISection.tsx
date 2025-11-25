'use client';

import { KPICategory } from '@/types/dashboard';
import KPICard from './KPICard';

interface KPISectionProps {
  category: KPICategory;
}

export default function KPISection({ category }: KPISectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {category.category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.metrics.map((metric) => (
          <KPICard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  );
}
