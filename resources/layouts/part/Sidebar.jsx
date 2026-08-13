// resources/layouts/part/Sidebar.jsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Store, Phone, Briefcase, User, LogIn, LogOut } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Ambil state token & fungsi logout dari Zustand Store
  const { token, logout } = useAuthStore()
  const isAuthenticated = Boolean(token)

  // Helper untuk mengecek rute aktif
  const isActive = (path) => location.pathname === path

  const mainMenus = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Store', path: '/store', icon: Store },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'Portfolio', path: '/about', icon: Briefcase },
  ]

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
    navigate('/auth/login')
  }

  return (
    <>
      {/* Overlay Gelap untuk Menutup Sidebar Saat Diklik di Luar Area */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-venice-blue-950/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:static top-16 md:top-0 -left-[1px] md:left-0 -ml-[1px] md:ml-0 z-50 h-[calc(100vh-4rem)] md:h-auto w-64 bg-merino-50 border-r md:border border-merino-300/60 md:rounded-2xl p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Menu Utama */}
        <nav className="space-y-1.5">
          <span className="text-xs font-bold text-venice-blue-600/60 uppercase tracking-wider px-3">
            Navigasi
          </span>
          {mainMenus.map((menu) => {
            const Icon = menu.icon
            const active = isActive(menu.path)

            return (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  active
                    ? 'bg-venice-blue-800 text-merino font-bold shadow-sm'
                    : 'text-venice-blue-900 hover:bg-merino-200/60 hover:text-venice-blue-950'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-rock-blue-light' : 'text-venice-blue-600/70'}`} />
                <span>{menu.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bagian Bawah: Profile / Login & Logout */}
        <div className="pt-4 border-t border-merino-300/60 space-y-1.5">
          <span className="text-xs font-bold text-venice-blue-600/60 uppercase tracking-wider px-3">
            Akun
          </span>

          {isAuthenticated ? (
            /* --- TAMPILAN JIKA SUDAH LOGIN --- */
            <>
              <Link
                to="/profile"
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive('/profile')
                    ? 'bg-venice-blue-800 text-merino font-bold shadow-sm'
                    : 'text-venice-blue-900 hover:bg-merino-200/60 hover:text-venice-blue-950'
                }`}
              >
                <User className={`w-5 h-5 ${isActive('/profile') ? 'text-rock-blue-light' : 'text-venice-blue-600/70'}`} />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            /* --- TAMPILAN JIKA BELUM LOGIN --- */
            <Link
              to="/auth/login"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive('/auth/login')
                  ? 'bg-venice-blue-800 text-merino font-bold shadow-sm'
                  : 'text-venice-blue-900 hover:bg-merino-200/60 hover:text-venice-blue-950'
              }`}
            >
              <LogIn className={`w-5 h-5 ${isActive('/auth/login') ? 'text-rock-blue-light' : 'text-venice-blue-600/70'}`} />
              <span>Masuk</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}
