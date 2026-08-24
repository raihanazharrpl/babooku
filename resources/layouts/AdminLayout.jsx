// resources/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from './part/NavbarAdmin';
import SidebarAdmin from './part/SidebarAdmin';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-merino-50 font-sans text-venice-blue-950">
      {/* Sidebar Admin */}
      <SidebarAdmin 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isCollapsed={isCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <NavbarAdmin 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
