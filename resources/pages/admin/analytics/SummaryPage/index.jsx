// resources/pages/Admin/Analytics/SummaryPage.jsx
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DollarSign, ShoppingBag, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function SummaryPage() {
  const data = [
    { month: 'Jan', omset: 12000000 },
    { month: 'Feb', omset: 15000000 },
    { month: 'Mar', omset: 18000000 },
    { month: 'Apr', omset: 14000000 },
    { month: 'Mei', omset: 22000000 },
    { month: 'Jun', omset: 24500000 },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Ringkasan Analistik Utama</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Gambaran umum performa bisnis Babooku secara keseluruhan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendapatan', val: 'Rp 105.5M', icon: DollarSign },
          { label: 'Total Transaksi', val: '1.240', icon: ShoppingBag },
          { label: 'Buku Terjual', val: '3.420', icon: BookOpen },
          { label: 'Pengguna Baru', val: '+450', icon: Users },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-merino-300/70 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-venice-blue-600/80">{item.label}</p>
              <h3 className="text-xl font-black text-venice-blue-950 mt-1">{item.val}</h3>
            </div>
            <div className="w-10 h-10 bg-venice-blue-50 text-venice-blue-800 rounded-xl flex items-center justify-center">
              <item.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-merino-300/70 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-venice-blue-900">Tren Pertumbuhan Omset (2026)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" tickLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="omset" stroke="#003554" fill="#003554" fillOpacity={0.1} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
