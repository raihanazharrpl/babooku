// resources/pages/ContactPage/index.jsx
import React, { useState } from 'react'
import { 
  Mail, Phone, MapPin, Clock, Send, MessageSquare, 
  HelpCircle, ChevronDown, CheckCircle2, AlertCircle,
  Building2, MessageCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Pertanyaan Umum',
    orderId: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  // --- MOCK FAQ DATA ---
  const faqs = [
    {
      q: 'Berapa lama proses pengiriman buku fisik?',
      a: 'Pesanan buku fisik dikemas dan diserahkan ke kurir dalam waktu 1x24 jam kerja. Estimasi pengiriman tergantung pada pilihan pengiriman (Reguler 2-3 hari, Express 1 hari).'
    },
    {
      q: 'Bagaimana cara mengakses E-Book atau Audiobook yang sudah dibeli?',
      a: 'Setelah pembayaran terverifikasi, E-Book dan Audiobook akan otomatis muncul di menu "Buku Saya" atau "Library" pada akun kamu dan dapat langsung dibaca/didengarkan.'
    },
    {
      q: 'Apakah buku yang dijual di Babooku 100% Original?',
      a: 'Ya, Babooku menjamin 100% buku original langsung dari penerbit resmi. Kami memberikan garansi uang kembali jika terbukti buku bajakan.'
    },
    {
      q: 'Bagaimana prosedur retur jika buku cacat atau rusak saat pengiriman?',
      a: 'Kamu dapat mengajukan retur dalam 7 hari sejak barang diterima melalui halaman "Pesanan Saya" dengan melampirkan video unboxing.'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', category: 'Pertanyaan Umum', orderId: '', message: '' })
    }, 1000)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-venice-blue-950 via-venice-blue-900 to-venice-blue-800 text-merino py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-merino/10 backdrop-blur-md text-rock-blue-light text-xs font-semibold uppercase tracking-wider border border-merino/20">
            <MessageSquare className="w-3.5 h-3.5" /> Pusat Bantuan & Kontak
          </span>
          <h1 className="text-3xl md:text-5xl font-black">
            Ada yang Bisa Kami Bantu?
          </h1>
          <p className="text-merino-200 text-sm md:text-base max-w-xl mx-auto font-light">
            Tim layanan pelanggan Babooku siap membantu kendala pesanan, pertanyaan seputar e-book, atau kerjasama penerbit.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT (GRID FORM & INFO) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* CARDS KONTROL CEPAT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-2xl border border-merino-300/60 shadow-sm hover:border-rock-blue transition-all group flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-venice-blue-900">WhatsApp Live Chat</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">Respon cepat untuk kendala mendesak.</p>
              <span className="text-xs font-bold text-emerald-700 mt-2 block">+62 812-3456-7890</span>
            </div>
          </a>

          <div className="bg-white p-6 rounded-2xl border border-merino-300/60 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-venice-blue-50 text-venice-blue-800">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-venice-blue-900">Email Dukungan</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">Untuk bantuan detail & konfirmasi.</p>
              <span className="text-xs font-bold text-venice-blue-900 mt-2 block">bantuan@babooku.com</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-merino-300/60 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl bg-merino text-venice-blue-900">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-venice-blue-900">Jam Operasional</h3>
              <p className="text-xs text-venice-blue-700/80 mt-1">Senin - Sabtu (Gudang & CS)</p>
              <span className="text-xs font-bold text-venice-blue-900 mt-2 block">08:00 - 20:00 WIB</span>
            </div>
          </div>

        </div>

        {/* SECTION FORMULIR & DETAIL ALAMAT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULIR KIRIM PESAN (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-merino-300/60 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-venice-blue-900">Kirim Pesan Langsung</h2>
              <p className="text-xs text-venice-blue-700/80 mt-1">Isi formulir di bawah ini dan kami akan membalas melalui email dalam 1x24 jam.</p>
            </div>

            {isSubmitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Pesanmu berhasil dikirim! Tim kami akan menghubungi kamu segera.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Eko Kurniawan"
                    className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Kategori Pertanyaan</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                  >
                    <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                    <option value="Kendala Pesanan & Pengiriman">Kendala Pesanan & Pengiriman</option>
                    <option value="Akses E-Book/Audiobook">Akses E-Book/Audiobook</option>
                    <option value="Kerjasama & Penerbit">Kerjasama & Penerbit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">ID Pesanan (Opsional)</label>
                  <input 
                    type="text" 
                    value={formData.orderId}
                    onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                    placeholder="Contoh: ORD-20260813"
                    className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">Pesan Kamu</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tuliskan detail pertanyaan atau kendalamu di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-merino-50/50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-bold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-rock-blue-light" /> Kirim Pesan
              </button>
            </form>
          </div>

          {/* LOKASI GUDANG & PETA (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-merino-300/60 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-venice-blue-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-rock-blue-dark" /> Kantor & Gudang Utama
              </h2>

              <div className="space-y-3 text-xs text-venice-blue-800 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-venice-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-venice-blue-950 text-sm">Babooku Indonesia HQ</strong>
                    Jl. Bojongsoang No. 123, Kabupaten Bandung, Jawa Barat 40375
                  </div>
                </div>
              </div>

              {/* MOCK MAP CONTAINER */}
              <div className="relative w-full h-48 bg-merino-100 rounded-2xl overflow-hidden border border-merino-200 flex items-center justify-center">
                <img 
                  src="https://via.placeholder.com/600x300?text=Peta+Lokasi+Babooku+HQ" 
                  alt="Peta Lokasi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-venice-blue-950/20 flex items-center justify-center">
                  <span className="bg-white text-venice-blue-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" /> Buka Google Maps
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. SECTION FAQ (ACCORDION) */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-merino-300/60 shadow-sm space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-venice-blue-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-rock-blue-dark" /> Pertanyaan Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs text-venice-blue-700/80">Temukan jawaban instan untuk pertanyaan umum seputar pembelian di Babooku.</p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-merino-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left font-bold text-sm text-venice-blue-950 flex justify-between items-center gap-4 hover:text-venice-blue-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-venice-blue-600 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-venice-blue-800/90 mt-2 leading-relaxed bg-merino-50 p-3 rounded-xl">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
