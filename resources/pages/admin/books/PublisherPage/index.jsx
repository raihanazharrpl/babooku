// resources/pages/admin/books/PublisherPage/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Edit2, Trash2, BookMarked, 
  Building2, Mail, Phone, Globe, X, Upload, Loader2, ShieldCheck 
} from 'lucide-react';
import { getCoverUrl } from '#resources/helpers/assetsHelper.js';

export default function PublisherPage() {
  const [publishers, setPublishers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reference & State File Upload Logo
  const fileInputRef = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  // Form State yang Sesuai dengan DB Schema
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    description: '',
    is_official: false,
    status: 'active'
  });

  // 1. Fetch Data Penerbit dari Backend
  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/publishers');
      const json = await res.json();
      if (json.success) {
        setPublishers(json.data || []);
      }
    } catch (error) {
      console.error('Error fetching publishers:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // Handler Auto-Generate Slug saat Mengedit Nama
  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData(prev => ({
      ...prev,
      name: nameVal,
      slug: generatedSlug
    }));
  };

  // Modal Triggers
  const handleOpenAdd = () => {
    setSelectedPublisher(null);
    setFormData({
      name: '',
      slug: '',
      logo: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      description: '',
      is_official: false,
      status: 'active'
    });
    setLogoFile(null);
    setLogoPreview('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (publisher) => {
    setSelectedPublisher(publisher);
    setFormData({
      name: publisher.name || '',
      slug: publisher.slug || '',
      logo: publisher.logo || '',
      email: publisher.email || '',
      phone: publisher.phone || '',
      website: publisher.website || '',
      address: publisher.address || '',
      description: publisher.description || '',
      is_official: Boolean(publisher.is_official),
      status: publisher.status || 'active'
    });
    setLogoFile(null);
    setLogoPreview(publisher.logo ? getCoverUrl(publisher.logo) : '');
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (publisher) => {
    setSelectedPublisher(publisher);
    setIsDeleteModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Upload Logo via Endpoint Upload
  const uploadLogoFile = async (file, publisherName) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('categoryFolder', 'publishers');
    uploadData.append('bookTitle', publisherName);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Gagal mengunggah logo penerbit.');
    return json.filePath;
  };

  // 2. Submit Form Handler (POST & PUT)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalLogoPath = formData.logo;
      if (logoFile) {
        finalLogoPath = await uploadLogoFile(logoFile, formData.name);
      }

      const payload = {
        ...formData,
        logo: finalLogoPath
      };

      const url = isEditModalOpen ? `/api/publishers?id=${selectedPublisher.id}` : '/api/publishers';
      const method = isEditModalOpen ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        await fetchPublishers();
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

  // 3. Delete Handler
  const handleConfirmDelete = async () => {
    if (!selectedPublisher) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/publishers?id=${selectedPublisher.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchPublishers();
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

  // Filter Data
  const filteredPublishers = publishers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activePublishersCount = publishers.filter(p => p.status === 'active').length;
  const totalBooksCount = publishers.reduce((acc, curr) => acc + (parseInt(curr.total_books, 10) || 0), 0);

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Penerbit Resmi</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Kelola mitra penerbit buku dan informasi kontak kerjasama di Babooku.
          </p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Penerbit
        </button>
      </div>

      {/* 2. STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Total Penerbit</p>
            <h3 className="text-xl font-black text-venice-blue-950">{publishers.length} Mitra</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Penerbit Aktif</p>
            <h3 className="text-xl font-black text-venice-blue-950">{activePublishersCount} Penerbit</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rock-blue/20 text-venice-blue-900 rounded-xl flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Total Terbitan Buku</p>
            <h3 className="text-xl font-black text-venice-blue-950">{totalBooksCount} Judul</h3>
          </div>
        </div>
      </div>

      {/* 3. BAR PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari penerbit, slug, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700"
          />
        </div>
      </div>

      {/* 4. TABEL DAFTAR PENERBIT */}
      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Penerbit</th>
                <th className="py-4 px-4">Kontak Info</th>
                <th className="py-4 px-4">Website & Alamat</th>
                <th className="py-4 px-4">Judul Terbitan</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {isFetching ? (
                <tr><td colSpan="6" className="py-12 text-center text-venice-blue-600"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Memuat data penerbit...</td></tr>
              ) : filteredPublishers.length === 0 ? (
                <tr><td colSpan="6" className="py-12 text-center text-venice-blue-600 font-semibold">Belum ada penerbit ditemukan.</td></tr>
              ) : (
                filteredPublishers.map((pub) => (
                  <tr key={pub.id} className="hover:bg-merino-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-merino-200 rounded-xl overflow-hidden shrink-0 border border-merino-300/60 flex items-center justify-center font-black text-venice-blue-900">
                          {pub.logo ? (
                            <img src={getCoverUrl(pub.logo)} alt={pub.name} className="w-full h-full object-cover" />
                          ) : (
                            pub.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-venice-blue-950 text-sm">{pub.name}</h4>
                            {pub.is_official && (
                              <ShieldCheck className="w-4 h-4 text-emerald-600" title="Official Publisher" />
                            )}
                          </div>
                          <span className="bg-merino-200/60 text-venice-blue-800 px-2 py-0.5 rounded font-mono text-[10px]">
                            {pub.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-venice-blue-900 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-venice-blue-600" /> {pub.email || '-'}
                      </p>
                      <p className="text-[11px] text-venice-blue-600/80 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-venice-blue-600" /> {pub.phone || '-'}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-venice-blue-800 truncate max-w-xs">{pub.website || '-'}</p>
                      <p className="text-[11px] text-venice-blue-600/70 truncate max-w-xs">{pub.address || '-'}</p>
                    </td>
                    <td className="py-4 px-4 font-bold text-venice-blue-900">{pub.total_books || 0} buku</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        pub.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {pub.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleOpenEdit(pub)}
                          className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors"
                          title="Edit Penerbit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(pub)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Penerbit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT PENERBIT */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95 my-8">
            <div className="flex justify-between items-center border-b border-merino-200 pb-3">
              <h3 className="text-lg font-black text-venice-blue-900">
                {isEditModalOpen ? 'Edit Data Penerbit' : 'Tambah Penerbit Baru'}
              </h3>
              <button 
                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
                className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-semibold max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Nama Penerbit</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={handleNameChange} 
                    placeholder="Gramedia Pustaka Utama" 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                  />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Slug URL</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="gramedia-pustaka-utama" 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono text-xs focus:outline-none focus:border-venice-blue-700" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Email Resmi</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="redaksi@penerbit.id" 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                  />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">No. Telepon / Kontak</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="021-XXXXXXX" 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Website Resmi</label>
                  <input 
                    type="text" 
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://penerbit.id" 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" 
                  />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Status Keaktifan</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Alamat Kantor</label>
                <textarea 
                  rows="2"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Alamat lengkap kantor pusat..."
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700 resize-none"
                />
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Deskripsi Singkat</label>
                <textarea 
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Profil singkat mengenai penerbit..."
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="is_official" 
                  checked={formData.is_official}
                  onChange={(e) => setFormData({ ...formData, is_official: e.target.checked })}
                  className="w-4 h-4 rounded border-merino-300 text-venice-blue-900 focus:ring-venice-blue-700"
                />
                <label htmlFor="is_official" className="text-venice-blue-900 font-bold cursor-pointer">
                  Tandai sebagai Penerbit Resmi (Official / Major)
                </label>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Logo Penerbit</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp, image/svg+xml" className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-merino-300 rounded-2xl p-4 text-center bg-merino-50/50 hover:bg-merino-50 cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[90px]">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview Logo" className="h-16 w-16 object-contain rounded-md shadow-sm" />
                  ) : (
                    <><Upload className="w-5 h-5 text-venice-blue-700 mb-1" /><p className="text-venice-blue-800">Klik untuk unggah logo</p></>
                  )}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button 
                  type="button" 
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100 disabled:opacity-50"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditModalOpen ? 'Update Penerbit' : 'Simpan Penerbit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Penerbit Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Penerbit <span className="font-bold text-venice-blue-950">"{selectedPublisher?.name}"</span> akan dihapus dari sistem.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100 disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmDelete} 
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
