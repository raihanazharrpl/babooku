// resources/pages/admin/analytics/StockPage/index.jsx
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PackageX, AlertTriangle, CheckCircle } from 'lucide-react';

export default function StockPage() {
  const stockPieData = [
    { name: 'Stok Aman (>20)', value: 120, color: '#10B981' },
    { name: 'Stok Menipis (<10)', value: 25, color: '#F59E0B' },
    { name: 'Stok Habis (0)', value: 8, color: '#EF4444' },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Laporan Perputaran Stok</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Status ketersediaan inventaris buku toko.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-merino-300/70 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-base text-venice-blue-900">Proporsi Ketersediaan Buku</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" isAnimationActive={false}>
                  {stockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-merino-300/70 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-venice-blue-900">Perhatian Khusus Inventaris</h3>
          <div className="space-y-3 text-xs font-semibold">
            <div className="p-3 bg-red-50 text-red-900 rounded-xl flex items-center gap-3">
              <PackageX className="w-5 h-5 shrink-0 text-red-600" />
              <span>8 Judul buku telah habis dan membutuhkan <em>restock</em> segera.</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-900 rounded-xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
              <span>25 Judul buku dalam status peringatan persediaan rendah.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
