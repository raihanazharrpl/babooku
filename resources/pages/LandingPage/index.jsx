// resources/pages/LandingPage/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, Truck, RefreshCcw, 
  Package, ArrowRight, Star, Users, Library, 
  BookMarked, ChevronRight, ShoppingCart
} from 'lucide-react';
import { getAssetUrl } from '@/resources/helpers/assetsHelper.js';

export default function LandingPage() {
  const navigate = useNavigate();

  // Data Statistik
  const stats = [
    { icon: Library, value: '15.000+', label: 'Judul Buku' },
    { icon: Users, value: '50.000+', label: 'Pembaca Setia' },
    { icon: Star, value: '4.9/5', label: 'Rating Toko' },
    { icon: BookMarked, value: '500+', label: 'Penerbit Resmi' },
  ];

  // Data Spesifikasi/Fitur Layanan
  const features = [
    { icon: ShieldCheck, title: '100% Original', desc: 'Garansi uang kembali jika buku terbukti bajakan. Kami hanya menjual produk resmi.' },
    { icon: Package, title: 'Pengemasan Aman', desc: 'Buku dilindungi bubble wrap berlapis dan kardus khusus tanpa biaya tambahan.' },
    { icon: Truck, title: 'Pengiriman Cepat', desc: 'Bekerja sama dengan ekspedisi terbaik untuk menjangkau seluruh pelosok Indonesia.' },
    { icon: RefreshCcw, title: 'Garansi Retur', desc: 'Bebas pengembalian 7 hari jika terdapat cacat produksi atau kerusakan pengiriman.' },
  ];

  // Data Kategori Populer (Styling dikustomisasi sesuai palet warna)
  const categories = [
    { name: 'Novel & Sastra', count: '3.2k+ Buku', color: 'bg-merino text-venice-blue-900 border-rock-blue/30 hover:border-rock-blue' },
    { name: 'Pengembangan Diri', count: '1.5k+ Buku', color: 'bg-venice-blue-50 text-venice-blue-900 border-venice-blue-200 hover:border-venice-blue-400' },
    { name: 'Bisnis & Ekonomi', count: '2.1k+ Buku', color: 'bg-merino-50 text-venice-blue-900 border-rock-blue-light/50 hover:border-rock-blue' },
    { name: 'Sains & Teknologi', count: '1.8k+ Buku', color: 'bg-venice-blue-100/50 text-venice-blue-900 border-venice-blue-200 hover:border-venice-blue-400' },
  ];

  // Mockup Buku Terlaris
  const bestSellers = [
    { id: 1, title: 'Filosofi Teras', author: 'Henry Manampiring', price: 'Rp 98.000', cover: '/storage/assets/images/ex.png' },
    { id: 2, title: 'Atomic Habits (Terjemahan)', author: 'James Clear', price: 'Rp 108.000', cover: '/storage/assets/images/statis/book2.webp' },
    { id: 3, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', price: 'Rp 145.000', cover: '/storage/assets/images/statis/book3.webp' },
    { id: 4, title: 'Sapiens: Riwayat Singkat', author: 'Yuval Noah Harari', price: 'Rp 165.000', cover: '/storage/assets/images/statis/book4.webp' },
  ];

  return (
    <div className="min-h-screen bg-merino-50 overflow-x-hidden font-sans text-venice-blue-950">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[85vh] overflow-hidden">
        <img 
          src={getAssetUrl('static/wallpaper-landing-page.jpg')} 
          alt="Perpustakaan Babooku" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 transform-gpu"
        />
        
        {/* Gradasi Lembut ke Warna Merino-50 di Bagian Bawah */}
        <div className="absolute inset-0 bg-gradient-to-b from-venice-blue-950/85 via-venice-blue-900/60 to-merino-50 flex flex-col justify-between px-6 pt-12 md:pt-24 pb-32 sm:px-12 md:px-20">
          
          {/* Badge Atas */}
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 bg-merino/10 backdrop-blur-md text-merino text-xs md:text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full border border-merino/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-rock-blue-light" /> Platform Bacaan #1 di Indonesia
            </span>
          </div>

          {/* Headline & CTA */}
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-merino leading-tight drop-shadow-xl">
              Buka Halaman Baru, <br className="hidden md:block" />
              Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-rock-blue-light to-rock-blue italic">Dunia Tanpa Batas</span>.
            </h1>
            <p className="text-merino/90 text-lg md:text-2xl font-light max-w-2xl leading-relaxed drop-shadow-md">
              Ribuan buku original menunggumu. Dari literatur klasik hingga best-seller masa kini, semua ada di Babooku dengan penawaran terbaik setiap harinya.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={() => navigate('/store')}
                className="w-full sm:w-auto bg-rock-blue text-venice-blue-950 px-8 py-4 rounded-xl font-bold hover:bg-rock-blue-dark hover:text-merino transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                Mulai Belanja <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="w-full sm:w-auto bg-merino/10 backdrop-blur-sm text-merino border border-merino/30 px-8 py-4 rounded-xl font-semibold hover:bg-merino/20 transition-all active:scale-95 text-lg"
              >
                Pelajari Babooku
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTIK */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 sm:-mt-20">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-venice-blue-950/5 border border-merino-300/50 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 divide-x-0 md:divide-x divide-merino-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2 md:px-4">
              <div className="p-3 bg-venice-blue-50 text-venice-blue-700 rounded-2xl mb-2">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-venice-blue-900">{stat.value}</h4>
              <p className="text-sm md:text-base font-medium text-venice-blue-600/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SPESIFIKASI & KEUNGGULAN */}
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

      {/* 4. KATEGORI POPULER */}
      <div className="bg-merino/60 py-24 border-y border-merino-300/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-venice-blue-900">Kategori Terpopuler</h2>
              <p className="text-venice-blue-700/80">Telusuri genre yang paling banyak dicari minggu ini.</p>
            </div>
            <button className="text-venice-blue-700 font-semibold flex items-center gap-1 hover:text-venice-blue-900 transition-colors">
              Lihat Semua Kategori <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border cursor-pointer transition-transform hover:-translate-y-1 ${cat.color}`}>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. PREVIEW BUKU TERLARIS */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-venice-blue-900">Buku Terlaris 🔥</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((book) => (
            <div key={book.id} className="group bg-white rounded-2xl border border-merino-300/60 p-4 hover:shadow-2xl hover:shadow-venice-blue-900/10 transition-all duration-300">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-merino-100 border border-merino-200">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Cover+Buku' }} 
                />
                <div className="absolute inset-0 bg-venice-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-merino text-venice-blue-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-rock-blue hover:text-venice-blue-950 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-1 px-1">
                <p className="text-sm font-medium text-rock-blue-dark">{book.author}</p>
                <h3 className="font-bold text-venice-blue-950 line-clamp-2 leading-tight min-h-[2.5rem]">{book.title}</h3>
                <p className="text-lg font-black text-venice-blue-800 pt-2">{book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. BOTTOM CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-venice-blue-800 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-rock-blue/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-merino/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-merino leading-tight">
              Siap Memulai Petualangan Membacamu Hari Ini?
            </h2>
            <p className="text-rock-blue-light text-lg md:text-xl">
              Daftar sekarang dan dapatkan voucher diskon 20% untuk pembelian pertama kamu di Babooku!
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/auth/register')}
                className="bg-merino text-venice-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-rock-blue hover:text-venice-blue-950 transition-colors shadow-xl"
              >
                Daftar Gratis
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
