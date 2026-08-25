import React from 'react';
import { X, Check } from 'lucide-react';

export default function StoreMobileFilter({ 
  isOpen, 
  onClose, 
  filterFormats, 
  categories, 
  selectedCategories, 
  onCategoryToggle 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl z-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-merino-300 pb-4">
            <h2 className="font-bold text-lg text-venice-blue-900">Filter Katalog</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-merino-100">
              <X className="w-5 h-5 text-venice-blue-800" />
            </button>
          </div>

          {/* Format Buku */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase">Format Buku</h3>
            <div className="space-y-2">
              {filterFormats.map((fmt) => (
                <label key={fmt.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded text-venice-blue-800" />
                  <span className="text-sm text-venice-blue-800 flex items-center gap-2">
                    <fmt.icon className="w-4 h-4 text-venice-blue-600" /> {fmt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-venice-blue-950 uppercase">Kategori</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((cat) => {
                const isChecked = selectedCategories.includes(cat.id);
                return (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => onCategoryToggle(cat.id)}
                      className="rounded text-venice-blue-800" 
                    />
                    <span className="text-sm text-venice-blue-800">{cat.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-venice-blue-900 text-white font-bold py-3 rounded-xl hover:bg-venice-blue-800 transition-colors"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}
