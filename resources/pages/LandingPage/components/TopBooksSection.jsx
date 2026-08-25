import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah } from '#resources/helpers/priceHelper.js';

export default function TopBooksSection({ books, isLoading }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-venice-blue-900">Buku Terfavorit 🔥</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <div className="col-span-4 text-center py-12 text-venice-blue-600"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Memuat buku terfavorit...</div>
        ) : books.length === 0 ? (
          <div className="col-span-4 text-center py-12 text-venice-blue-600 font-semibold">Belum ada buku terfavorit.</div>
        ) : (
          books.map((book) => (
            <div key={book.id} className="group bg-white rounded-2xl border border-merino-300/60 p-4 hover:shadow-2xl hover:shadow-venice-blue-900/10 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-merino-100 border border-merino-200">
                  <img 
                    src={book.cover_image ? getCoverUrl(book.cover_image) : 'https://via.placeholder.com/300x400?text=Cover+Buku'} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-venice-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => navigate('/store')} className="bg-merino text-venice-blue-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-rock-blue hover:text-venice-blue-950 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <p className="text-sm font-medium text-rock-blue-dark">{book.author}</p>
                  <h3 className="font-bold text-venice-blue-950 line-clamp-2 leading-tight min-h-[2.5rem]">{book.title}</h3>
                </div>
              </div>
              <div className="pt-2 px-1 flex items-center justify-between border-t border-merino-100 mt-3">
                <p className="text-lg font-black text-venice-blue-800">{formatRupiah(book.price)}</p>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">❤️ {book.likes_count} Likes</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
