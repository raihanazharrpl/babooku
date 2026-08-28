// resources/layouts/part/SidebarAdmin.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/resources/stores/useAuthStore';
import { 
  LayoutDashboard, BookOpen, FolderTree, Tags, 
  ShoppingCart, Users, ChevronDown, LogOut, 
  Settings, ArrowLeft, Layers, Image as ImageIcon,
  BarChart3, PieChart, TrendingUp, UserCheck, PackageCheck,
  ShieldCheck, X, Wrench, Calculator, Binary, FileText,
  History, Building2
} from 'lucide-react';
import { getAssetUrl } from '@/resources/helpers/assetsHelper.js';

export default function SidebarAdmin({ isOpen, onClose, isCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // Tambahkan state default untuk submenu Laporan & Inventaris
  const [openSubmenu, setOpenSubmenu] = useState({ 
    analytics: false, 
    catalog: true 
  });

  // Izinkan toggle submenu meskipun sedang mode collapsed (icon only)
  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

const menuGroups = [
  {
    groupLabel: 'Utama',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    groupLabel: 'Laporan & Analis',
    items: [
      {
        name: 'Statistik & Analis',
        icon: BarChart3,
        submenuKey: 'analytics',
        submenus: [
          { name: 'Ringkasan Utama', path: '/admin/analytics/summary', icon: PieChart },
          { name: 'Laporan Penjualan', path: '/admin/analytics/sales', icon: TrendingUp },
          { name: 'Laporan Pengguna', path: '/admin/analytics/users', icon: UserCheck },
          { name: 'Laporan Perputaran Stok', path: '/admin/analytics/stock', icon: PackageCheck },
        ]
      }
    ]
  },
  {
    groupLabel: 'Inventaris',
    items: [
      {
        name: 'Katalog Buku',
        icon: Layers,
        submenuKey: 'catalog',
        submenus: [
          { name: 'Daftar Buku', path: '/admin/books/list', icon: BookOpen },
          { name: 'Kategori Buku', path: '/admin/books/category', icon: FolderTree },
          { name: 'Tag / Label', path: '/admin/books/tag', icon: Tags },
          { name: 'Penerbit Buku', path: '/admin/books/publishers', icon: Building2 }, // <-- TAMBAHAN DI SINI
        ]
      }
    ]
  },
  {
    groupLabel: 'Transaksi',
    items: [
      { name: 'Pesanan Masuk', path: '/admin/orders', icon: ShoppingCart, badge: '12' },
      { name: 'Pelanggan', path: '/admin/customers', icon: Users },
      { name: 'Banner & Hero', path: '/admin/banners', icon: ImageIcon }
    ]
  },
  {
    groupLabel: 'Alat & Utility', // GROUPS BARU: TOOLS
    items: [
      {
        name: 'Tools Admin',
        icon: Wrench,
        submenuKey: 'tools',
        submenus: [
          { name: 'Kalkulator', path: '/admin/tools/calculator', icon: Calculator },
          { name: 'Biner / Format Converter', path: '/admin/tools/converter', icon: Binary },
          { name: 'Generator / PDF Tools', path: '/admin/tools/generator', icon: FileText },
        ]
      }
    ]
  },
  {
    groupLabel: 'Sistem & Keamanan', // GROUPS DIPERBARUI: MANAJEMEN ADMIN & LOG
    items: [
      { name: 'Kelola Admin', path: '/admin/users/admins', icon: ShieldCheck },
      { name: 'Log Aktivitas', path: '/admin/system/logs', icon: History },
      { name: 'Pengaturan Toko', path: '/admin/settings', icon: Settings }
    ]
  }
];


  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-venice-blue-950/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-merino-300/70 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}
      >
        
        {/* Header Brand */}
        <div className={`p-4 flex items-center ${isCollapsed ? 'lg:justify-center' : 'justify-between'} border-b border-merino-200 shrink-0`}>
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div 
              className="w-8 h-8 bg-venice-blue-900 shrink-0"
              style={{
                maskImage: `url(${getAssetUrl('static/logo-only-500.png')})`,
                WebkitMaskImage: `url(${getAssetUrl('static/logo-only-500.png')})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
            {!isCollapsed && (
              <div className="lg:block animate-in fade-in duration-300">
                <span className="text-lg font-display font-black text-venice-blue-900 tracking-tight block leading-none">
                  Babooku
                </span>
                <span className="text-[10px] font-bold text-rock-blue-dark tracking-widest uppercase">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>

          {!isCollapsed && (
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-venice-blue-700 hover:bg-merino-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* List Menu (Perbaikan Duplikasi Div) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              
              {/* Header Judul Grup (Sembunyikan saat Collapsed) */}
              {!isCollapsed && (
                <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-venice-blue-600/60 mb-2 truncate">
                  {group.groupLabel}
                </p>
              )}
      
              {/* Loop Setiap Item Menu */}
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
      
                // SKENARIO A: Menu Memiliki Submenu (Dropdown)
                if (item.submenus) {
                  const isSubmenuOpen = openSubmenu[item.submenuKey];
                  // Mengecek apakah salah satu anak submenu sedang aktif
                  const isAnyChildActive = item.submenus.some(sub => isActive(sub.path));
      
                  return (
                    <div key={iIdx}>
                      <button
                        onClick={() => toggleSubmenu(item.submenuKey)}
                        title={item.name}
                        className={`w-full flex items-center transition-all text-xs font-bold ${
                          isCollapsed 
                            ? 'justify-center w-11 h-11 mx-auto px-0 rounded-xl' 
                            : 'justify-between px-3.5 py-2.5 rounded-xl'
                        } ${
                          isAnyChildActive && isCollapsed
                            ? 'bg-merino-100 text-venice-blue-900' // Hint aktif di parent (collapsed)
                            : 'text-venice-blue-800 hover:bg-merino-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 text-venice-blue-700'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                        )}
                      </button>
      
                      {/* Submenu Item List */}
                      {isSubmenuOpen && (
                        <div className={`transition-all duration-300 overflow-hidden ${
                          isCollapsed 
                            ? 'mt-1 mb-2 bg-merino-100/50 py-2 rounded-xl flex flex-col items-center gap-1 mx-1 border border-merino-200/50 shadow-inner' // Styling Khusus Anak Menu di mode Collapsed
                            : 'pl-4 mt-1 space-y-1 border-l-2 border-merino-200 ml-5' // Styling Ekspansi Normal
                        }`}>
                          {item.submenus.map((sub, sIdx) => {
                            const SubIcon = sub.icon;
                            const active = isActive(sub.path);
      
                            return (
                              <Link
                                key={sIdx}
                                to={sub.path}
                                onClick={onClose}
                                title={sub.name}
                                className={`flex items-center text-xs font-semibold transition-all ${
                                  isCollapsed 
                                    ? 'justify-center w-9 h-9 p-0 rounded-lg' // Ukuran kotak anak lebih kecil (w-9 h-9)
                                    : 'gap-2.5 px-3 py-2 rounded-lg'
                                } ${
                                  active
                                    ? 'bg-venice-blue-200 text-venice-blue-950 font-bold shadow-sm'
                                    : 'text-venice-blue-700 hover:bg-merino-200'
                                }`}
                              >
                                <SubIcon className={`shrink-0 ${isCollapsed ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
                                {!isCollapsed && <span>{sub.name}</span>}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
      
                // SKENARIO B: Menu Standar / Tunggal
                const active = isActive(item.path);
                return (
                  <Link
                    key={iIdx}
                    to={item.path}
                    onClick={onClose}
                    title={item.name}
                    className={`flex items-center transition-all text-xs font-bold ${
                      isCollapsed 
                        ? 'justify-center w-11 h-11 mx-auto px-0 rounded-xl relative' 
                        : 'justify-between px-3.5 py-2.5 rounded-xl'
                    } ${
                      active
                        ? 'bg-venice-blue-900 text-merino shadow-sm'
                        : 'text-venice-blue-800 hover:bg-merino-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
      
                    {/* Badge Angka (Notifikasi) */}
                    {item.badge && (
                      <span className={`font-black rounded-full text-[10px] ${
                        isCollapsed 
                          ? 'absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-rock-blue text-venice-blue-950' // Dot di pojok saat collapsed
                          : 'bg-rock-blue text-venice-blue-950 px-2 py-0.5'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
      
            </div>
          ))}
        </div>

        {/* Footer Sidebar (Tombol Keluar/Kembali ke Toko) */}
        <div className="p-3 border-t border-merino-200 bg-merino-50/50 space-y-2 shrink-0">
          <Link
            to="/store"
            title="Lihat Tampilan Toko"
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-white transition-colors ${
              isCollapsed ? 'px-0' : 'px-3'
            }`}
          >
            <ArrowLeft className={`shrink-0 ${isCollapsed ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
            {!isCollapsed && <span>Lihat Toko</span>}
          </Link>
        </div>

      </aside>
    </>
  );
}
