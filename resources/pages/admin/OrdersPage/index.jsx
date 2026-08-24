// resources/pages/Admin/OrderListPage.jsx
import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Truck, CheckCircle2, 
  Clock, AlertCircle, XCircle, ShoppingBag, 
  Calendar, FileText, ChevronDown, X 
} from 'lucide-react';

export default function OrderPage() {
  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  // State Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock Data Pesanan
  const [orders, setOrders] = useState([
    {
      id: '#ORD-0921',
      customer: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      date: '22 Agt 2026',
      total: '145.000',
      paymentMethod: 'Midtrans (QRIS)',
      shippingMethod: 'J&T Express',
      trackingNumber: 'JT928301928',
      status: 'Selesai',
      items: [
        { title: 'Bumi Manusia', qty: 1, price: '145.000' }
      ]
    },
    {
      id: '#ORD-0922',
      customer: 'Siti Aminah',
      email: 'siti.aminah@yahoo.com',
      date: '22 Agt 2026',
      total: '320.000',
      paymentMethod: 'Transfer BCA',
      shippingMethod: 'JNE Reguler',
      trackingNumber: '-',
      status: 'Diproses',
      items: [
        { title: 'Filosofi Teras', qty: 2, price: '98.000' },
        { title: 'Atomic Habits', qty: 1, price: '124.000' }
      ]
    },
    {
      id: '#ORD-0923',
      customer: 'Andi Wijaya',
      email: 'andi.wijaya@outlook.com',
      date: '21 Agt 2026',
      total: '98.000',
      paymentMethod: 'GoPay',
      shippingMethod: 'SiCepat',
      trackingNumber: '003928192031',
      status: 'Dikirim',
      items: [
        { title: 'Filosofi Teras', qty: 1, price: '98.000' }
      ]
    },
    {
      id: '#ORD-0924',
      customer: 'Rina Melati',
      email: 'rina.melati@gmail.com',
      date: '21 Agt 2026',
      total: '210.000',
      paymentMethod: 'Transfer Mandiri',
      shippingMethod: 'JNE Reguler',
      trackingNumber: '-',
      status: 'Dibatalkan',
      items: [
        { title: 'Sapiens: Riwayat Singkat', qty: 1, price: '210.000' }
      ]
    }
  ]);

  // Helper Warna Status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Diproses':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Dikirim':
        return 'bg-venice-blue-100 text-venice-blue-900 border-venice-blue-300';
      case 'Dibatalkan':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleOpenUpdate = (order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Semua' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    /* Menambahkan padding konsisten dengan landing page: px-6 sm:px-12 md:px-20 py-8 */
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Pesanan Masuk</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">
            Kelola transaksi, update status resi pengiriman, dan lacak pesanan pelanggan Babooku.
          </p>
        </div>
      </div>

      {/* 2. STATISTIK RINGKAS STATUS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Perlu Diproses</p>
            <h3 className="text-xl font-black text-venice-blue-950">1 Pesanan</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Dalam Pengiriman</p>
            <h3 className="text-xl font-black text-venice-blue-950">1 Pesanan</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Selesai</p>
            <h3 className="text-xl font-black text-venice-blue-950">1 Pesanan</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-venice-blue-600/80">Dibatalkan</p>
            <h3 className="text-xl font-black text-venice-blue-950">1 Pesanan</h3>
          </div>
        </div>
      </div>

      {/* 3. FILTER & PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/70" />
          <input 
            type="text"
            placeholder="Cari ID Pesanan atau Nama Pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-venice-blue-700 shrink-0" />
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-48 bg-merino-50 border border-merino-300 px-3 py-2 rounded-xl text-xs font-bold text-venice-blue-900 focus:outline-none focus:border-venice-blue-700"
          >
            <option value="Semua">Semua Status</option>
            <option value="Diproses">Diproses</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* 4. TABEL DAFTAR PESANAN */}
      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-merino-50/70 text-venice-blue-700 text-xs font-bold border-b border-merino-200">
                <th className="py-4 px-6">ID Pesanan</th>
                <th className="py-4 px-4">Pelanggan</th>
                <th className="py-4 px-4">Tanggal</th>
                <th className="py-4 px-4">Total Pembayaran</th>
                <th className="py-4 px-4">Metode Bayar</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-merino-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-merino-50/50 transition-colors">
                  <td className="py-4 px-6 font-black text-venice-blue-950">{order.id}</td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-venice-blue-900">{order.customer}</p>
                    <p className="text-[10px] text-venice-blue-600/70">{order.email}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-venice-blue-700">{order.date}</td>
                  <td className="py-4 px-4 font-extrabold text-venice-blue-900">Rp {order.total}</td>
                  <td className="py-4 px-4 font-medium text-venice-blue-800">{order.paymentMethod}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenDetail(order)}
                        className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors"
                        title="Lihat Rincian Pesanan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenUpdate(order)}
                        className="p-2 text-rock-blue-dark hover:bg-merino-100 rounded-lg transition-colors"
                        title="Update Resi / Status"
                      >
                        <Truck className="w-4 h-4" />
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

      {/* MODAL 1: RINCIAN DETAIL PESANAN */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-venice-blue-900">Rincian Pesanan</h3>
                <p className="text-xs text-venice-blue-600 font-bold">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Info Pelanggan & Pengiriman */}
              <div className="bg-merino-50 p-4 rounded-2xl border border-merino-200 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-venice-blue-600 font-semibold">Pemesan:</p>
                  <p className="font-bold text-venice-blue-950">{selectedOrder.customer}</p>
                  <p className="text-[10px] text-venice-blue-700">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-venice-blue-600 font-semibold">Pengiriman:</p>
                  <p className="font-bold text-venice-blue-950">{selectedOrder.shippingMethod}</p>
                  <p className="text-[10px] text-venice-blue-700 font-mono">No. Resi: {selectedOrder.trackingNumber}</p>
                </div>
              </div>

              {/* Daftar Item Beli */}
              <div>
                <h4 className="font-bold text-venice-blue-900 mb-2">Item Produk</h4>
                <div className="space-y-2 border-t border-merino-200 pt-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <div>
                        <p className="font-bold text-venice-blue-950">{item.title}</p>
                        <p className="text-[10px] text-venice-blue-600">{item.qty} x Rp {item.price}</p>
                      </div>
                      <p className="font-bold text-venice-blue-900">Rp {item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ringkasan Total */}
              <div className="border-t border-merino-200 pt-3 flex justify-between items-center text-sm font-black">
                <span className="text-venice-blue-900">Total Pembayaran:</span>
                <span className="text-venice-blue-950">Rp {selectedOrder.total}</span>
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

      {/* MODAL 2: UPDATE RESI & STATUS */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-venice-blue-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-merino-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-merino-200 pb-4">
              <h3 className="text-lg font-black text-venice-blue-900">Update Status Pesanan</h3>
              <button onClick={() => setIsUpdateModalOpen(false)} className="p-1 rounded-xl text-venice-blue-700 hover:bg-merino-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-venice-blue-800 mb-1">Status Transaksi</label>
                <select defaultValue={selectedOrder.status} className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700">
                  <option value="Diproses">Diproses</option>
                  <option value="Dikirim">Dikirim</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

              <div>
                <label className="block text-venice-blue-800 mb-1">Nomor Resi Pengiriman</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrder.trackingNumber !== '-' ? selectedOrder.trackingNumber : ''} 
                  placeholder="Masukkan no resi expedisi" 
                  className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl font-mono focus:outline-none focus:border-venice-blue-700" 
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-merino-200">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-merino-300 text-venice-blue-800 font-bold hover:bg-merino-100">
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

    </div>
  );
}
