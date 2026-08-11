// resources/pages/HomePage/index.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, TrendingUp, Sparkles, Star, ShoppingCart, 
  BookOpen, Clock, Heart, Flame, ArrowRight, ChevronRight,
  Filter
} from 'lucide-react'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  // Banner Promo Highlights
  const bannerPromo = {
    title: "Diskon Spesial Hari Ini 📚",
    subtitle: "Dapatkan potongan hingga 30% untuk semua buku terbitan kategori Best Seller!",
    code: "BABOOKU2026"
  }

  // Categories
  const categories = ['Semua', 'Novel', 'Pengembangan Diri', 'Bisnis', 'Sains']

  // Book Data
  const popularBooks = [
    {
      id: 1,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      category: 'Pengembangan Diri',
      price: 'Rp 98.000',
      originalPrice: 'Rp 115.000',
      rating: 4.9,
      sold: '1.2k',
      cover: '/storage/assets/images/ex.png',
      isTrending: true
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Pengembangan Diri',
      price: 'Rp 108.000',
      originalPrice: 'Rp 128.000',
      rating: 4.8,
      sold: '2.5k',
      cover: '/storage/assets/images/statis/book2.webp',
      isTrending: true
    },
    {
      id: 3,
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      category: 'Novel',
      price: 'Rp 145.000',
      originalPrice: 'Rp 160.000',
      rating: 5.0,
      sold: '950+',
      cover: '/storage/assets/images/statis/book3.webp',
      isTrending: false
    },
    {
      id: 4,
      title: 'Sapiens: Riwayat Singkat',
      author: 'Yuval Noah Harari',
      category: 'Sains',
      price: 'Rp 165.000',
      originalPrice: 'Rp 195.000',
      rating: 4.9,
      sold: '1.8k',
      cover: '/storage/assets/images/statis/book4.webp',
      isTrending: true
    }
  ]

  // Filter Buku berdasarkan Kategori
  const filteredBooks = selectedCategory === 'Semua' 
    ? popularBooks 
    : popularBooks.filter(book => book.category === selectedCategory)

  return (
    <div className="space-y-8 pb-12 font-sans text-venice-blue-950">
      
      {/* 1. WELCOME BANNER & SEARCH BAR */}
      <div className="relative rounded-b-3xl bg-gradient-to-r from-venice-blue-900 via-venice-blue-800 to-venice-blue-700 p-6 md:p-10 text-merino shadow-xl overflow-hidden">
        {/* Ornamen Latar Belakang */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-merino/10 rounded-full blur-2xl pointer-events-none" />
      
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-merino/10 backdrop-blur-md text-rock-blue-light text-xs font-semibold uppercase tracking-wider border border-merino/20">
            <Sparkles className="w-3.5 h-3.5" /> Selamat Datang Kembali!
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Mau Baca Buku Apa Hari Ini?
          </h1>
          <p className="text-merino-200 text-sm md:text-base font-light">
            Temukan ribuan koleksi buku original dengan penawaran menarik.
          </p>
      
          {/* Search Input */}
          <div className="pt-2 flex items-center">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Cari judul buku, penulis, atau ISBN..." 
                className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-merino-50 text-venice-blue-950 placeholder-venice-blue-600/50 focus:outline-none focus:ring-2 focus:ring-rock-blue shadow-md text-sm transition-all"
              />
              <Search className="w-5 h-5 text-venice-blue-700 absolute left-4 top-1/2 -translate-y-1/2" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-venice-blue-900 text-merino px-4 py-2 rounded-xl text-xs font-bold hover:bg-venice-blue-800 transition-colors">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROMO BANNER (CARD) */}
      <div className="bg-merino rounded-2xl p-6 border border-rock-blue/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-venice-blue-800 text-merino rounded-2xl shrink-0">
            <Flame className="w-6 h-6 text-rock-blue-light" />
          </div>
          <div>
            <h3 className="font-bold text-venice-blue-900 text-base md:text-lg">{bannerPromo.title}</h3>
            <p className="text-xs md:text-sm text-venice-blue-800/80">{bannerPromo.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-mono font-bold bg-white px-3 py-2 rounded-xl border border-merino-300 text-venice-blue-900">
            KODE: {bannerPromo.code}
          </span>
          <Link to="/store" className="bg-rock-blue text-venice-blue-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rock-blue-dark hover:text-merino transition-colors shrink-0">
            Klaim Voucher
          </Link>
        </div>
      </div>

      {/* 3. FILTER KATEGORI & RATING QUICK ACCESS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-venice-blue-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-rock-blue-dark" />
            Jelajahi Buku
          </h2>
          <Link to="/store" className="text-xs md:text-sm font-semibold text-venice-blue-700 hover:text-venice-blue-950 flex items-center gap-1 transition-colors">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-venice-blue-800 text-merino font-bold shadow-md'
                  : 'bg-white text-venice-blue-800 hover:bg-merino-200/60 border border-merino-300/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. GRID BUKU TERLARIS & POPULER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div 
            key={book.id} 
            className="group bg-white rounded-2xl border border-merino-300/60 p-4 shadow-sm hover:shadow-xl hover:border-rock-blue transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Gambar Cover & Badge */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-merino-100 border border-merino-200">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Cover+Buku' }} 
                />
                
                {/* Badge Trending */}
                {book.isTrending && (
                  <span className="absolute top-2 left-2 bg-venice-blue-900/90 backdrop-blur-md text-merino text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                    <TrendingUp className="w-3 h-3 text-rock-blue-light" /> Best Seller
                  </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-md text-venice-blue-800 hover:text-red-500 transition-colors shadow">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Quick Add to Cart Overlay */}
                <div className="absolute inset-0 bg-venice-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-merino text-venice-blue-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-rock-blue transition-colors flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Tambah Keranjang
                  </button>
                </div>
              </div>

              {/* Info Buku */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-venice-blue-600/70">
                  <span>{book.category}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-venice-blue-950 line-clamp-1 group-hover:text-venice-blue-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-venice-blue-700/80">{book.author}</p>
              </div>
            </div>

            {/* Harga & Tombol Beli */}
            <div className="pt-4 mt-3 border-t border-merino-200 flex items-center justify-between">
              <div>
                <p className="text-xs line-through text-slate-400">{book.originalPrice}</p>
                <p className="text-base font-black text-venice-blue-900">{book.price}</p>
              </div>
              <span className="text-[11px] font-medium text-venice-blue-600/70">Terjual {book.sold}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. BANNER KHUSUS AYO BACA / REKOMENDASI */}
      <div className="bg-gradient-to-r from-merino-200 via-merino to-merino-100 rounded-3xl p-8 border border-merino-300/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-venice-blue-700 uppercase tracking-wider">
            Layanan Spesial
          </span>
          <h3 className="text-2xl font-black text-venice-blue-950">
            Bingung Mau Mulai Dari Mana?
          </h3>
          <p className="text-sm text-venice-blue-800/80 max-w-md">
            Gunakan fitur Rekomendasi Pintar kami untuk menemukan buku yang paling cocok dengan minat dan gaya bacamu!
          </p>
        </div>
        <button className="bg-venice-blue-900 text-merino px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-venice-blue-800 transition-all shadow-md shrink-0 flex items-center gap-2">
          Coba Rekomendasi <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
 