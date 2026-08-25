// resources/pages/admin/books/CategoryPage/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, FolderTree, 
  BookOpen, X, Layers, Loader2 
} from 'lucide-react';

export default function BookCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    subcategories: '' // Berupa string dipisahkan koma
  });

  // 1. Fetch Data
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // 2. Modals Handler
  const handleOpenAdd = () => {
    setSelectedCategory(null);
    setFormData({ name: '', slug: '', subcategories: '' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      // Ubah array of object menjadi string dipisahkan koma
      subcategories: category.subcategories ? category.subcategories.map(s => s.name).join(', ') : ''
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Auto Generate Slug saat Nama Kategori diketik
  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, name, slug });
  };

  // 3. Submit Form (POST / PUT)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Ubah string subcategories kembali menjadi array murni
      const subcategoriesArray = formData.subcategories
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');

      const payload = {
        ...formData,
        subcategories: subcategoriesArray
      };

      const url = isEditModalOpen ? `/api/categories?id=${selectedCategory.id}` : '/api/categories';
      const method = isEditModalOpen ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();

      if (json.success) {
        await fetchCategories();
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
      } else {
        alert('Gagal menyimpan: ' + json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Hapus Data (DELETE)
  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/categories?id=${selectedCategory.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchCategories();
        setIsDeleteModalOpen(false);
      } else {
        alert('Gagal menghapus: ' + json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter Data di Tabel
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.subcategories && c.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const totalSubcategories = categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0);

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Kategori & Sub-Kategori</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Kelola pengelompokan genre utama dan sub-topik spesifik buku.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center shrink-0"><FolderTree className="w-6 h-6" /></div>
          <div><p className="text-xs font-semibold text-venice-blue-600/80">Kategori Utama</p><h3 className="text-xl font-black text-venice-blue-950">{categories.length} Genre</h3></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rock-blue/20 text-venice-blue-900 rounded-xl flex items-center justify-center shrink-0"><Layers className="w-6 h-6" /></div>
          <div><p className="text-xs font-semibold text-venice-blue-600/80">Total Sub-Kategori</p><h3 className="text-xl font-black text-venice-blue-950">{totalSubcategories} Sub-Genre</h3></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6" /></div>
          <div><p className="text-xs font-semibold text-venice-blue-600/80">Status Integrasi</p><h3 className="text-xl font-black text-venice-blue-950">Terhubung DB</h3></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input type="text" placeholder="Cari kategori atau slug..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Nama Kategori</th>
                <th className="py-4 px-4">Slug</th>
                <th className="py-4 px-6">Sub-Kategori</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {isFetching ? (
                <tr><td colSpan="4" className="py-12 text-center text-venice-blue-600"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Memuat data...</td></tr>
              ) : filteredCategories.length === 0 ? (
                <tr><td colSpan="4" className="py-12 text-center text-venice-blue-600 font-semibold">Belum ada kategori ditemukan.</td></tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-merino-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-venice-blue-950 text-sm">{cat.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-merino-200/60 text-venice-blue-800 px-2.5 py-1 rounded-md font-mono text-[11px]">{cat.slug}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {cat.subcategories && cat.subcategories.length > 0 ? cat.subcategories.map((sub) => (
                          <span key={sub.id} className="bg-venice-blue-50 border border-venice-blue-200/60 text-venice-blue-900 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                            {sub.name}
                          </span>
                        )) : <span className="text-[10px] text-merino-400 font-semibold italic">Tidak ada sub</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenEdit(cat)} className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleOpenDelete(cat)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT KATEGORI */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">{isEditModalOpen ? 'Edit Kategori & Sub-Kategori' : 'Tambah Kategori Baru'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Nama Kategori Utama</label>
                  <input type="text" required value={formData.name} onChange={handleNameChange} placeholder="Contoh: Bisnis & Finansial" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Slug URL</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="bisnis-finansial" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono text-xs focus:outline-none focus:border-venice-blue-700" />
                </div>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Sub-Kategori (Pisahkan dengan koma)</label>
                <input type="text" value={formData.subcategories} onChange={(e) => setFormData({...formData, subcategories: e.target.value})} placeholder="Contoh: Manajemen, Investasi, Pemasaran" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                <p className="text-[10px] text-venice-blue-600/70 mt-1">Gunakan koma (,) untuk memisahkan setiap item sub-kategori.</p>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100 disabled:opacity-50">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md flex items-center gap-2 disabled:opacity-50">
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditModalOpen ? 'Update Kategori' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto"><Trash2 className="w-6 h-6" /></div>
            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Kategori?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Kategori <span className="font-bold text-venice-blue-950">"{selectedCategory?.name}"</span> beserta seluruh sub-kategorinya akan dihapus dari sistem.
              </p>
            </div>
            <div className="pt-2 flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} disabled={isSubmitting} className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100 disabled:opacity-50">Batal</button>
              <button onClick={handleConfirmDelete} disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
