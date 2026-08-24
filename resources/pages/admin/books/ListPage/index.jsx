// resources/pages/Admin/BookListPage.jsx
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, Eye, 
  MoreVertical, BookOpen, Check, X, Upload, Image as ImageIcon 
} from 'lucide-react';

export default function BookListPage() {
  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Mock Data Buku
  const [books, setBooks] = useState([
    { id: 1, title: 'Filosofi Teras', author: 'Henry Manampiring', category: 'Pengembangan Diri', price: '98.000', stock: 45, status: 'Aktif', cover: '/storage/assets/images/ex.png' },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', category: 'Pengembangan Diri', price: '108.000', stock: 12, status: 'Aktif', cover: '' },
    { id: 3, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', category: 'Novel & Sastra', price: '145.000', stock: 5, status: 'Stok Rendah', cover: '' },
    { id: 4, title: 'Sapiens: Riwayat Singkat', author: 'Yuval Noah Harari', category: 'Sains & Teknologi', price: '165.000', stock: 0, status: 'Habis', cover: '' },
  ]);

  // Handler Modal Action
  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full space-y-6 font-sans text-venice-blue-950">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Kelola Daftar Buku</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Tambah, perbarui, dan atur ketersediaan inventaris buku di Babooku.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Buku Baru
        </button>
      </div>

      {/* 2. FILTER & PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari judul atau penulis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-venice-blue-700 shrink-0" />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-48 bg-merino-50 border border-merino-300 px-3 py-2 rounded-xl text-xs font-bold text-venice-blue-900 focus:outline-none focus:border-venice-blue-700"
            >
              <option value="All">Semua Kategori</option>
              <option value="Novel & Sastra">Novel & Sastra</option>
              <option value="Pengembangan Diri">Pengembangan Diri</option>
              <option value="Sains & Teknologi">Sains & Teknologi</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. TABEL DAFTAR BUKU */}
      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Buku</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Harga</th>
                <th className="py-4 px-4">Stok</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-merino-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-merino-200 rounded-lg overflow-hidden shrink-0 border border-merino-300/60 flex items-center justify-center">
                        {book.cover ? (
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-venice-blue-700/60" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-venice-blue-950 text-sm">{book.title}</h4>
                        <p className="text-venice-blue-600">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-venice-blue-800">{book.category}</td>
                  <td className="py-4 px-4 font-extrabold text-venice-blue-900">Rp {book.price}</td>
                  <td className="py-4 px-4 font-bold">{book.stock} pcs</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      book.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' :
                      book.status === 'Stok Rendah' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenEdit(book)}
                        className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors"
                        title="Edit Buku"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenDelete(book)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Buku"
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

      {/* ==================== CUSTOM POPUP MODALS ==================== */}

      {/* MODAL 1: TAMBAH BUKU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">Tambah Buku Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-venice-blue-800 mb-1">Judul Buku</label>
                <input type="text" placeholder="Masukkan judul buku" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Penulis</label>
                  <input type="text" placeholder="Nama penulis" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Kategori</label>
                  <select className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                    <option>Novel & Sastra</option>
                    <option>Pengembangan Diri</option>
                    <option>Sains & Teknologi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-venice-blue-800 mb-1">Harga (Rp)</label>
                  <input type="number" placeholder="Contoh: 98000" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                </div>
                <div>
                  <label className="block text-venice-blue-800 mb-1">Jumlah Stok</label>
                  <input type="number" placeholder="0" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
                </div>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Cover Sampul</label>
                <div className="border-2 border-dashed border-merino-300 rounded-2xl p-4 text-center bg-merino-50/50 hover:bg-merino-50 cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 mx-auto text-venice-blue-700 mb-1" />
                  <p className="text-venice-blue-800">Klik untuk unggah sampul buku</p>
                  <p className="text-[10px] text-venice-blue-600/70 mt-0.5">PNG, JPG atau WEBP (Maks. 2MB)</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md">
                  Simpan Buku
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-venice-blue-950">Hapus Buku Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Apakah kamu yakin ingin menghapus <span className="font-bold text-venice-blue-950">"{selectedBook?.title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
