// resources/pages/StorePage/index.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Filter, Star, ShoppingCart, Heart, 
  BookOpen, Smartphone, Headphones, ChevronDown, 
  X, SlidersHorizontal, ArrowUpDown, Check
} from 'lucide-react'

export default function StorePage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Terbaru')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  // --- MOCK DATA ---
  const filterCategories = ['Novel & Sastra', 'Pengembangan Diri', 'Bisnis & Ekonomi', 'Sains & Teknologi', 'Sejarah', 'Komik']
  const filterFormats = [
    { id: 'physical', label: 'Buku Fisik', icon: BookOpen },
    { id: 'ebook', label: 'E-Book', icon: Smartphone },
    { id: 'audiobook', label: 'Audiobook', icon: Headphones }
  ]

  const books = [
    {
      id: 1, title: 'Filosofi Teras', author: 'Henry Manampiring',
      price: 98000, originalPrice: 115000, rating: 4.9, sold: '1.2k',
      format: 'physical', isBestSeller: true, discount: 15,
      cover: '/storage/assets/images/ex.png', category: 'Pengembangan Diri'
    },
    {
      id: 2, title: 'Atomic Habits (Digital Edition)', author: 'James Clear',
      price: 85000, originalPrice: null, rating: 4.8, sold: '3.5k',
      format: 'ebook', isBestSeller: true, discount: 0,
      cover: '/storage/assets/images/statis/book2.webp', category: 'Pengembangan Diri'
    },
    {
      id: 3, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer',
      price: 145000, originalPrice: 160000, rating: 5.0, sold: '950+',
      format: 'physical', isBestSeller: false, discount: 10,
      cover: '/storage/assets/images/statis/book3.webp', category: 'Novel & Sastra'
    },
    {
      id: 4, title: 'Sapiens: Riwayat Singkat (Audio)', author: 'Yuval Noah Harari',
      price: 120000, originalPrice: 150000, rating: 4.7, sold: '800',
      format: 'audiobook', isBestSeller: false, discount: 20,
      cover: '/storage/assets/images/statis/book4.webp', category: 'Sains & Teknologi'
    },
    {
      id: 5, title: 'Cantik Itu Luka', author: 'Eka Kurniawan',
      price: 110000, originalPrice: null, rating: 4.8, sold: '2.1k',
      format: 'physical', isBestSeller: true, discount: 0,
      cover: 'https://via.placeholder.com/300x400?text=Cantik+Itu+Luka', category: 'Novel & Sastra'
    },
    {
      id: 6, title: 'The Psychology of Money', author: 'Morgan Housel',
      price: 75000, originalPrice: 90000, rating: 4.9, sold: '4.2k',
      format: 'ebook', isBestSeller: true, discount: 15,
      cover: 'https://via.placeholder.com/300x400?text=Psychology+of+Money', category: 'Bisnis & Ekonomi'
    }
  ]

  // --- HELPER UNTUK FORMAT RUPIAH ---
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER / BREADCRUMB PAGE */}
      <div className="bg-white border-b border-merino-300/60 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Katalog Buku</h1>
              <p className="text-sm text-venice-blue-700/80 mt-1">Temukan {books.length}+ bacaan terbaik dari berbagai genre dan format.</p>
            </div>
            
            {/* Search Bar Global Store */}
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Cari judul, penulis, ISBN..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-merino-100 border border-merino-200 text-venice-blue-950 placeholder-venice-blue-600/50 text-sm focus:outline-none focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/30 transition-all"
              />
              <Search className="w-4 h-4 text-venice-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (SIDEBAR & GRID) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* --- LEFT SIDEBAR (FILTERS) - Desktop Only --- */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 h-max">
          <div className="flex items-center gap-2 pb-4 border-b border-merino-300">
            <SlidersHorizontal className="w-5 h-5 text-venice-blue-800" />
            <h2 className="font-bold text-venice-blue-900 text-lg">Filter</h2>
          </div>

          {/* Filter: Format */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Format Buku</h3>
            <div className="space-y-2">
              {filterFormats.map(fmt => (
                <label key={fmt.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-merino-300 group-hover:border-rock-blue transition-colors overflow-hidden">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="absolute inset-0 bg-venice-blue-800 opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-venice-blue-800 group-hover:text-venice-blue-950 flex items-center gap-2">
                    <fmt.icon className="w-4 h-4 text-venice-blue-600" /> {fmt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: Kategori */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Kategori</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-merino-300 scrollbar-track-transparent">
              {filterCategories.map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-merino-300 group-hover:border-rock-blue transition-colors overflow-hidden">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="absolute inset-0 bg-venice-blue-800 opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-venice-blue-800 group-hover:text-venice-blue-950">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: Harga */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Rentang Harga</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" className="w-full px-3 py-2 rounded-lg bg-white border border-merino-300 text-sm focus:border-rock-blue focus:ring-1 focus:ring-rock-blue outline-none" />
              <span className="text-venice-blue-400">-</span>
              <input type="number" placeholder="Max" className="w-full px-3 py-2 rounded-lg bg-white border border-merino-300 text-sm focus:border-rock-blue focus:ring-1 focus:ring-rock-blue outline-none" />
            </div>
            <button className="w-full bg-merino-200 text-venice-blue-900 text-xs font-bold py-2 rounded-lg hover:bg-merino-300 transition-colors">
              Terapkan Harga
            </button>
          </div>
        </aside>

        {/* --- RIGHT CONTENT (TOOLBAR & PRODUCT GRID) --- */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Toolbar Buka Filter Mobile & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            
            <div className="flex items-center gap-3">
              {/* Tombol Filter Mobile */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-merino-300 px-4 py-2 rounded-xl text-sm font-bold text-venice-blue-900 shadow-sm"
              >
                <Filter className="w-4 h-4" /> Filter
              </button>
              <p className="text-sm text-venice-blue-700">Menampilkan <strong>{books.length}</strong> produk</p>
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 bg-white border border-merino-300 px-4 py-2 rounded-xl text-sm font-semibold text-venice-blue-900 shadow-sm hover:border-rock-blue transition-colors w-full sm:w-auto justify-between"
              >
                <span className="flex items-center gap-1.5"><ArrowUpDown className="w-4 h-4 text-venice-blue-600"/> Urutkan: {sortBy}</span>
                <ChevronDown className={`w-4 h-4 text-venice-blue-600 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-merino-200 rounded-xl shadow-xl z-20 py-2">
                  {['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Rating Tertinggi', 'Terlaris'].map((option) => (
                    <button 
                      key={option}
                      onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-merino-50 transition-colors ${sortBy === option ? 'text-venice-blue-900 font-bold bg-merino-50/50' : 'text-venice-blue-700'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1 bg-rock-blue/20 text-venice-blue-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
              Format: E-Book <X className="w-3.5 h-3.5 hover:text-red-500 cursor-pointer" />
            </span>
            <span className="inline-flex items-center gap-1 bg-rock-blue/20 text-venice-blue-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
              Novel & Sastra <X className="w-3.5 h-3.5 hover:text-red-500 cursor-pointer" />
            </span>
            <button className="text-xs font-semibold text-venice-blue-600 hover:text-venice-blue-950 underline underline-offset-2 ml-2">
              Hapus Semua
            </button>
          </div>

          {/* --- PRODUCT GRID --- */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="group bg-white rounded-2xl border border-merino-300/60 hover:border-rock-blue transition-all duration-300 hover:shadow-xl hover:shadow-rock-blue/10 flex flex-col justify-between overflow-hidden relative"
              >
                
                {/* Bagian Gambar & Badges */}
                <div className="relative aspect-[3/4] bg-merino-100 overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Cover+Buku' }} 
                  />
                  
                  {/* Badges Absolute */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    {book.discount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
                        -{book.discount}%
                      </span>
                    )}
                    {/* Badge Format Buku */}
                    <span className="bg-venice-blue-900/90 backdrop-blur-md text-merino text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 w-max">
                      {book.format === 'physical' && <><BookOpen className="w-3 h-3 text-rock-blue-light"/> Fisik</>}
                      {book.format === 'ebook' && <><Smartphone className="w-3 h-3 text-rock-blue-light"/> E-Book</>}
                      {book.format === 'audiobook' && <><Headphones className="w-3 h-3 text-rock-blue-light"/> Audio</>}
                    </span>
                  </div>

                  {/* Wishlist Toggle */}
                  <button className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-venice-blue-800 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm z-10 active:scale-95">
                    <Heart className="w-4 h-4" />
                  </button>
                  
                  {/* Hover Overlay Kelihatan di Desktop */}
                  <div className="hidden lg:flex absolute inset-0 bg-venice-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
                    <button className="bg-venice-blue-900 text-merino font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto hover:bg-venice-blue-800">
                      <Search className="w-4 h-4" /> Detail
                    </button>
                  </div>
                </div>

                {/* Bagian Informasi & Harga */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-venice-blue-600/80">
                      <span className="truncate pr-2">{book.category}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" /> {book.rating}
                      </div>
                    </div>
                    <Link to={`/store/book/${book.id}`} className="block">
                      <h3 className="font-bold text-venice-blue-950 line-clamp-2 leading-tight group-hover:text-venice-blue-700 transition-colors">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-venice-blue-700/70">{book.author}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-merino-200">
                    <div className="flex items-end justify-between">
                      <div>
                        {book.originalPrice && (
                          <p className="text-[10px] sm:text-xs line-through text-venice-blue-600/50 mb-0.5">
                            {formatRupiah(book.originalPrice)}
                          </p>
                        )}
                        <p className="text-sm sm:text-base font-black text-venice-blue-900">
                          {formatRupiah(book.price)}
                        </p>
                      </div>
                      <button className="bg-rock-blue/10 hover:bg-rock-blue text-venice-blue-900 hover:text-venice-blue-950 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors active:scale-95 shrink-0">
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination UI */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 bg-white border border-merino-300 p-1.5 rounded-xl shadow-sm">
              <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-400 cursor-not-allowed">Prev</button>
              <button className="w-8 h-8 rounded-lg bg-venice-blue-900 text-merino font-bold text-sm flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-merino-100 text-venice-blue-800 font-bold text-sm flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-merino-100 text-venice-blue-800 font-bold text-sm flex items-center justify-center transition-colors">3</button>
              <span className="px-1 text-venice-blue-400">...</span>
              <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors">Next</button>
            </div>
          </div>

        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER (OVERLAY) --- */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-venice-blue-950/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-merino-300/60 bg-merino-50">
              <h2 className="font-bold text-lg text-venice-blue-950 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-venice-blue-800" /> Filter
              </h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 bg-white rounded-lg text-venice-blue-900 border border-merino-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               {/* Mobile Filter: Format */}
               <div className="space-y-3">
                <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Format Buku</h3>
                <div className="space-y-3">
                  {filterFormats.map(fmt => (
                    <label key={fmt.id} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-merino-300 text-venice-blue-800 focus:ring-rock-blue" />
                      <span className="text-sm font-medium text-venice-blue-800 flex items-center gap-2">
                        <fmt.icon className="w-4 h-4 text-venice-blue-600" /> {fmt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Filter: Kategori */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Kategori</h3>
                <div className="space-y-3">
                  {filterCategories.map((cat, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-merino-300 text-venice-blue-800 focus:ring-rock-blue" />
                      <span className="text-sm font-medium text-venice-blue-800">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Filter: Harga */}
              <div className="space-y-3 pb-8">
                <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Rentang Harga</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 rounded-xl bg-merino-50 border border-merino-200 text-sm" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 rounded-xl bg-merino-50 border border-merino-200 text-sm" />
                </div>
              </div>
            </div>

            {/* Bottom Actions Drawer */}
            <div className="p-4 border-t border-merino-300/60 bg-white grid grid-cols-2 gap-3 pb-safe">
              <button className="py-3 rounded-xl border border-merino-300 text-venice-blue-900 font-bold text-sm hover:bg-merino-50">Reset</button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="py-3 rounded-xl bg-venice-blue-900 text-merino font-bold text-sm shadow-md"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
