'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Student Metrics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/',
  },
  {
    id: 'predictions',
    label: 'Predictions',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    href: '/predictions',
  },
];

export default function Sidebar({ isExpanded, onExpandChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        onMouseEnter={() => onExpandChange(true)}
        onMouseLeave={() => onExpandChange(false)}
        className={cn(
          'fixed left-0 top-0 h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl',
          isExpanded ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div
              className={cn(
                'transition-all duration-300',
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              <h2 className="font-bold text-lg whitespace-nowrap">LMS Data Center</h2>
              <p className="text-xs text-slate-400 whitespace-nowrap">KPI and prediction model</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-2">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative',
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    )}
                  >
                    <div className={cn('shrink-0', isActive && 'scale-110')}>
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        'transition-all duration-300 whitespace-nowrap font-medium',
                        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                      )}
                    >
                      {item.label}
                    </span>
                    
                    {/* Tooltip when collapsed */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-slate-700">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700"></div>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section (Bottom) */}
        {/* <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div
              className={cn(
                'transition-all duration-300',
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              <p className="font-medium text-sm whitespace-nowrap">Admin User</p>
              <p className="text-xs text-slate-400 whitespace-nowrap">admin@oulad.com</p>
            </div>
          </div>
        </div> */}

        {/* Expand/Collapse Indicator */}
        <div
          className={cn(
            'absolute -right-3 top-8 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300',
            isExpanded ? 'rotate-180' : 'rotate-0'
          )}
        >
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </aside>
    </>
  );
}
