'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  subtitle?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm mb-3">
            <Link 
              href="/"
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-slate-500 hover:text-slate-700 transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Header Content */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {title}
            </h1>
            {description && (
              <p className="text-slate-600 text-sm">
                {description}
              </p>
            )}
            {subtitle && (
              <p className="text-slate-500 text-xs mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Actions (buttons, etc) */}
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
