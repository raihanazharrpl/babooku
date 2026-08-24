// resources/layouts/part/NavbarAdmin.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/resources/stores/useAuthStore';
import { 
  Menu, Bell, Mail, ChevronRight, User, LogOut 
} from 'lucide-react';

export default function NavbarAdmin({ 
  isSidebarOpen, 
  onToggleSidebar, 
  isCollapsed, 
  onToggleCollapse 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  // Helper untuk mengecek apakah rute saat ini aktif
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-merino-300/70 h-16 px-4 sm:px-8 flex items-center justify-between shadow-sm">
      
      {/* SISI KIRI: Toggle Sidebar Buttons */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleSidebar}
          type="button"
          className="lg:hidden p-2 rounded-xl text-venice-blue-800 hover:bg-merino-100 transition-colors"
          aria-label="Toggle Sidebar Mobile"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle (Panah yang berputar) */}
        <button
          onClick={onToggleCollapse}
          type="button"
          className="hidden lg:flex items-center justify-center p-2 rounded-xl text-venice-blue-800 hover:bg-merino-100 transition-transform duration-300"
          aria-label="Toggle Collapse Desktop Sidebar"
        >
          <ChevronRight 
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`} 
          />
        </button>

        <span className="hidden sm:inline-block text-xs font-bold text-venice-blue-700/60 uppercase tracking-widest">
          Admin Dashboard
        </span>
      </div>

      {/* SISI KANAN: Icon Lonceng, Mail & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Icon Pesan (Mail) */}
        <Link 
          to="/admin/mail"
          className={`relative p-2.5 rounded-xl transition-all ${
            isActive('/admin/mail')
              ? 'bg-venice-blue-900 text-merino shadow-sm'
              : 'text-venice-blue-800 hover:bg-merino-100'
          }`}
          title="Pesan Masuk"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rock-blue-dark rounded-full ring-2 ring-white"></span>
        </Link>

        {/* Icon Notifikasi (Lonceng) */}
        <Link 
          to="/admin/notifications"
          className={`relative p-2.5 rounded-xl transition-all ${
            isActive('/admin/notifications')
              ? 'bg-venice-blue-900 text-merino shadow-sm'
              : 'text-venice-blue-800 hover:bg-merino-100'
          }`}
          title="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </Link>

        <div className="h-6 w-[1px] bg-merino-300 mx-1"></div>

        {/* Admin Info & Profile Link */}
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/profile"
            className={`flex items-center gap-3 p-1.5 rounded-xl transition-all ${
              isActive('/admin/profile') 
                ? 'bg-merino-200/80 ring-2 ring-venice-blue-900/20' 
                : 'hover:bg-merino-100'
            }`}
          >
            <div className="hidden md:block text-right px-1">
              <p className="text-xs font-bold text-venice-blue-950 leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-venice-blue-600 font-medium">
                {user?.email || 'admin@babooku.com'}
              </p>
            </div>

            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-sm transition-colors ${
              isActive('/admin/profile')
                ? 'bg-rock-blue text-venice-blue-950'
                : 'bg-venice-blue-900 text-merino'
            }`}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-1"
            title="Keluar Akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
