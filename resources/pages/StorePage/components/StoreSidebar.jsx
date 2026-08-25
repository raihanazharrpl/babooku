import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

export default function StoreSidebar({ filterFormats, categories, selectedCategories, onCategoryToggle }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 h-max">
      <div className="flex items-center gap-2 pb-4 border-b border-merino-300">
        <SlidersHorizontal className="w-5 h-5 text-venice-blue-800" />
        <h2 className="font-bold text-venice-blue-900 text-lg">Filter</h2>
      </div>

      {/* Format Buku */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Format Buku</h3>
        <div className="space-y-2">
          {filterFormats.map((fmt) => (
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

      {/* Kategori */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-venice-blue-950 uppercase tracking-wider">Kategori</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-merino-300 scrollbar-track-transparent">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-merino-300 group-hover:border-rock-blue transition-colors overflow-hidden">
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => onCategoryToggle(cat.id)}
                    className="peer sr-only" 
                  />
                  <div className={`absolute inset-0 bg-venice-blue-800 transition-opacity flex items-center justify-center ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <span className="text-sm text-venice-blue-800 group-hover:text-venice-blue-950">{cat.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
