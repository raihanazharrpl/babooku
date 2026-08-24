// resources/pages/Admin/CustomerListPage.jsx
import React, { useState } from 'react';
import { 
  Search, Filter, Eye, UserCheck, ShieldAlert, 
  UserX, Mail, Phone, Calendar, ShoppingBag, 
  MoreVertical, Edit2, Shield, X, Check 
} from 'lucide-react';

export default function CustomerPage() {
  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Semua');

  // State Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock Data Pengguna
  const [customers, setCustomers] = useState([
    {
      id: 'USR-001',
      name: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      phone: '0812-3456-7890',
      joinDate: '12 Jan 2026',
      totalOrders: 14,
      totalSpent: '1.850.000',
      role: 'Pelanggan',
      status: 'Aktif',
      avatar: ''
    },
    {
      id: 'USR-002',
      name: 'Siti Aminah',
      email: 'siti.aminah@yahoo.com',
      phone: '0857-1234-5678',
      joinDate: '05 Feb 2026',
      totalOrders: 8,
      totalSpent: '920.000',
      role: 'Pelanggan',
      status: 'Aktif',
      avatar: ''
    },
    {
      id: 'USR-003',
      name: 'Andi Wijaya',
      email: 'andi.wijaya@outlook.com',
      phone: '0821-9876-5432',
      joinDate: '20 Mar 2026',
      totalOrders: 2,
      totalSpent: '240.000',
      role: 'Pelanggan',
      status: 'Nonaktif',
      avatar: ''
    },
    {
      id: 'USR-004',
      name: 'Rina Melati',
      email: 'rina.melati@gmail.com',
      phone: '0813-1122-3344',
      joinDate: '10 Mei 2026',
      totalOrders: 0,
      totalSpent: '0',
      role: 'Pelanggan',
      status: 'Diblokir',
      avatar: ''
    }
  ]);

  const handleOpenDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleOpenBlock = (customer) => {
    setSelectedCustomer(customer);
    setIsBlockModalOpen(true);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'Semua' || c.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    /* Menambahkan padding konsisten dengan landing page & orders: px-6 sm:px-12 md:px-20 py-8 */
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Kelola Pengguna</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Pantau akun pelanggan terdaftar, riwayat transaksi, dan status hak akses sistem.
          </p>
        </div>
      </div>

      {/* 2. STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Total Pengguna</p>
            <h3 className="text-xl font-black text-venice-blue-950">4 Akun</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Pengguna Aktif</p>
            <h3 className="text-xl font-black text-venice-blue-950">2 Akun</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Akun Diblokir</p>
            <h3 className="text-xl font-black text-venice-blue-950">1 Akun</h3>
          </div>
        </div>
      </div>

      {/* 3. FILTER & PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari nama atau email pengguna..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-venice-blue-700 shrink-0" />
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-48 bg-merino-50 border border-merino-300 px-3 py-2 rounded-xl text-xs font-bold text-venice-blue-900 focus:outline-none focus:border-venice-blue-700"
          >
            <option value="Semua">Semua Peran</option>
            <option value="Pelanggan">Pelanggan</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* 4. TABEL DAFTAR PENGGUNA */}
      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">Pengguna</th>
                <th className="py-4 px-4">Kontak</th>
                <th className="py-4 px-4">Tanggal Bergabung</th>
                <th className="py-4 px-4">Pesanan</th>
                <th className="py-4 px-4">Total Belanja</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-merino-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-venice-blue-900 text-merino rounded-full flex items-center justify-center font-black shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-venice-blue-950 text-sm">{customer.name}</p>
                        <p className="text-[10px] text-venice-blue-600 font-mono">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-venice-blue-900">{customer.email}</p>
                    <p className="text-[10px] text-venice-blue-600">{customer.phone}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-venice-blue-700">{customer.joinDate}</td>
                  <td className="py-4 px-4 font-bold text-venice-blue-900">{customer.totalOrders} kali</td>
                  <td className="py-4 px-4 font-extrabold text-venice-blue-950">Rp {customer.totalSpent}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      customer.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' :
                      customer.status === 'Nonaktif' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenDetail(customer)}
                        className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors"
                        title="Lihat Profil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(customer)}
                        className="p-2 text-rock-blue-dark hover:bg-merino-100 rounded-lg transition-colors"
                        title="Edit Peran/Status"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenBlock(customer)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Blokir Pengguna"
                      >
                        <UserX className="w-4 h-4" />
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

      {/* MODAL 1: RINCIAN PROFIL PENGGUNA */}
      {isDetailModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">Profil Pelanggan</h3>
              <button onClick={() => setIsDetailModalOpen(false)} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-4 bg-merino-50 p-4 rounded-2xl border border-merino-200">
                <div className="w-12 h-12 bg-venice-blue-900 text-merino rounded-full flex items-center justify-center font-black text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-venice-blue-950 text-sm">{selectedCustomer.name}</h4>
                  <p className="text-venice-blue-600">{selectedCustomer.email}</p>
                  <p className="text-[10px] text-rock-blue-dark font-bold mt-0.5">{selectedCustomer.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-merino-200 rounded-xl">
                  <p className="text-venice-blue-600 font-semibold">No. Telepon:</p>
                  <p className="font-bold text-venice-blue-900">{selectedCustomer.phone}</p>
                </div>
                <div className="p-3 bg-white border border-merino-200 rounded-xl">
                  <p className="text-venice-blue-600 font-semibold">Bergabung:</p>
                  <p className="font-bold text-venice-blue-900">{selectedCustomer.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-merino-200 rounded-xl">
                  <p className="text-venice-blue-600 font-semibold">Total Pesanan:</p>
                  <p className="font-bold text-venice-blue-900">{selectedCustomer.totalOrders} Transaksi</p>
                </div>
                <div className="p-3 bg-white border border-merino-200 rounded-xl">
                  <p className="text-venice-blue-600 font-semibold">Total Pengeluaran:</p>
                  <p className="font-bold text-venice-blue-900">Rp {selectedCustomer.totalSpent}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setIsDetailModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold text-xs hover:bg-venice-blue-800 shadow-md">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PERAN & STATUS */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">Edit Akses Pengguna</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-venice-blue-800 mb-1">Peran Akses (Role)</label>
                <select defaultValue={selectedCustomer.role} className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                  <option value="Pelanggan">Pelanggan</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Status Akun</label>
                <select defaultValue={selectedCustomer.status} className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                  <option value="Diblokir">Diblokir</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-venice-blue-900 text-merino font-bold hover:bg-venice-blue-800 shadow-md">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: KONFIRMASI BLOKIR */}
      {isBlockModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-merino-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <UserX className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-venice-blue-950">Blokir Pengguna Ini?</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">
                Pengguna <span className="font-bold text-venice-blue-950">"{selectedCustomer.name}"</span> tidak akan bisa melakukan login atau bertransaksi lagi.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button onClick={() => setIsBlockModalOpen(false)} className="w-full py-2.5 rounded-xl border border-merino-300 text-xs font-bold text-venice-blue-800 hover:bg-merino-100">
                Batal
              </button>
              <button onClick={() => setIsBlockModalOpen(false)} className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-md">
                Ya, Blokir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
