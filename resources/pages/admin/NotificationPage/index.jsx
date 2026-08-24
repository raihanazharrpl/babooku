// resources/pages/Admin/NotificationPage.jsx
import React from 'react';
import { Bell, ShoppingBag, UserPlus, AlertCircle, Check } from 'lucide-react';

export default function NotificationPage() {
  const notifications = [
    { id: 1, title: 'Pesanan Baru #ORD-0925', desc: 'Budi Santoso telah melakukan pembayaran Rp 145.000', time: '5 menit lalu', icon: ShoppingBag, color: 'bg-venice-blue-100 text-venice-blue-900' },
    { id: 2, title: 'Stok Buku Hampir Habis', desc: 'Sisa stok untuk "Bumi Manusia" tersisa 2 pcs', time: '1 jam lalu', icon: AlertCircle, color: 'bg-amber-100 text-amber-900' },
    { id: 3, title: 'Pelanggan Baru Bergabung', desc: 'Siti Aminah telah memverifikasi akun', time: '3 jam lalu', icon: UserPlus, color: 'bg-emerald-100 text-emerald-900' },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Pemberitahuan</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Aktivitas sistem dan pembaruan pesanan terkini.</p>
        </div>
        <button className="text-xs font-bold text-venice-blue-800 hover:text-venice-blue-950 flex items-center gap-1">
          <Check className="w-4 h-4" /> Tandai Semua Dibaca
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-merino-300/70 shadow-sm flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-venice-blue-950">{item.title}</h4>
                <p className="text-xs text-venice-blue-700/80 mt-0.5">{item.desc}</p>
                <span className="text-[10px] text-venice-blue-600/60 font-medium mt-1 block">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
