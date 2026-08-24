// resources/pages/Admin/BookTagPage.jsx
import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Tags, 
  X, Sparkles, Hash 
} from 'lucide-react';

export default function BookTagPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // Mock Data Tag
  const [tags, setTags] = useState([
    { id: 1, name: 'Best Seller 🔥', slug: 'best-seller', color: 'bg-amber-100 text-amber-900 border-amber-300', usageCount: 84 },
    { id: 2, name: 'Pendatang Baru ✨', slug: 'pendatang-baru', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', usageCount: 42 },
    { id: 3, name: 'Edisi TTD Penulis 🖊️', slug: 'edisi-ttd', color: 'bg-purple-100 text-purple-900 border-purple-300', usageCount: 15 },
    { id: 4, name: 'Pilihan Editor 🎯', slug: 'pilihan-editor', color: 'bg-venice-blue-100 text-venice-blue-900 border-venice-blue-300', usageCount: 29 },
    { id: 5, name: 'Diskon Spesial 🏷️', slug: 'diskon-spesial', color: 'bg-red-100 text-red-900 border-red-300', usageCount: 60 },
  ]);

  const handleOpenEdit = (tag) => {
    setSelectedTag(tag);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (tag) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 font-sans text-venice-blue-950">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Tag & Label Buku</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Atur badge penanda khusus untuk promosi dan *filtering* pencarian.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-rock-blue-light" /> Buat Tag Baru
        </button>
      </div>

      {/* FILTER & PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari label tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700"
          />
        </div>
      </div>

      {/* GRID CARDS TAG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTags.map((tag) => (
          <div key={tag.id} className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${tag.color}`}>
                <Hash className="w-3 h-3" /> {tag.name}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleOpenEdit(tag)} 
                  className="p-1.5 text-venice-blue-700 hover:bg-merino-100 rounded-lg transition-colors"
                  title="Edit Tag"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleOpenDelete(tag)} 
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus Tag"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-merino-100 mt-2">
              <span className="font-mono text-venice-blue-600/70 text-[11px]">{tag.slug}</span>
              <span className="font-bold text-venice-blue-900">{tag.usageCount} Buku</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: TAMBAH / EDIT TAG */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">
                {isEditModalOpen ? 'Edit Tag Label' : 'Buat Tag Baru'}
              </h3>
              <button 
                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
                className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-venice-blue-800 mb-1">Nama Tag / Label</label>
                <input 
                  type="text" 
                  defaultValue={isEditModalOpen ? selectedTag?.name : ''} 
                  placeholder="Contoh: Best Seller 🔥" 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                />
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Slug URL</label>
                <input 
                  type="text" 
                  defaultValue={isEditModalOpen ? selectedTag?.slug : ''} 
                  placeholder="best-seller" 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono text-xs focus:outline-none focus:border-venice-blue-700" 
                />
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Gaya Warna Badge</label>
                <select className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                  <option>Kuning Amber (Best Seller)</option>
                  <option>Hijau Emerald (Baru)</option>
                  <option>Merah (Diskon)</option>
                  <option>Ungu (Spesial / TTD)</option>
                  <option>Venice Blue (Pilihan Editor)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button 
                  type="button" 
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
                  className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100"
                >
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md">
                  Simpan Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: HAPUS TAG */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Tag Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Tag <span className="font-bold text-venice-blue-950">"{selectedTag?.name}"</span> akan dilepas dari semua buku terkait.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100">
                Batal
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
