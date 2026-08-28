import React from 'react';
import { useNavigate } from 'react-router';
import { Star, ShoppingCart, Heart, BookOpen, Search } from 'lucide-react';
import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah } from '#resources/helpers/priceHelper.js';

export default function BookCard({ book, isLiked, onToggleLike, onAddToCart }) {
  const navigate = useNavigate();

  // Handler navigasi ke detail buku saat area kartu diklik
  const handleCardClick = () => {
    navigate(`/store/book/${book.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-merino-300/60 hover:border-rock-blue transition-all duration-300 hover:shadow-xl hover:shadow-rock-blue/10 flex flex-col justify-between overflow-hidden relative cursor-pointer"
    >
      {/* 1. SAMPUL BUKU & BADGES */}
      <div className="relative aspect-[3/4] bg-merino-100 overflow-hidden">
        <img 
          src={book.cover_image ? getCoverUrl(book.cover_image) : 'https://via.placeholder.com/300x400?text=No+Cover'} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges Absolute */}
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

        {/* Tombol Like (e.stopPropagation agar tidak memicu navigasi kartu) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleLike) onToggleLike(book.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm z-10 active:scale-95 ${
            isLiked 
              ? 'bg-red-50 text-red-500 border border-red-200' 
              : 'bg-white/90 text-venice-blue-800 hover:bg-red-50 hover:text-red-500'
          }`}
          title="Tambah ke Favorit"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
        </button>
        
        {/* Hover Overlay Desktop */}
        <div className="hidden lg:flex absolute inset-0 bg-venice-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
          <div className="bg-venice-blue-900 text-merino font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Search className="w-4 h-4" /> Detail
          </div>
        </div>
      </div>

      {/* 2. INFORMASI BUKU & HARGA */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-venice-blue-600/80">
            <span className="truncate pr-2">{book.category_name || 'Umum'}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold shrink-0">
              <Star className="w-3 h-3 fill-amber-400" /> {book.rating || '5.0'}
            </div>
          </div>
          
          <h3 className="font-bold text-venice-blue-950 line-clamp-2 leading-tight group-hover:text-venice-blue-700 transition-colors">
            {book.title}
          </h3>
          
          <p className="text-xs text-venice-blue-700/70">{book.author}</p>
        </div>

        <div className="pt-3 mt-3 border-t border-merino-200">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm sm:text-base font-black text-venice-blue-900">
                {formatRupiah(book.price)}
              </p>
            </div>

            {/* Tombol Keranjang (e.stopPropagation agar tidak memicu navigasi kartu) */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(book);
              }}
              className="bg-rock-blue/10 hover:bg-rock-blue text-venice-blue-900 hover:text-venice-blue-950 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors active:scale-95 shrink-0"
              title="+ Keranjang"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
