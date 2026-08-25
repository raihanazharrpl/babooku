// resources/pages/admin/books/TagPage/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, 
  X, Hash, Loader2 
} from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Amber', hex: '#F59E0B' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Gray', hex: '#6B7280' },
];

export default function BookTagPage() {
  const [tags, setTags] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    color: '#EF4444'
  });

  // FETCH DATA
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/tags');
      const json = await res.json();
      if (json.success) setTags(json.data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-');

    setFormData(prev => ({
      ...prev,
      name: nameVal,
      slug: generatedSlug
    }));
  };

  const handleOpenAdd = () => {
    setFormData({ name: '', slug: '', color: '#EF4444' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (tag) => {
    setSelectedTag(tag);
    setFormData({ name: tag.name, slug: tag.slug, color: tag.color || '#EF4444' });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (tag) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };

  // SUBMIT FORM (POST / PUT)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = isEditModalOpen ? `/api/tags?id=${selectedTag.id}` : '/api/tags';
      const method = isEditModalOpen ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();

      if (json.success) {
        await fetchTags();
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
      } else {
        alert(json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // HAPUS TAG (DELETE)
  const handleConfirmDelete = async () => {
    if (!selectedTag) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/tags?id=${selectedTag.id}`, { method: 'DELETE' });
      const json = await res.json();
      
      if (json.success) {
        await fetchTags();
        setIsDeleteModalOpen(false);
      } else {
        alert(json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus tag.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Tag & Label Buku</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Atur badge penanda khusus untuk promosi dan filtering pencarian di Babooku.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4 text-rock-blue-light" /> Buat Tag Baru
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input type="text" placeholder="Cari label tag..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700" />
        </div>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center py-20 text-venice-blue-600">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredTags.length === 0 ? (
        <div className="bg-white rounded-3xl border border-merino-300/70 p-12 text-center text-venice-blue-600 font-semibold shadow-sm">
          Belum ada tag yang ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTags.map((tag) => (
            <div key={tag.id} className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span style={{ backgroundColor: `${tag.color}15`, color: tag.color, borderColor: `${tag.color}40` }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border">
                  <Hash className="w-3 h-3" /> {tag.name}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(tag)} className="p-1.5 text-venice-blue-700 hover:bg-merino-100 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleOpenDelete(tag)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-merino-100 mt-2">
                <span className="font-mono text-venice-blue-600/70 text-[11px]">{tag.slug}</span>
                <span className="font-bold text-venice-blue-900">{tag.usageCount} Buku</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">{isEditModalOpen ? 'Edit Tag Label' : 'Buat Tag Baru'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-venice-blue-800 mb-1">Nama Tag / Label</label>
                <input type="text" required value={formData.name} onChange={handleNameChange} placeholder="Contoh: Best Seller 🔥" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
              </div>
              <div>
                <label className="block text-venice-blue-800 mb-1">Slug URL</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))} placeholder="best-seller" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono text-xs focus:outline-none focus:border-venice-blue-700" />
              </div>
              <div>
                <label className="block text-venice-blue-800 mb-2 flex items-center justify-between">
                  <span>Warna Badge</span>
                  <span className="font-mono text-[10px] text-venice-blue-600">{formData.color}</span>
                </label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button key={c.hex} type="button" onClick={() => setFormData(p => ({ ...p, color: c.hex }))} style={{ backgroundColor: c.hex }} className={`w-7 h-7 rounded-full border-2 transition-transform active:scale-95 ${formData.color === c.hex ? 'border-venice-blue-950 scale-110 shadow-md' : 'border-transparent'}`} />
                  ))}
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-merino-300">
                    <input type="color" value={formData.color} onChange={(e) => setFormData(p => ({ ...p, color: e.target.value }))} className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="p-3 bg-merino-50 rounded-xl border border-merino-200 text-center">
                <span className="text-[10px] text-venice-blue-600 block mb-1 font-normal">Preview Tampilan Badge:</span>
                <span style={{ backgroundColor: `${formData.color}15`, color: formData.color, borderColor: `${formData.color}40` }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border">
                  <Hash className="w-3 h-3" /> {formData.name || 'Preview Tag'}
                </span>
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100 disabled:opacity-50">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md flex items-center gap-2 disabled:opacity-50">
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} {isEditModalOpen ? 'Update Tag' : 'Simpan Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto"><Trash2 className="w-6 h-6" /></div>
            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Tag Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">Tag <span className="font-bold text-venice-blue-950">"{selectedTag?.name}"</span> akan dihapus dari sistem.</p>
            </div>
            <div className="pt-2 flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} disabled={isSubmitting} className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100 disabled:opacity-50">Batal</button>
              <button onClick={handleConfirmDelete} disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md flex justify-center items-center gap-2 disabled:opacity-50">
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
