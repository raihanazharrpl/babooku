// resources/layouts/AppLayout.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarPrimary from './part/NavbarPrimary'
import Sidebar from './part/Sidebar'
import FooterPrimary from './part/FooterPrimary'

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-merino-50 font-sans text-venice-blue-950">
      {/* Header Sticky */}
      <NavbarPrimary 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Container Utama */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar hanya ada & aktif di mode Mobile */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Meluas Penuh (Tanpa Sidebar di Mode Desktop) */}
        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <FooterPrimary />
    </div>
  )
}
