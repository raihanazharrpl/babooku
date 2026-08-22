// resources/layouts/part/NavbarPrimary.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, X, Home, Store, Phone, Briefcase, 
  User, LogOut, ShoppingBag, Bell, Bookmark 
} from 'lucide-react'

export default function NavbarPrimary({ isSidebarOpen, onToggleSidebar }) {
  const location = useLocation()

  // Helper untuk mengecek rute aktif
  const isActive = (path) => location.pathname === path

  // Daftar Navigasi Utama
  const mainNavs = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Store', path: '/store', icon: Store },
    { name: 'Keranjang', path: '/cart', icon: ShoppingBag },
    { name: 'Portfolio / About', path: '/about', icon: Briefcase },
    { name: 'Kontak', path: '/contact', icon: Phone },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-merino-50/90 backdrop-blur-md border-b border-merino-300/60 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* KIRI: Brand Logo & Text Babooku */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div 
            className="w-9 h-9 bg-venice-blue-900 transition-transform duration-300 group-hover:scale-105"
            style={{
              maskImage: 'url(/storage/assets/images/statis/logo-only-500.png)',
              WebkitMaskImage: 'url(/storage/assets/images/statis/logo-only-500.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
            aria-label="Babooku Logo"
          />
          <span className="text-xl font-display font-black text-venice-blue-900 tracking-tight">
            Babooku
          </span>
        </Link>

        {/* KANAN (DESKTOP): Navigasi Horizontal 3/4 Area + Horizontal Scrollable */}
        <div className="hidden md:flex items-center justify-end flex-1 max-w-[75%] overflow-x-auto no-scrollbar scroll-smooth py-1 px-2 gap-1.5">
          {mainNavs.map((nav) => {
            const Icon = nav.icon
            const active = isActive(nav.path)

            return (
              <Link
                key={nav.name}
                to={nav.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  active
                    ? 'bg-venice-blue-900 text-merino shadow-sm'
                    : 'text-venice-blue-800 hover:bg-merino-200/60 hover:text-venice-blue-950'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-rock-blue-light' : 'text-venice-blue-600'}`} />
                <span>{nav.name}</span>
              </Link>
            )
          })}

          {/* Action Tambahan: Logout (Desktop) */}
          <button 
            onClick={() => {}} 
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors shrink-0 ml-1"
            title="Keluar Akun"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>

        {/* KANAN (MOBILE): Tombol Hamburger / Close */}
        <button
          onClick={onToggleSidebar}
          type="button"
          aria-label={isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
          className="md:hidden relative p-2 rounded-xl text-venice-blue-800 hover:text-venice-blue-950 hover:bg-merino-200/60 focus:outline-none transition-all duration-300 active:scale-95"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Ikon Close (X) */}
            <X
              className={`w-6 h-6 text-venice-blue-900 absolute transition-all duration-300 ease-in-out ${
                isSidebarOpen
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              }`}
            />
        
            {/* Ikon Hamburger (Menu) */}
            <Menu
              className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
                isSidebarOpen
                  ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
                  : 'opacity-100 rotate-0 scale-100'
              }`}
            />
          </div>
        </button>

      </div>
    </header>
  )
}
