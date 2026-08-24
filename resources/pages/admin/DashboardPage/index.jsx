// resources/pages/DashboardPage/index.jsx
import React from 'react';
import { 
  TrendingUp, ShoppingBag, BookOpen, Users, 
  DollarSign, ArrowUpRight, MoreVertical, Package
} from 'lucide-react';

export default function DashboardPage() {
  // Mockup Data Statistik Utama
  const overviewStats = [
    { title: 'Total Pendapatan', value: 'Rp 24.500.000', increase: '+15%', icon: DollarSign },
    { title: 'Pesanan Baru', value: '142', increase: '+8%', icon: ShoppingBag },
    { title: 'Total Buku', value: '15.234', increase: '+2%', icon: BookOpen },
    { title: 'Pengguna Aktif', value: '8.432', increase: '+12%', icon: Users },
  ];

  // Mockup Data Pesanan Terbaru
  const recentOrders = [
    { id: '#ORD-0921', customer: 'Budi Santoso', date: '22 Agt 2026', total: 'Rp 145.000', status: 'Selesai' },
    { id: '#ORD-0922', customer: 'Siti Aminah', date: '22 Agt 2026', total: 'Rp 320.000', status: 'Diproses' },
    { id: '#ORD-0923', customer: 'Andi Wijaya', date: '21 Agt 2026', total: 'Rp 98.000', status: 'Dikirim' },
    { id: '#ORD-0924', customer: 'Rina Melati', date: '21 Agt 2026', total: 'Rp 210.000', status: 'Selesai' },
  ];

  // Mockup Buku Terlaris (Bulan ini)
  const topBooks = [
    { title: 'Filosofi Teras', sales: 324, stock: 45 },
    { title: 'Atomic Habits', sales: 289, stock: 12 },
    { title: 'Bumi Manusia', sales: 198, stock: 5 },
  ];

  // Helper untuk warna status pesanan
  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'bg-venice-blue-100 text-venice-blue-800';
      case 'Diproses': return 'bg-rock-blue/30 text-venice-blue-950';
      case 'Dikirim': return 'bg-merino-200 text-venice-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    /* Menambahkan padding sisi yang konsisten dengan landing page: px-6 sm:px-12 md:px-20 */
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-10 space-y-8">
      
      {/* 1. HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Ringkasan Hari Ini</h1>
          <p className="text-venice-blue-700/80 mt-1">Pantau performa toko buku Babooku-mu di sini.</p>
        </div>
        <button className="bg-rock-blue text-venice-blue-950 px-5 py-2.5 rounded-xl font-bold hover:bg-rock-blue-dark hover:text-merino transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm">
          <ArrowUpRight className="w-4 h-4" /> Unduh Laporan
        </button>
      </div>

      {/* 2. STATISTIK KARTU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-merino-300/60 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-venice-blue-50 text-venice-blue-700 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-venice-blue-700 bg-venice-blue-50 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> {stat.increase}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-venice-blue-600/70 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-venice-blue-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. KONTEN UTAMA (Tabel & Sidebar Statistik) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabel Pesanan Terbaru (Porsi 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-merino-300/60 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-venice-blue-900">Pesanan Terbaru</h2>
            <button className="text-venice-blue-700 hover:text-venice-blue-950 font-medium text-sm transition-colors">
              Lihat Semua
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-venice-blue-700/70 text-sm border-b border-merino-200">
                  <th className="pb-4 font-medium px-2">ID Pesanan</th>
                  <th className="pb-4 font-medium px-2">Pelanggan</th>
                  <th className="pb-4 font-medium px-2">Tanggal</th>
                  <th className="pb-4 font-medium px-2">Total</th>
                  <th className="pb-4 font-medium px-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-merino-100 last:border-0 hover:bg-merino-50/50 transition-colors">
                    <td className="py-4 px-2 font-bold text-venice-blue-900">{order.id}</td>
                    <td className="py-4 px-2 text-venice-blue-800">{order.customer}</td>
                    <td className="py-4 px-2 text-venice-blue-600/80">{order.date}</td>
                    <td className="py-4 px-2 font-semibold">{order.total}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Buku Terlaris (Porsi 1/3) */}
        <div className="bg-venice-blue-50 rounded-3xl p-6 md:p-8 border border-venice-blue-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-venice-blue-900">Buku Terlaris</h2>
            <button className="text-venice-blue-600 hover:text-venice-blue-900">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {topBooks.map((book, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-merino-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-rock-blue/20 rounded-xl flex items-center justify-center text-venice-blue-800 flex-shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-venice-blue-950 truncate">{book.title}</h4>
                  <p className="text-xs text-venice-blue-600/80 mt-0.5">{book.sales} Terjual</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${book.stock < 10 ? 'text-red-500' : 'text-venice-blue-700'}`}>
                    Sisa {book.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-white border-2 border-venice-blue-200 text-venice-blue-800 py-3 rounded-xl font-bold hover:bg-venice-blue-100 hover:border-venice-blue-300 transition-colors">
            Kelola Inventaris
          </button>
        </div>

      </div>
    </div>
  );
}
