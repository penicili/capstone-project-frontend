'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
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
        <div className="min-h-screen p-6">
          {/* Floating Canvas */}
          <div className="bg-white rounded-2xl shadow-lg min-h-[calc(100vh-3rem)] overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
