// resources/layouts/part/NavbarPrimary.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function NavbarPrimary({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-merino-50/90 backdrop-blur-md border-b border-merino-300/60 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo (Logo Only) & Text Babooku */}
        <Link to="/" className="flex items-center gap-2.5 group">
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

        {/* Tombol Hamburger / Close */}
        <button
          onClick={onToggleSidebar}
          type="button"
          aria-label={isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
          className="relative p-2 rounded-xl text-venice-blue-800 hover:text-venice-blue-950 hover:bg-merino-200/60 focus:outline-none transition-all duration-300 active:scale-95"
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
