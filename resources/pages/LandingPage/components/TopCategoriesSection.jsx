import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Loader2 } from 'lucide-react';

export default function TopCategoriesSection({ categories, isLoading }) {
  const navigate = useNavigate();

  const categoryColorVariants = [
    'bg-merino text-venice-blue-900 border-rock-blue/30 hover:border-rock-blue',
    'bg-venice-blue-50 text-venice-blue-900 border-venice-blue-200 hover:border-venice-blue-400',
    'bg-merino-50 text-venice-blue-900 border-rock-blue-light/50 hover:border-rock-blue'
  ];

  return (
    <div className="bg-merino/60 py-24 border-y border-merino-300/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-venice-blue-900">Subkategori Terpopuler</h2>
            <p className="text-venice-blue-700/80">Subkategori dengan koleksi buku terbanyak minggu ini.</p>
          </div>
          <button onClick={() => navigate('/store')} className="text-venice-blue-700 font-semibold flex items-center gap-1 hover:text-venice-blue-900 transition-colors">
            Lihat Semua Katalog <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 text-center py-8 text-venice-blue-600"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Memuat subkategori...</div>
          ) : categories.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-venice-blue-600 font-semibold">Belum ada subkategori terpopuler.</div>
          ) : (
            categories.map((sub, idx) => (
              <div 
                key={sub.id} 
                onClick={() => navigate('/store')}
                className={`p-6 rounded-3xl border cursor-pointer transition-transform hover:-translate-y-1 ${categoryColorVariants[idx % categoryColorVariants.length]}`}
              >
                <h3 className="text-xl font-bold mb-2">{sub.name}</h3>
                <p className="text-sm opacity-80">{sub.book_count} Judul Buku</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
