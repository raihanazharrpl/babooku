import React from 'react';
import { Search } from 'lucide-react';
import { handleSearchInput } from '#resources/helpers/searchingHelper.js';

export default function StoreHeader({ searchQuery, setSearchQuery }) {
  return (
    <div className="bg-white border-b border-merino-300/60 pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Katalog Buku</h1>
            <p className="text-sm text-venice-blue-700/80 mt-1">
              Temukan bacaan terbaik dari berbagai genre dan format.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value, setSearchQuery)}
              placeholder="Cari judul, penulis, ISBN..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-merino-100 border border-merino-200 text-venice-blue-950 placeholder-venice-blue-600/50 text-sm focus:outline-none focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/30 transition-all"
            />
            <Search className="w-4 h-4 text-venice-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
