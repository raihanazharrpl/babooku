// resources/layouts/AppLayout.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarPrimary from './part/NavbarPrimary'
import Sidebar from './part/Sidebar'
import FooterPrimary from './part/FooterPrimary'

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header Sticky */}
      <NavbarPrimary 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Container Utama */}
      <div className="flex-1 flex w-full relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main meluas penuh dan menangani overflow horizontal jika ada */}
        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <FooterPrimary />
    </div>
  )
}
