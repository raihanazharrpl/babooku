import React, { useState, useEffect, useMemo } from 'react';
import { Filter, BookOpen, Smartphone, Headphones, ChevronDown, ArrowUpDown, Loader2 } from 'lucide-react';
import { filterBooksBySearch } from '#resources/helpers/searchingHelper.js';

import StoreHeader from './components/StoreHeader.jsx';
import StoreSidebar from './components/StoreSidebar.jsx';
import StoreMobileFilter from './components/StoreMobileFilter.jsx';
import BookCard from './components/BookCard.jsx';
import StorePagination from './components/StorePagination.jsx';

export default function StorePage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Terbaru');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState({});

  const filterFormats = [
    { id: 'physical', label: 'Buku Fisik', icon: BookOpen },
    { id: 'ebook', label: 'E-Book', icon: Smartphone },
    { id: 'audiobook', label: 'Audiobook', icon: Headphones }
  ];

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

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) 
        ? prev.filter((id) => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleToggleLike = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Kamu harus login terlebih dahulu untuk menambahkan buku ke favorit/like!');
      return;
    }

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
        setLikedBooks((prev) => ({
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

  // Filter buku secara langsung menggunakan helper searching
  const filteredBooks = useMemo(() => {
    let result = filterBooksBySearch(books, searchQuery);

    if (selectedCategories.length > 0) {
      result = result.filter((book) => selectedCategories.includes(book.category_id));
    }

    return result;
  }, [books, searchQuery, selectedCategories]);

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      <StoreHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        <StoreSidebar 
          filterFormats={filterFormats} 
          categories={categories} 
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        <StoreMobileFilter 
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filterFormats={filterFormats}
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileFilterOpen(true)} 
                className="lg:hidden flex items-center gap-2 bg-white border border-merino-300 px-4 py-2 rounded-xl text-sm font-bold text-venice-blue-900 shadow-sm"
              >
                <Filter className="w-4 h-4" /> Filter
              </button>
              <p className="text-sm text-venice-blue-700">
                Menampilkan <strong>{filteredBooks.length}</strong> produk
              </p>
            </div>

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
                  {['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Rating Tertinggi'].map((option) => (
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

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-venice-blue-600">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="font-semibold">Memuat katalog buku...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-merino-300/70 p-12 text-center text-venice-blue-600 font-semibold shadow-sm">
              Belum ada buku yang sesuai dengan pencarian atau filter kamu.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBooks.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  isLiked={likedBooks[book.id] || false} 
                  onToggleLike={handleToggleLike} 
                />
              ))}
            </div>
          )}

          {!isLoading && filteredBooks.length > 0 && <StorePagination />}

        </div>
      </div>
    </div>
  );
}
