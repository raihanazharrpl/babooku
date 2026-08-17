// resources/pages/HomePage/index.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, Search, ShoppingBag, Bell, Bookmark, Clock, 
  ChevronRight, ArrowRight, Truck, CheckCircle2, Star, 
  TrendingUp, Flame, BookOpen, Smartphone, Headphones, PackageCheck
} from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  // Format Buku Options
  const bookFormats = [
    {
      id: 'physical',
      title: 'Buku Fisik',
      subtitle: 'Dikirim Langsung',
      description: 'Pengemasan bubble wrap aman & garansi retur 7 hari.',
      icon: PackageCheck,
      badge: 'Banyak Dicari',
      color: 'bg-venice-blue-900 text-merino border-venice-blue-800',
      iconColor: 'bg-rock-blue/20 text-rock-blue-light',
      path: '/store?format=physical'
    },
    {
      id: 'ebook',
      title: 'E-Book / Digital',
      subtitle: 'Akses Instan',
      description: 'Baca kapan saja di HP atau Tablet tanpa menunggu kurir.',
      icon: Smartphone,
      badge: 'Hemat Ongkir',
      color: 'bg-white text-venice-blue-950 border-merino-300/60 hover:border-rock-blue',
      iconColor: 'bg-venice-blue-50 text-venice-blue-800',
      path: '/store?format=ebook'
    },
    {
      id: 'audiobook',
      title: 'Audiobook',
      subtitle: 'Dengarkan Buku',
      description: 'Cocok buat kamu yang aktif dan suka dengerin narasi.',
      icon: Headphones,
      badge: 'Rilisan Baru',
      color: 'bg-white text-venice-blue-950 border-merino-300/60 hover:border-rock-blue',
      iconColor: 'bg-merino text-venice-blue-900',
      path: '/store?format=audiobook'
    }
  ]

  // Status Ringkasan Pengguna (Cart & Orders)
  const userSummary = {
    userName: 'Eko Kurniawan',
    cartCount: 3,
    activeOrder: {
      id: 'ORD-20260813-09',
      status: 'Dalam Pengiriman',
      itemCount: 2,
      estimatedArrival: 'Besok, 14 Aug'
    },
    readingProgress: {
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      progress: 65,
      cover: '/storage/assets/images/ex.png'
    }
  }

  // Quick Action Menu
  const quickActions = [
    { label: 'Keranjang', icon: ShoppingBag, path: '/cart', badge: userSummary.cartCount, color: 'bg-venice-blue-50 text-venice-blue-800' },
    { label: 'Pesanan Saya', icon: Truck, path: '/orders', badge: '1 Aktif', color: 'bg-rock-blue/10 text-venice-blue-900' },
    { label: 'Notifikasi', icon: Bell, path: '/notifications', badge: 'New', color: 'bg-merino text-venice-blue-900' },
    { label: 'Buku Disimpan', icon: Bookmark, path: '/wishlist', badge: null, color: 'bg-venice-blue-100/50 text-venice-blue-800' },
  ]

  // Top Recomendations
  const recommendedBooks = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 'Rp 108.000',
      rating: 4.8,
      cover: '/storage/assets/images/statis/book2.webp'
    },
    {
      id: 2,
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      price: 'Rp 145.000',
      rating: 5.0,
      cover: '/storage/assets/images/statis/book3.webp'
    },
    {
      id: 3,
      title: 'Sapiens: Riwayat Singkat',
      author: 'Yuval Noah Harari',
      price: 'Rp 165.000',
      rating: 4.9,
      cover: '/storage/assets/images/statis/book4.webp'
    }
  ]

  return (
    <div className="space-y-8 pb-12 font-sans text-venice-blue-950">
      
      {/* 1. WELCOME BANNER & STATS QUICKBAR (Tetap nempel ke sisi layar) */}
      <div className="relative rounded-b-3xl bg-gradient-to-r from-venice-blue-950 via-venice-blue-900 to-venice-blue-800 p-6 md:p-8 text-merino shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-merino/10 backdrop-blur-md text-rock-blue-light text-xs font-semibold uppercase tracking-wider border border-merino/20">
                <Sparkles className="w-3.5 h-3.5" /> Dashboard Member
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-2">
                Halo, {userSummary.userName} 👋
              </h1>
              <p className="text-merino-200 text-xs md:text-sm font-light">
                Siap melanjutkan petualangan membacamu hari ini?
              </p>
            </div>

            {/* Global Search Bar */}
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Cari cepat buku..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-merino-50 text-venice-blue-950 placeholder-venice-blue-600/50 text-xs focus:outline-none focus:ring-2 focus:ring-rock-blue shadow-inner"
              />
              <Search className="w-4 h-4 text-venice-blue-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quick Navigasi Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {quickActions.map((action, idx) => (
              <Link 
                key={idx} 
                to={action.path}
                className="bg-merino/10 backdrop-blur-md border border-merino/15 hover:bg-merino/20 transition-all p-3.5 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${action.color}`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-merino group-hover:text-rock-blue-light transition-colors">
                    {action.label}
                  </span>
                </div>
                {action.badge && (
                  <span className="text-[10px] font-bold bg-rock-blue text-venice-blue-950 px-2 py-0.5 rounded-full">
                    {action.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* WRAPPER DENGAN PADDING UNTUK SECTION DI BAWAHNYA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 2. PILIH FORMAT BUKU (NEW SECTION) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-venice-blue-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rock-blue-dark" /> Mode & Format Bacaan
            </h2>
            <p className="text-xs text-venice-blue-700/80">Pilih format bacaan yang paling nyaman sesuai gayamu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookFormats.map((fmt) => {
              const Icon = fmt.icon
              return (
                <div
                  key={fmt.id}
                  onClick={() => navigate(fmt.path)}
                  className={`p-5 rounded-2xl border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between group ${fmt.color}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl ${fmt.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rock-blue/20 text-venice-blue-900">
                        {fmt.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base">{fmt.title}</h3>
                      <p className="text-xs font-semibold opacity-75">{fmt.subtitle}</p>
                      <p className="text-xs mt-2 opacity-80 leading-relaxed">{fmt.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all">
                    <span>Eksplor Format</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* 3. RANGKUMAN DUA KOLOM: DIBACA & STATUS PESANAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Lanjutkan Membaca */}
          <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-venice-blue-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rock-blue-dark" /> Terakhir Dibaca
              </h2>
              <span className="text-xs font-semibold text-rock-blue-dark bg-merino px-2.5 py-1 rounded-lg">
                {userSummary.readingProgress.progress}% Selesai
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <img 
                src={userSummary.readingProgress.cover} 
                alt="Reading Cover" 
                className="w-16 h-20 object-cover rounded-xl shadow-sm border border-merino-200"
              />
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-sm text-venice-blue-950">{userSummary.readingProgress.title}</h3>
                <p className="text-xs text-venice-blue-700/80">{userSummary.readingProgress.author}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-merino-200 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-venice-blue-800 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${userSummary.readingProgress.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-merino-100 hover:bg-merino text-venice-blue-900 text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-merino-300/50">
              Lanjutkan Membaca <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card: Rangkuman Transaksi / Pesanan Aktif */}
          <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-venice-blue-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-rock-blue-dark" /> Pesanan Sedang Berjalan
              </h2>
              <span className="text-[10px] font-mono font-bold bg-venice-blue-50 text-venice-blue-800 px-2 py-1 rounded-md">
                {userSummary.activeOrder.id}
              </span>
            </div>

            <div className="space-y-3 bg-merino-50/50 p-4 rounded-xl border border-merino-200">
              <div className="flex justify-between items-center text-xs">
                <span className="text-venice-blue-700/80">Status Pengiriman:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {userSummary.activeOrder.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-venice-blue-700/80">Estimasi Tiba:</span>
                <span className="font-bold text-venice-blue-950">{userSummary.activeOrder.estimatedArrival}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/orders')}
              className="mt-4 w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Lacak Pesanan Lengkap <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* 4. PROMO DISKON BANNER RINGKAS */}
        <div className="bg-gradient-to-r from-merino via-merino-100 to-merino-50 rounded-2xl p-6 border border-rock-blue/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-venice-blue-800 text-merino rounded-2xl shrink-0">
              <Flame className="w-6 h-6 text-rock-blue-light" />
            </div>
            <div>
              <h3 className="font-bold text-venice-blue-950 text-sm md:text-base">Voucher Spesial Minggu Ini 🎉</h3>
              <p className="text-xs text-venice-blue-800/80">Gunakan kode <span className="font-mono font-bold text-venice-blue-950">BABOOKU2026</span> saat checkout.</p>
            </div>
          </div>
          <Link 
            to="/store" 
            className="bg-rock-blue text-venice-blue-950 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-rock-blue-dark hover:text-merino transition-colors shrink-0 w-full sm:w-auto text-center shadow-sm"
          >
            Ke Toko & Gunakan
          </Link>
        </div>

        {/* 5. REKOMENDASI SINGKAT (MINI STORE SECTION) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-venice-blue-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rock-blue-dark" /> Rekomendasi Untukmu
              </h2>
              <p className="text-xs text-venice-blue-700/80">Buku-buku pilihan berdasarkan kategori favoritmu.</p>
            </div>
            <Link to="/store" className="text-xs font-bold text-venice-blue-800 hover:underline flex items-center gap-1">
              Lihat Katalog Lengkap <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid Card Ringkas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white rounded-2xl border border-merino-300/60 p-4 flex gap-4 items-center hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => navigate('/store')}
              >
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-16 h-22 object-cover rounded-xl bg-merino-100 shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1 text-amber-500 text-[11px] font-semibold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                  <h3 className="font-bold text-xs text-venice-blue-950 truncate group-hover:text-venice-blue-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-venice-blue-700/70 truncate">{book.author}</p>
                  <p className="text-xs font-black text-venice-blue-900 pt-1">{book.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
