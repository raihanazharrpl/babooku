// resources/pages/Admin/BannerPage.jsx
import React from 'react';
import { Image as ImageIcon, Plus, Edit2, Trash2, Eye } from 'lucide-react';

export default function BannerPage() {
  const banners = [
    { id: 1, title: 'Promo Diskon Kemerdekaan 45%', status: 'Aktif', image: '/storage/assets/images/static/wallpaper-landing-page.jpg' },
    { id: 2, title: 'Rekomendasi Buku Novel Terlaris', status: 'Draft', image: '' },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Banner & Hero Website</h1>
          <p className="text-sm text-venice-blue-700/80 mt-1">Kelola gambar promosi dan slider halaman depan toko.</p>
        </div>
        <button className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4 text-rock-blue-light" /> Tambah Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="h-44 bg-merino-200 relative flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-venice-blue-600/50" />
              )}
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                {item.status}
              </span>
            </div>
            <div className="p-5 flex items-center justify-between">
              <h4 className="font-bold text-venice-blue-950 text-sm">{item.title}</h4>
              <div className="flex items-center gap-1">
                <button className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
