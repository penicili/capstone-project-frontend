'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        isExpanded={isSidebarExpanded}
        onExpandChange={setIsSidebarExpanded}
      />
      
      {/* Main Content - Adjusts based on sidebar state */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
