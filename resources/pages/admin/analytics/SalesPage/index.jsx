// resources/pages/Admin/Analytics/SalesPage.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Calendar, Download } from 'lucide-react';

export default function SalesPage() {
  const salesData = [
    { day: 'Senin', sales: 3200000 },
    { day: 'Selasa', sales: 4100000 },
    { day: 'Rabu', sales: 2800000 },
    { day: 'Kamis', sales: 5200000 },
    { day: 'Jumat', sales: 6800000 },
    { day: 'Sabtu', sales: 9500000 },
    { day: 'Minggu', sales: 8200000 },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Laporan Penjualan</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Rincian omset harian dan mingguan.</p>
        </div>
        <button className="bg-venice-blue-900 text-merino px-4 py-2 rounded-xl text-xs font-bold hover:bg-venice-blue-800 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-merino-300/70 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-venice-blue-900">Penjualan seminggu Terakhir</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="day" tickLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#0582CA" radius={[8, 8, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
