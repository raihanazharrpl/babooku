import React from 'react';
import { ShieldCheck, Package, Truck, RefreshCcw } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    { icon: ShieldCheck, title: '100% Original', desc: 'Garansi uang kembali jika buku terbukti bajakan. Kami hanya menjual produk resmi.' },
    { icon: Package, title: 'Pengemasan Aman', desc: 'Buku dilindungi bubble wrap berlapis dan kardus khusus tanpa biaya tambahan.' },
    { icon: Truck, title: 'Pengiriman Cepat', desc: 'Bekerja sama dengan ekspedisi terbaik untuk menjangkau seluruh pelosok Indonesia.' },
    { icon: RefreshCcw, title: 'Garansi Retur', desc: 'Bebas pengembalian 7 hari jika terdapat cacat produksi atau kerusakan pengiriman.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-venice-blue-900">Kenapa Memilih Babooku?</h2>
        <p className="text-venice-blue-700/80 text-lg">Kami berkomitmen memberikan pengalaman belanja buku online yang aman, cepat, dan nyaman untuk para pecinta literasi.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-merino-300/60 shadow-sm hover:shadow-xl hover:border-rock-blue transition-all duration-300 group">
            <div className="w-14 h-14 bg-venice-blue-50 text-venice-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-venice-blue-700 group-hover:text-merino transition-colors duration-300">
              <feat.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-venice-blue-900 mb-3">{feat.title}</h3>
            <p className="text-venice-blue-800/70 leading-relaxed text-sm">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
