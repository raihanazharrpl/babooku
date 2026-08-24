// resources/layouts/part/Sidebar.jsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/resources/stores/useAuthStore'
import { 
  Home, Store, Phone, Briefcase, User, LogOut, 
  ShoppingBag, LogIn, UserPlus 
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Ambil state autentikasi dari Zustand Auth Store
  const { user, logout } = useAuthStore()

  const isActive = (path) => location.pathname === path

  const mainMenus = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Store', path: '/store', icon: Store },
    { name: 'Keranjang', path: '/cart', icon: ShoppingBag },
    { name: 'Portfolio / About', path: '/about', icon: Briefcase },
    { name: 'Kontak', path: '/contact', icon: Phone },
  ]

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
    navigate('/auth/login')
  }

  return (
    <>
      {/* Overlay Gelap Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-venice-blue-950/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer Mobile Only */}
      <aside className={`
        fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-merino-50 border-r border-merino-300/60 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-lg md:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-[105%]'}
      `}>
        {/* Menu Utama */}
        <nav className="space-y-1.5">
          <span className="text-xs font-bold text-venice-blue-600/60 uppercase tracking-wider px-3">
            Navigasi Menu
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

        {/* Bagian Bawah: Akun & Auth Status */}
        <div className="pt-4 border-t border-merino-300/60 space-y-1.5">
          <span className="text-xs font-bold text-venice-blue-600/60 uppercase tracking-wider px-3">
            Akun
          </span>

          {user ? (
            /* SUDAH LOGIN */
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
            /* BELUM LOGIN */
            <>
              <Link
                to="/auth/login"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-venice-blue-900 hover:bg-merino-200/60 transition-colors"
              >
                <LogIn className="w-5 h-5 text-venice-blue-700" />
                <span>Masuk</span>
              </Link>

              <Link
                to="/auth/register"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm bg-venice-blue-900 text-merino hover:bg-venice-blue-800 transition-colors shadow-sm"
              >
                <UserPlus className="w-5 h-5 text-rock-blue-light" />
                <span>Daftar Gratis</span>
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
