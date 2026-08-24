// resources/pages/Admin/Analytics/UserPage.jsx
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function UsersPage() {
  const userData = [
    { week: 'W1', registrasi: 40, aktif: 120 },
    { week: 'W2', registrasi: 65, aktif: 180 },
    { week: 'W3', registrasi: 90, aktif: 240 },
    { week: 'W4', registrasi: 110, aktif: 310 },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Laporan Pengguna</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Grafik pertumbuhan registrasi dan retensi pengguna aktif.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-merino-300/70 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-venice-blue-900">Pertumbuhan Pengguna Bulan Ini</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="week" tickLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="registrasi" stroke="#003554" strokeWidth={3} isAnimationActive={false} />
              <Line type="monotone" dataKey="aktif" stroke="#0582CA" strokeWidth={3} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
