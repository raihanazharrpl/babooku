// resources/pages/Admin/SettingPage.jsx
import React from 'react';
import { Store, CreditCard, Truck, Globe, Save } from 'lucide-react';

export default function SettingPage() {
  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Pengaturan Toko</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Konfigurasi nama toko, alamat ekspedisi, dan pembayaran.</p>
      </div>

      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl">
        <form className="space-y-5 text-xs font-semibold">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-venice-blue-900 border-b border-merino-200 pb-2">Informasi Umum</h3>
            
            <div>
              <label className="block text-venice-blue-800 mb-1">Nama Toko Online</label>
              <input type="text" defaultValue="Babooku Bookstore" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
            </div>

            <div>
              <label className="block text-venice-blue-800 mb-1">Slogan Toko</label>
              <input type="text" defaultValue="Platform Bacaan #1 di Indonesia" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-black text-venice-blue-900 border-b border-merino-200 pb-2">Pengiriman & Pembayaran</h3>
            
            <div>
              <label className="block text-venice-blue-800 mb-1">Kota Asal Pengiriman</label>
              <input type="text" defaultValue="Jakarta Selatan, DKI Jakarta" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-venice-blue-900 text-merino px-6 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md flex items-center gap-2">
              <Save className="w-4 h-4 text-rock-blue-light" /> Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
