import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onOpenNewTaskModal?: () => void;
  onOpenNewProjectModal?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onOpenNewTaskModal,
  onOpenNewProjectModal,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A11] text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Sidebar for Desktop & Drawer for Mobile */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <DashboardHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenNewTaskModal={onOpenNewTaskModal}
          onOpenNewProjectModal={onOpenNewProjectModal}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
