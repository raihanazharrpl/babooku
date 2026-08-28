// resources/layouts/AppLayout.jsx
import { useState } from 'react'
import { Outlet } from 'react-router'
import NavbarPrimary from './part/NavbarPrimary'
import SidebarPrimary from './part/SidebarPrimary' // <-- Diperbarui di sini
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
        {/* SidebarPrimary hanya ada & aktif di mode Mobile */}
        <SidebarPrimary isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> {/* <-- Diperbarui di sini */}

        {/* Main Content Meluas Penuh */}
        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <FooterPrimary />
    </div>
  )
}
