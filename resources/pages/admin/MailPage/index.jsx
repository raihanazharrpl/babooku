// resources/pages/Admin/MailPage.jsx
import React from 'react';
import { Mail, Search, Star, Trash2 } from 'lucide-react';

export default function MailPage() {
  const mails = [
    { id: 1, sender: 'Budi Santoso', email: 'budi@gmail.com', subject: 'Tanya Stok Buku Atomic Habits', date: '10:30 AM', unread: true },
    { id: 2, sender: 'Penerbit Erlangga', email: 'contact@erlangga.co.id', subject: 'Penawaran Kerjasama Distribusi', date: 'Kemarin', unread: false },
  ];

  return (
    <div className="w-full min-h-screen bg-merino-50 font-sans text-venice-blue-950 px-6 sm:px-12 md:px-20 py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-venice-blue-900">Pesan & Pertanyaan</h1>
        <p className="text-sm text-venice-blue-700/80 mt-1">Pesan masuk dari form kontak pelanggan Babooku.</p>
      </div>

      <div className="bg-white rounded-3xl border border-merino-300/70 shadow-sm overflow-hidden divide-y divide-merino-100">
        {mails.map((mail) => (
          <div key={mail.id} className={`p-5 flex items-center justify-between hover:bg-merino-50/60 transition-colors cursor-pointer ${mail.unread ? 'bg-venice-blue-50/30' : ''}`}>
            <div className="flex items-center gap-4">
              <Mail className={`w-5 h-5 ${mail.unread ? 'text-venice-blue-900' : 'text-venice-blue-600/60'}`} />
              <div>
                <h4 className={`text-sm ${mail.unread ? 'font-black text-venice-blue-950' : 'font-semibold text-venice-blue-800'}`}>{mail.sender}</h4>
                <p className="text-xs text-venice-blue-700/80 truncate">{mail.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-venice-blue-600/70">
              <span>{mail.date}</span>
              <button className="p-1 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
