import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center px-8 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Monitor student performance and view predictive insights using OULAD dataset
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* KPI Card */}
          <Link 
            href="/dashboard"
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              KPI Metrics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              View student engagement, performance, and course analytics
            </p>
            <div className="mt-4 text-center text-blue-600 group-hover:text-blue-700 font-medium">
              View Dashboard →
            </div>
          </Link>

          {/* Predictive Models Card */}
          <Link 
            href="/dashboard"
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4 mx-auto">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Predictive Models
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              AI-powered predictions for student performance and at-risk identification
            </p>
            <div className="mt-4 text-center text-purple-600 group-hover:text-purple-700 font-medium">
              View Models →
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by Next.js 16 & TypeScript
          </p>
        </div>
      </main>
    </div>
  );
}
