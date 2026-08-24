// resources/pages/Admin/ProfilePage.jsx
import React from 'react';
import { User, Mail, Shield, Key, Save } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Profil Saya</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Kelola data informasi akun administrator kamu.</p>
      </div>

      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl">
        <div className="flex items-center gap-4 border-b border-merino-200 pb-6">
          <div className="w-16 h-16 bg-venice-blue-900 text-merino rounded-2xl flex items-center justify-center text-2xl font-black">
            A
          </div>
          <div>
            <h3 className="font-bold text-lg text-venice-blue-950">Administrator Babooku</h3>
            <p className="text-xs text-rock-blue-dark font-bold">Super Admin</p>
          </div>
        </div>

        <form className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-venice-blue-800 mb-1">Nama Lengkap</label>
            <input type="text" defaultValue="Administrator Babooku" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
          </div>

          <div>
            <label className="block text-venice-blue-800 mb-1">Email</label>
            <input type="email" defaultValue="admin@babooku.com" className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl focus:outline-none focus:border-venice-blue-700" />
          </div>

          <div className="pt-2">
            <button type="submit" className="bg-venice-blue-900 text-merino px-5 py-2.5 rounded-xl font-bold hover:bg-venice-blue-800 transition-all shadow-md flex items-center gap-2">
              <Save className="w-4 h-4 text-rock-blue-light" /> Perbarui Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
