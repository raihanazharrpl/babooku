// resources/pages/StorePage/index.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Filter, Star, ShoppingCart, Heart, 
  BookOpen, Smartphone, Headphones, ChevronDown, 
  X, SlidersHorizontal, ArrowUpDown, Check, Loader2
} from 'lucide-react'

// Import Helper (Pastikan path-nya sesuai)
import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah } from '#resources/helpers/priceHelper.js';

export default function StorePage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Terbaru')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  // --- STATE DATA DARI DATABASE ---
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState({}); // Menyimpan status like lokal per buku

  // Format statis (karena di DB belum ada tabel format khusus, kita pakai mock untuk filter UI)
  const filterFormats = [
    { id: 'physical', label: 'Buku Fisik', icon: BookOpen },
    { id: 'ebook', label: 'E-Book', icon: Smartphone },
    { id: 'audiobook', label: 'Audiobook', icon: Headphones }
  ]

  // --- FETCH DATA BUKU & KATEGORI ---
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [resBooks, resCategories] = await Promise.all([
          fetch('/api/books').then(res => res.json()),
          fetch('/api/categories').then(res => res.json())
        ]);

        if (resBooks.success) setBooks(resBooks.data || []);
        if (resCategories.success) setCategories(resCategories.data || []);
      } catch (error) {
        console.error('Gagal mengambil data dari DB:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // --- HANDLER FITUR LIKE ---
  const handleToggleLike = async (bookId) => {
    const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage

    // 1. Cek apakah user sudah login
    if (!token) {
      alert('Kamu harus login terlebih dahulu untuk menambahkan buku ke favorit/like!');
      return;
    }

    // 2. Jika sudah login, kirim request POST ke API
    try {
      const res = await fetch('/api/books/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ book_id: bookId })
      });
      const json = await res.json();

      if (json.success) {
        // Update state hati (merah/kosong) berdasarkan response API
        setLikedBooks(prev => ({
          ...prev,
          [bookId]: json.is_liked
        }));
      } else {
        alert('Gagal: ' + json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER / BREADCRUMB PAGE */}
      <div className="bg-white border-b border-merino-300/60 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Katalog Buku</h1>
              <p className="text-sm text-venice-blue-700/80 mt-1">Temukan bacaan terbaik dari berbagai genre dan format.</p>
            </div>
            
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

      {/* 2. MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* --- LEFT SIDEBAR (FILTERS) --- */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 h-max">
          <div className="flex items-center gap-2 pb-4 border-b border-merino-300">
            <SlidersHorizontal className="w-5 h-5 text-venice-blue-800" />
            <h2 className="font-bold text-venice-blue-900 text-lg">Filter</h2>
          </div>

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

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Kategori</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-merino-300 scrollbar-track-transparent">
              {/* Mapping Kategori Asli dari DB */}
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-merino-300 group-hover:border-rock-blue transition-colors overflow-hidden">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="absolute inset-0 bg-venice-blue-800 opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-venice-blue-800 group-hover:text-venice-blue-950">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* --- RIGHT CONTENT --- */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 bg-white border border-merino-300 px-4 py-2 rounded-xl text-sm font-bold text-venice-blue-900 shadow-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <p className="text-sm text-venice-blue-700">Menampilkan <strong>{books.length}</strong> produk</p>
            </div>

            <div className="relative">
              <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} className="flex items-center gap-2 bg-white border border-merino-300 px-4 py-2 rounded-xl text-sm font-semibold text-venice-blue-900 shadow-sm hover:border-rock-blue transition-colors w-full sm:w-auto justify-between">
                <span className="flex items-center gap-1.5"><ArrowUpDown className="w-4 h-4 text-venice-blue-600"/> Urutkan: {sortBy}</span>
                <ChevronDown className={`w-4 h-4 text-venice-blue-600 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-merino-200 rounded-xl shadow-xl z-20 py-2">
                  {['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Rating Tertinggi'].map((option) => (
                    <button key={option} onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-merino-50 transition-colors ${sortBy === option ? 'text-venice-blue-900 font-bold bg-merino-50/50' : 'text-venice-blue-700'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-venice-blue-600">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="font-semibold">Memuat katalog buku...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="bg-white rounded-3xl border border-merino-300/70 p-12 text-center text-venice-blue-600 font-semibold shadow-sm">
              Belum ada buku di dalam katalog.
            </div>
          ) : (
            /* --- PRODUCT GRID (Dari Database) --- */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {books.map((book) => {
                const isLiked = likedBooks[book.id] || false;
                
                return (
                  <div key={book.id} className="group bg-white rounded-2xl border border-merino-300/60 hover:border-rock-blue transition-all duration-300 hover:shadow-xl hover:shadow-rock-blue/10 flex flex-col justify-between overflow-hidden relative">
                    
                    <div className="relative aspect-[3/4] bg-merino-100 overflow-hidden">
                      <img 
                        src={book.cover_image ? getCoverUrl(book.cover_image) : 'https://via.placeholder.com/300x400?text=No+Cover'} 
                        alt={book.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                        {book.discount_id && (
                          <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
                            Promo
                          </span>
                        )}
                        <span className="bg-venice-blue-900/90 backdrop-blur-md text-merino text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1 w-max">
                          <BookOpen className="w-3 h-3 text-rock-blue-light"/> Fisik
                        </span>
                      </div>

                      {/* Tombol Like Dinamis */}
                      <button 
                        onClick={() => handleToggleLike(book.id)}
                        className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm z-10 active:scale-95 ${
                          isLiked 
                            ? 'bg-red-50 text-red-500 border border-red-200' 
                            : 'bg-white/90 text-venice-blue-800 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                      </button>
                      
                      <div className="hidden lg:flex absolute inset-0 bg-venice-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
                        <Link to={`/store/book/${book.id}`} className="bg-venice-blue-900 text-merino font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto hover:bg-venice-blue-800">
                          <Search className="w-4 h-4" /> Detail
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-venice-blue-600/80">
                          <span className="truncate pr-2">{book.category_name || 'Umum'}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-semibold shrink-0">
                            <Star className="w-3 h-3 fill-amber-400" /> 5.0
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
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && books.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2 bg-white border border-merino-300 p-1.5 rounded-xl shadow-sm">
                <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-400 cursor-not-allowed">Prev</button>
                <button className="w-8 h-8 rounded-lg bg-venice-blue-900 text-merino font-bold text-sm flex items-center justify-center">1</button>
                <button className="px-3 py-1.5 text-sm font-semibold text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors">Next</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
