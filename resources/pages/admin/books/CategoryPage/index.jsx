// resources/pages/Admin/BookCategoryPage.jsx
import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, FolderTree, 
  BookOpen, X, Check, ArrowUpRight 
} from 'lucide-react';

export default function BookCategoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock Data Kategori
  const [categories, setCategories] = useState([
    { id: 1, name: 'Novel & Sastra', slug: 'novel-sastra', bookCount: 3240, description: 'Karya fiksi, novel sejarah, dan literatur sastra klasik maupun modern.' },
    { id: 2, name: 'Pengembangan Diri', slug: 'pengembangan-diri', bookCount: 1520, description: 'Buku seputar motivasi, kebiasaan positif, finansial, dan psikologi.' },
    { id: 3, name: 'Bisnis & Ekonomi', slug: 'bisnis-ekonomi', bookCount: 2100, description: 'Manajemen bisnis, investasi, pemasaran, dan kewirausahaan.' },
    { id: 4, name: 'Sains & Teknologi', slug: 'sains-teknologi', bookCount: 1850, description: 'Buku pengetahuan sains, pemograman, AI, dan inovasi teknologi.' },
  ]);

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 font-sans text-venice-blue-950">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Kategori Buku</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Kelola pengelompokan genre dan bidang ilmu buku di Babooku.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Kategori
        </button>
      </div>

      {/* STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center shrink-0">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Total Kategori</p>
            <h3 className="text-xl font-black text-venice-blue-950">{categories.length} Genre</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rock-blue/20 text-venice-blue-900 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Kategori Terpopuler</p>
            <h3 className="text-xl font-black text-venice-blue-950">Novel & Sastra</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Total Terhubung</p>
            <h3 className="text-xl font-black text-venice-blue-950">8.710 Buku</h3>
          </div>
        </div>
      </div>

      {/* BAR PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari kategori atau slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700"
          />
        </div>
      </div>

      {/* TABEL KATEGORI */}
      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Nama Kategori</th>
                <th className="py-4 px-4">Slug</th>
                <th className="py-4 px-6">Deskripsi</th>
                <th className="py-4 px-4">Jumlah Buku</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-merino-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-venice-blue-950">{cat.name}</td>
                  <td className="py-4 px-4">
                    <span className="bg-merino-200/60 text-venice-blue-800 px-2.5 py-1 rounded-md font-mono text-[11px]">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-venice-blue-700/80 max-w-xs truncate">{cat.description}</td>
                  <td className="py-4 px-4 font-bold text-venice-blue-900">{cat.bookCount} judul</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenEdit(cat)}
                        className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors"
                        title="Edit Kategori"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenDelete(cat)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Kategori"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: TAMBAH / EDIT KATEGORI */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">
                {isEditModalOpen ? 'Edit Kategori' : 'Tambah Kategori Baru'}
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
                <label className="block text-venice-blue-800 mb-1">Nama Kategori</label>
                <input 
                  type="text" 
                  defaultValue={isEditModalOpen ? selectedCategory?.name : ''} 
                  placeholder="Contoh: Bisnis & Finansial" 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                />
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Slug URL</label>
                <input 
                  type="text" 
                  defaultValue={isEditModalOpen ? selectedCategory?.slug : ''} 
                  placeholder="bisnis-finansial" 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono text-xs focus:outline-none focus:border-venice-blue-700" 
                />
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Deskripsi Singkat</label>
                <textarea 
                  rows="3" 
                  defaultValue={isEditModalOpen ? selectedCategory?.description : ''} 
                  placeholder="Penjelasan ringkas genre ini..." 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700"
                ></textarea>
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
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: HAPUS KATEGORI */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Kategori?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Kategori <span className="font-bold text-venice-blue-950">"{selectedCategory?.name}"</span> akan dihapus dari sistem.
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
