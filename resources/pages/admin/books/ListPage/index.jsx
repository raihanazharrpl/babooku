// resources/pages/admin/books/ListPage/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, 
  BookOpen, X, Upload, Loader2, Sparkles, Book, Smartphone, Headphones
} from 'lucide-react';
import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah, parsePrice } from '#resources/helpers/priceHelper.js';

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileInputRef = useRef(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const fileAssetRef = useRef(null);
  const [assetFile, setAssetFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher_id: '',
    category_id: '',
    subcategory_id: '',
    description: '',
    keywords: '',
    price: '',
    stock: '',
    status: 'active',
    cover_image: '',
    format: ['physical'],
    weight: 300,
    file_url: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsFetching(true);
    try {
      const [resBooks, resCategories, resPublishers] = await Promise.all([
        fetch('/api/books'),
        fetch('/api/categories'),
        fetch('/api/publishers')
      ]);

      const jsonBooks = await resBooks.json();
      const jsonCategories = await resCategories.json();
      const jsonPublishers = await resPublishers.json();

      if (jsonBooks.success) setBooks(jsonBooks.data || []);
      if (jsonCategories.success) setCategories(jsonCategories.data || []);
      if (jsonPublishers.success) setPublishers(jsonPublishers.data || []);
    } catch (error) {
      console.error('Error fetching data from DB:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenAdd = () => {
    setSelectedBook(null);
    setFormData({
      title: '',
      author: '',
      publisher_id: '',
      category_id: '',
      subcategory_id: '',
      description: '',
      keywords: '',
      price: '',
      stock: '',
      status: 'active',
      cover_image: '',
      format: ['physical'],
      weight: 300,
      file_url: ''
    });
    setCoverFile(null);
    setCoverPreview('');
    setAssetFile(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      publisher_id: book.publisher_id || '',
      category_id: book.category_id || '',
      subcategory_id: book.subcategory_id || '',
      description: book.description || '',
      keywords: book.keywords || '',
      price: book.price ? String(Math.floor(Number(book.price))) : '',
      stock: book.stock || 0,
      status: book.status || 'active',
      cover_image: book.cover_image || '',
      format: Array.isArray(book.format) ? book.format : ['physical'],
      weight: book.weight || 300,
      file_url: book.file_url || ''
    });
    setCoverFile(null);
    setCoverPreview(book.cover_image ? getCoverUrl(book.cover_image) : '');
    setAssetFile(null);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'cover') {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    } else if (type === 'asset') {
      setAssetFile(file);
    }
  };

  const toggleFormat = (fmt) => {
    setFormData(prev => {
      const current = prev.format;
      if (current.includes(fmt)) {
        if (current.length === 1) return prev; 
        return { ...prev, format: current.filter(f => f !== fmt) };
      }
      return { ...prev, format: [...current, fmt] };
    });
  };

  const handleGenerateKeywords = async () => {
    if (!formData.title) {
      alert('Isi judul buku terlebih dahulu!');
      return;
    }
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          description: formData.description
        })
      });
      const json = await res.json();
      if (json.success) {
        setFormData(prev => ({ ...prev, keywords: json.keywords }));
      } else {
        alert('Gagal generate: ' + json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat memanggil AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadFileAPI = async (file, title, folderType, categoryId, subcategoryId) => {
    const categoryObj = categories.find(c => String(c.id) === String(categoryId));
    const categoryFolder = categoryObj?.slug || 'general';

    const subcategoryObj = categoryObj?.subcategories?.find(s => String(s.id) === String(subcategoryId));
    const subcategoryFolder = subcategoryObj?.slug || '';

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('categoryFolder', categoryFolder);
    uploadData.append('subcategoryFolder', subcategoryFolder);
    uploadData.append('folderType', folderType);
    uploadData.append('bookTitle', title);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || `Gagal mengunggah file ${folderType}.`);
    return json.filePath;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalCoverPath = formData.cover_image;
      if (coverFile) {
        finalCoverPath = await uploadFileAPI(
          coverFile, 
          formData.title,
          'covers',
          formData.category_id, 
          formData.subcategory_id
        );
      }

      let finalAssetPath = formData.file_url;
      if (assetFile) {
        const fType = formData.format.includes('ebook') ? 'ebooks' : 'audiobooks';
        finalAssetPath = await uploadFileAPI(
          assetFile, 
          formData.title, 
          fType,
          formData.category_id,
          formData.subcategory_id
        );
      }

      const payload = {
        ...formData,
        category_id: parseInt(formData.category_id, 10),
        subcategory_id: formData.subcategory_id ? parseInt(formData.subcategory_id, 10) : null,
        publisher_id: formData.publisher_id ? parseInt(formData.publisher_id, 10) : null,
        price: parsePrice(formData.price),
        stock: parseInt(formData.stock, 10) || 0,
        weight: formData.format.includes('physical') ? parseInt(formData.weight, 10) : null,
        cover_image: finalCoverPath,
        file_url: (formData.format.includes('ebook') || formData.format.includes('audiobook')) ? finalAssetPath : null
      };

      const url = isEditModalOpen ? `/api/books?id=${selectedBook.id}` : '/api/books';
      const method = isEditModalOpen ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        await fetchInitialData();
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
      } else {
        alert('Gagal menyimpan data: ' + json.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/books?id=${selectedBook.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await fetchInitialData();
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

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.publisher_name && b.publisher_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || String(b.category_id) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const selectedCategoryObj = categories.find(c => String(c.id) === String(formData.category_id));
  const availableSubcategories = selectedCategoryObj?.subcategories || [];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Kelola Daftar Buku</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Tambah, perbarui, dan atur ketersediaan inventaris buku.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0">
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Buku Baru
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input type="text" placeholder="Cari judul, penulis, penerbit..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700 transition-colors" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-venice-blue-700 shrink-0" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full md:w-48 bg-merino-50 border border-merino-300 px-3 py-2 rounded-xl text-xs font-bold text-venice-blue-900 focus:outline-none focus:border-venice-blue-700">
            <option value="All">Semua Kategori</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Buku</th>
                <th className="py-4 px-4">Penerbit</th>
                <th className="py-4 px-4">Format</th>
                <th className="py-4 px-4">Harga</th>
                <th className="py-4 px-4">Stok</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {isFetching ? (
                <tr><td colSpan="7" className="py-12 text-center text-venice-blue-600"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Memuat data...</td></tr>
              ) : filteredBooks.length === 0 ? (
                <tr><td colSpan="7" className="py-12 text-center text-venice-blue-600 font-semibold">Belum ada data buku ditemukan.</td></tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-merino-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-merino-200 rounded-lg overflow-hidden shrink-0 border border-merino-300/60 flex items-center justify-center">
                          {book.cover_image ? <img src={getCoverUrl(book.cover_image)} alt={book.title} className="w-full h-full object-cover" /> : <BookOpen className="w-5 h-5 text-venice-blue-700/60" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-venice-blue-950 text-sm">{book.title}</h4>
                          <p className="text-venice-blue-600">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-venice-blue-800">
                      {book.publisher_name || 'Self-Published / Indie'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {(book.format || ['physical']).map((fmt) => (
                          <span key={fmt} className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-merino-100 text-venice-blue-900 border border-merino-300">
                            {fmt === 'physical' ? 'Fisik' : fmt === 'ebook' ? 'E-Book' : 'Audio'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-venice-blue-900">{formatRupiah(book.price)}</td>
                    <td className="py-4 px-4 font-bold">{book.stock} pcs</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${book.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {book.status === 'active' ? 'Aktif' : book.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleOpenEdit(book)} className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleOpenDelete(book)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95 my-8">
            <div className="flex justify-between items-center border-b border-merino-200 pb-3">
              <h3 className="text-lg font-black text-venice-blue-900">{isEditModalOpen ? 'Edit Data Buku' : 'Tambah Buku Baru'}</h3>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-semibold max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-venice-blue-800 mb-1">Judul Buku</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Masukkan judul buku" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Penulis</label>
                  <input type="text" required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} placeholder="Nama penulis" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Penerbit</label>
                  <select 
                    value={formData.publisher_id} 
                    onChange={(e) => setFormData({ ...formData, publisher_id: e.target.value })} 
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700 font-semibold"
                  >
                    <option value="">Self-Published / Indie</option>
                    {publishers.map((pub) => (
                      <option key={pub.id} value={pub.id}>{pub.name} {pub.is_official ? '✓' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Kategori Utama</label>
                  <select 
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value, subcategory_id: '' })}
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Sub Kategori</label>
                  <select 
                    value={formData.subcategory_id}
                    onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
                    disabled={!formData.category_id || availableSubcategories.length === 0}
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700 disabled:opacity-50 disabled:bg-merino-200"
                  >
                    <option value="">{availableSubcategories.length === 0 && formData.category_id ? 'Tidak ada sub' : 'Pilih Sub (Opsional)'}</option>
                    {availableSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Deskripsi / Sinopsis</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Ceritakan singkat isi buku..." className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700 resize-none" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-venice-blue-800">Keywords</label>
                  <button type="button" onClick={handleGenerateKeywords} disabled={isGenerating} className="text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50">
                    {isGenerating ? <><Loader2 className="w-3 h-3 animate-spin" /> Generating...</> : <><Sparkles className="w-3 h-3 text-amber-600" /> ✨ Generate AI</>}
                  </button>
                </div>
                <input type="text" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} placeholder="Dipisahkan koma" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
              </div>

              <div className="bg-merino-50 p-4 rounded-xl border border-merino-200 space-y-4">
                <label className="block text-venice-blue-900 font-bold text-sm">Format & Ketersediaan Buku</label>
                
                <div className="flex gap-2">
                  <button type="button" onClick={() => toggleFormat('physical')} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${formData.format.includes('physical') ? 'border-venice-blue-700 bg-venice-blue-50 text-venice-blue-900 shadow-sm font-bold' : 'border-merino-300 bg-white text-venice-blue-600/70 hover:bg-merino-100'}`}>
                    <Book className="w-5 h-5 mb-1" /> Fisik Cetak
                  </button>
                  <button type="button" onClick={() => toggleFormat('ebook')} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${formData.format.includes('ebook') ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm font-bold' : 'border-merino-300 bg-white text-venice-blue-600/70 hover:bg-merino-100'}`}>
                    <Smartphone className="w-5 h-5 mb-1" /> E-Book
                  </button>
                  <button type="button" onClick={() => toggleFormat('audiobook')} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${formData.format.includes('audiobook') ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm font-bold' : 'border-merino-300 bg-white text-venice-blue-600/70 hover:bg-merino-100'}`}>
                    <Headphones className="w-5 h-5 mb-1" /> Audiobook
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-venice-blue-800 mb-1">Harga Retail (Rp)</label>
                    <input type="text" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Contoh: 95000" className="w-full px-3.5 py-2.5 bg-white border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                  </div>
                  {formData.format.includes('physical') && (
                    <>
                      <div>
                        <label className="block text-venice-blue-800 mb-1">Stok Fisik</label>
                        <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="0" className="w-full px-3.5 py-2.5 bg-white border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-venice-blue-800 mb-1">Berat Fisik (Gram)</label>
                        <input type="number" required value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} placeholder="300" className="w-full px-3.5 py-2.5 bg-white border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                      </div>
                    </>
                  )}
                </div>

                {(formData.format.includes('ebook') || formData.format.includes('audiobook')) && (
                   <div className="pt-3 border-t border-merino-200">
                     <label className="block text-venice-blue-900 font-bold mb-2">Upload Aset Digital (PDF/EPUB/MP3)</label>
                     <input type="file" ref={fileAssetRef} onChange={(e) => handleFileChange(e, 'asset')} accept=".pdf,.epub,.mp3" className="hidden" />
                     
                     <div className="flex items-center gap-3">
                       <button type="button" onClick={() => fileAssetRef.current?.click()} className="px-4 py-2 bg-merino-200 hover:bg-merino-300 text-venice-blue-900 rounded-xl font-bold flex items-center gap-2">
                         <Upload className="w-4 h-4" /> {assetFile ? 'Ganti File' : 'Pilih File Aset'}
                       </button>
                       <span className="text-venice-blue-600 truncate max-w-[220px]">
                         {assetFile ? assetFile.name : (formData.file_url ? 'Aset tersimpan di cloud' : 'Belum ada file dipilih')}
                       </span>
                     </div>
                   </div>
                )}
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Status Buku</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Cover Sampul</label>
                <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'cover')} accept="image/png, image/jpeg, image/webp" className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-merino-300 rounded-2xl p-4 text-center bg-merino-50 hover:bg-merino-100 cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[120px]">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Preview" className="h-28 w-20 object-cover rounded-md shadow-md" />
                  ) : (
                    <><Upload className="w-6 h-6 text-venice-blue-700 mb-1" /><p className="text-venice-blue-800 font-bold">Unggah Gambar Sampul</p></>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100 disabled:opacity-50">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} {isEditModalOpen ? 'Update Buku' : 'Simpan Buku'}
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
              <h3 className="text-base font-black text-venice-blue-950">Hapus Buku Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">Yakin menghapus <span className="font-bold">"{selectedBook?.title}"</span>?</p>
            </div>
            <div className="pt-2 flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} disabled={isSubmitting} className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100 disabled:opacity-50">Batal</button>
              <button onClick={handleConfirmDelete} disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
