// resources/pages/ProfilePage/index.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/resources/stores/useAuthStore'
import { 
  User, Mail, Phone, Lock, BookOpen, ShoppingBag, 
  MapPin, LogOut, ShieldCheck, Camera, ChevronRight, 
  Smartphone, Headphones, CheckCircle2, Clock, Award
} from 'lucide-react'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  
  const [activeTab, setActiveTab] = useState('biodata') // 'biodata' | 'library' | 'orders' | 'address'

  // --- MOCK USER DATA ---
  const userData = {
    name: user?.name || 'Eko Kurniawan',
    email: user?.email || 'eko.kurniawan@gmail.com',
    phone: '081234567890',
    memberSince: 'Agustus 2026',
    points: 1250,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  }

  // --- MOCK BUKU SAYA (LIBRARY) ---
  const myLibrary = [
    {
      id: 1,
      title: 'Atomic Habits (Digital Edition)',
      author: 'James Clear',
      format: 'ebook',
      progress: 75,
      cover: '/storage/assets/images/statis/book2.webp'
    },
    {
      id: 2,
      title: 'Sapiens: Riwayat Singkat',
      author: 'Yuval Noah Harari',
      format: 'audiobook',
      progress: 30,
      cover: '/storage/assets/images/statis/book4.webp'
    }
  ]

  // --- MOCK RIWAYAT PESANAN ---
  const orderHistory = [
    {
      id: 'ORD-20260813-09',
      date: '13 Aug 2026',
      total: 198000,
      status: 'Dalam Pengiriman',
      itemsCount: 2
    },
    {
      id: 'ORD-20260801-02',
      date: '01 Aug 2026',
      total: 98000,
      status: 'Selesai',
      itemsCount: 1
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER PROFILE HERO */}
      <div className="bg-gradient-to-r from-venice-blue-950 via-venice-blue-900 to-venice-blue-800 text-merino pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            
            {/* AVATAR + UPLOAD ICON */}
            <div className="relative group">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-merino/30 shadow-xl" 
              />
              <button className="absolute bottom-0 right-0 bg-rock-blue text-venice-blue-950 p-2 rounded-full shadow-lg hover:bg-rock-blue-dark hover:text-merino transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black">{userData.name}</h1>
                <span className="bg-rock-blue/20 text-rock-blue-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-rock-blue/30">
                  VIP Member
                </span>
              </div>
              <p className="text-merino-200 text-xs sm:text-sm">{userData.email}</p>
              <p className="text-merino-300/80 text-[11px]">Bergabung sejak {userData.memberSince}</p>
            </div>
          </div>

          {/* POIN & STATS */}
          <div className="flex items-center gap-4 bg-merino/10 backdrop-blur-md p-4 rounded-2xl border border-merino/15">
            <div className="p-3 bg-rock-blue/20 text-rock-blue-light rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-merino-200 font-medium">Poin Literasi</span>
              <p className="text-xl font-black text-merino">{userData.points} Poin</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- SIDEBAR NAV TAB (4 COLS) --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-merino-300/60 shadow-md space-y-1">
              
              <button 
                onClick={() => setActiveTab('biodata')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'biodata' 
                    ? 'bg-venice-blue-900 text-merino shadow-sm' 
                    : 'text-venice-blue-900 hover:bg-merino-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Biodata Diri</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button 
                onClick={() => setActiveTab('library')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'library' 
                    ? 'bg-venice-blue-900 text-merino shadow-sm' 
                    : 'text-venice-blue-900 hover:bg-merino-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Buku Saya (Library)</span>
                </div>
                <span className="bg-rock-blue text-venice-blue-950 px-2 py-0.5 rounded-full text-[10px]">
                  {myLibrary.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'orders' 
                    ? 'bg-venice-blue-900 text-merino shadow-sm' 
                    : 'text-venice-blue-900 hover:bg-merino-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Riwayat Pesanan</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button 
                onClick={() => setActiveTab('address')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'address' 
                    ? 'bg-venice-blue-900 text-merino shadow-sm' 
                    : 'text-venice-blue-900 hover:bg-merino-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Daftar Alamat</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <div className="pt-3 border-t border-merino-200 mt-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
              </div>

            </div>
          </div>

          {/* --- CONTENT TAB AREA (8 COLS) --- */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-merino-300/60 shadow-md">
              
              {/* TAB 1: BIODATA DIRI */}
              {activeTab === 'biodata' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-venice-blue-900">Ubah Profil Diri</h2>
                    <p className="text-xs text-venice-blue-700/80 mt-1">Kelola data informasi akun dan kata sandi kamu.</p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Nama Lengkap</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-venice-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          defaultValue={userData.name}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Email</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-venice-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type="email" 
                            defaultValue={userData.email}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Nomor HP / WA</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-venice-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            defaultValue={userData.phone}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-merino-200 space-y-4">
                      <h3 className="font-bold text-sm text-venice-blue-950">Ubah Password</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="password" 
                          placeholder="Password Saat Ini"
                          className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                        />
                        <input 
                          type="password" 
                          placeholder="Password Baru"
                          className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button type="button" className="bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md">
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: BUKU SAYA (LIBRARY DIGITAL) */}
              {activeTab === 'library' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-venice-blue-900">Perpustakaan Digital</h2>
                    <p className="text-xs text-venice-blue-700/80 mt-1">Akses E-Book dan Audiobook yang sudah kamu beli kapan saja.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myLibrary.map((book) => (
                      <div key={book.id} className="bg-merino-50/60 p-4 rounded-2xl border border-merino-200 flex gap-4 items-center">
                        <img 
                          src={book.cover} 
                          alt={book.title} 
                          className="w-16 h-20 object-cover rounded-xl shrink-0 border border-merino-300"
                        />
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-venice-blue-900 text-merino inline-flex items-center gap-1">
                            {book.format === 'ebook' ? <Smartphone className="w-3 h-3 text-rock-blue-light" /> : <Headphones className="w-3 h-3 text-rock-blue-light" />}
                            {book.format === 'ebook' ? 'E-Book' : 'Audiobook'}
                          </span>
                          <h3 className="font-bold text-xs text-venice-blue-950 truncate">{book.title}</h3>
                          <p className="text-[11px] text-venice-blue-700/80 truncate">{book.author}</p>
                          
                          <button className="mt-2 w-full bg-rock-blue hover:bg-rock-blue-dark hover:text-merino text-venice-blue-950 text-[11px] font-bold py-1.5 rounded-lg transition-colors">
                            {book.format === 'ebook' ? 'Buka E-Book' : 'Putar Audio'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RIWAYAT PESANAN */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-venice-blue-900">Riwayat Pesanan</h2>
                    <p className="text-xs text-venice-blue-700/80 mt-1">Daftar transaksi pembelian buku di Babooku.</p>
                  </div>

                  <div className="space-y-4">
                    {orderHistory.map((ord) => (
                      <div key={ord.id} className="bg-merino-50/50 p-4 rounded-2xl border border-merino-200 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-merino-200 text-xs">
                          <div>
                            <span className="font-bold text-venice-blue-950">{ord.id}</span>
                            <span className="text-venice-blue-600/70 ml-2">• {ord.date}</span>
                          </div>
                          <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] w-max ${
                            ord.status === 'Selesai' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="text-venice-blue-700">{ord.itemsCount} Barang</span>
                          <span className="font-black text-sm text-venice-blue-900">{formatRupiah(ord.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ALAMAT SAYA */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-venice-blue-900">Alamat Pengiriman</h2>
                      <p className="text-xs text-venice-blue-700/80 mt-1">Atur alamat untuk pengiriman buku fisik.</p>
                    </div>
                    <button className="bg-rock-blue text-venice-blue-950 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-rock-blue-dark hover:text-merino transition-colors">
                      + Tambah Alamat
                    </button>
                  </div>

                  <div className="bg-merino-50/50 p-4 rounded-2xl border-2 border-venice-blue-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-venice-blue-900 bg-merino px-2 py-0.5 rounded">
                        Rumah Utama
                      </span>
                      <span className="text-xs font-bold text-venice-blue-800">Utama</span>
                    </div>
                    <p className="font-bold text-sm text-venice-blue-950">{userData.name}</p>
                    <p className="text-xs text-venice-blue-700">{userData.phone}</p>
                    <p className="text-xs text-venice-blue-800 leading-relaxed">
                      Jl. Bojongsoang No. 123, Rt 02/05, Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
