// resources/pages/BookDetailPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
  Star, ShoppingCart, Heart, Share2, BookOpen, 
  Smartphone, Headphones, ShieldCheck, Truck, CheckCircle2, 
  ArrowLeft, ChevronRight, MessageSquare, Award, Eye
} from 'lucide-react'

export default function BookDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  // --- STATE INTERAKTIF ---
  const [selectedFormat, setSelectedFormat] = useState('physical') // 'physical' | 'ebook' | 'audiobook'
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('deskripsi') // 'deskripsi' | 'spesifikasi' | 'ulasan'
  const [isWishlist, setIsWishlist] = useState(false)

  // --- MOCK BUKU DETAIL ---
  const book = {
    id: id || 1,
    title: 'Filosofi Teras: Stoisisme untuk Mental Tangguh',
    author: 'Henry Manampiring',
    publisher: 'Kompaspedia',
    publishDate: '2019',
    isbn: '9786024125189',
    pages: 346,
    language: 'Bahasa Indonesia',
    weight: '350 gram',
    rating: 4.9,
    reviewCount: 328,
    soldCount: '1.2k+',
    cover: '/storage/assets/images/ex.png',
    
    // Variasi Harga Berdasarkan Format
    formats: {
      physical: { price: 98000, originalPrice: 115000, stock: 45, label: 'Buku Fisik', icon: BookOpen, note: 'Dikirim dari Bandung' },
      ebook: { price: 75000, originalPrice: 90000, stock: 999, label: 'E-Book (PDF/EPUB)', icon: Smartphone, note: 'Akses Instan setelah bayar' },
      audiobook: { price: 85000, originalPrice: 100000, stock: 999, label: 'Audiobook', icon: Headphones, note: 'Durasi 6 Jam 20 Menit' }
    },

    description: `Lebih dari 2.000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan solusi dari banyak emosi negatif. Stoisisme, atau Filsafat Teras, adalah filsafat Yunani-Romi kuno yang bisa membantu kita mengatasi emosi negatif dan menggembleng mental dalam menghadapi wewenang hidup.

Buku "Filosofi Teras" ini membawa ajaran Stoisisme dengan gaya bahasa yang relevan, santai, dan mudah dipahami oleh generasi muda Indonesia. Dilengkapi dengan riset dan survei nyata mengenai kesehatan mental.`,
    
    reviews: [
      { id: 1, user: 'Budi Santoso', rating: 5, date: '10 Aug 2026', comment: 'Buku wajib untuk siapa saja yang sering mengalami overthinking. Pengiriman cepat dan bubble wrap tebal!' },
      { id: 2, user: 'Siti Rahma', rating: 5, date: '02 Aug 2026', comment: 'Versi e-book nya enak banget dibaca di tablet. Bahasa mas Henry gampang dicerna.' }
    ]
  }

  // Format Aktif
  const currentFormat = book.formats[selectedFormat]

  // Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-24">
      
      {/* 1. BREADCRUMB & TOP NAV */}
      <div className="bg-white border-b border-merino-300/60 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs md:text-sm">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-bold text-venice-blue-800 hover:text-venice-blue-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <div className="flex items-center gap-2 text-venice-blue-600/70 truncate max-w-md hidden sm:flex">
            <Link to="/store" className="hover:underline">Store</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="truncate">{book.title}</span>
          </div>
          <button className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. MAIN BUKU CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* --- LEFT: COVER & PREVIEW (4 COLS) --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-merino-300/60 shadow-md relative overflow-hidden flex flex-col items-center">
              
              {/* Wishlist Button */}
              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all shadow-sm ${
                  isWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'bg-white/80 border-merino-200 text-venice-blue-800 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500' : ''}`} />
              </button>

              {/* Cover Image */}
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-48 sm:w-56 aspect-[3/4] object-cover rounded-2xl shadow-lg border border-merino-200 my-2"
              />

              {/* Baca Sampel Button */}
              <button className="mt-4 w-full bg-merino-100 hover:bg-merino text-venice-blue-900 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-merino-300/60 transition-colors">
                <Eye className="w-4 h-4 text-rock-blue-dark" /> Baca Sampel Gratis
              </button>
            </div>

            {/* Jaminan Penjual */}
            <div className="bg-white rounded-2xl p-4 border border-merino-300/60 shadow-sm space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-venice-blue-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Original dari Penerbit</span>
              </div>
              <div className="flex items-center gap-2.5 text-venice-blue-900 font-semibold">
                <Truck className="w-4 h-4 text-rock-blue-dark shrink-0" />
                <span>Garansi Retur Cacat Produksi</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: DETAIL & OPSI (8 COLS) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-venice-blue-900 text-merino text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {book.publisher}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{book.rating}</span>
                  <span className="text-venice-blue-600/60 font-normal">({book.reviewCount} ulasan)</span>
                </div>
                <span className="text-xs text-venice-blue-600/60">• Terjual {book.soldCount}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-venice-blue-950 leading-tight">
                {book.title}
              </h1>
              <p className="text-sm text-venice-blue-700">Penulis: <strong className="text-venice-blue-950 font-bold">{book.author}</strong></p>
            </div>

            {/* OPSI PILIH FORMAT BUKU */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">
                Pilih Format Bacaan:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(book.formats).map((key) => {
                  const fmt = book.formats[key]
                  const Icon = fmt.icon
                  const isSelected = selectedFormat === key

                  return (
                    <div 
                      key={key}
                      onClick={() => setSelectedFormat(key)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'border-venice-blue-900 bg-white shadow-md' 
                          : 'border-merino-300/80 bg-white/60 hover:border-rock-blue'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-venice-blue-900' : 'text-venice-blue-600'}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-venice-blue-900" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-venice-blue-950">{fmt.label}</p>
                        <p className="font-black text-sm text-venice-blue-900 mt-1">{formatRupiah(fmt.price)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-xs text-venice-blue-700/80 italic flex items-center gap-1">
                ℹ️ {currentFormat.note}
              </p>
            </div>

            {/* PRICING & QUANTITY PANEL */}
            <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-venice-blue-950">
                  {formatRupiah(currentFormat.price)}
                </span>
                {currentFormat.originalPrice && (
                  <span className="text-sm line-through text-slate-400">
                    {formatRupiah(currentFormat.originalPrice)}
                  </span>
                )}
              </div>

              {/* Quantity Counter (Hanya untuk fisik) */}
              {selectedFormat === 'physical' && (
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-bold text-venice-blue-900">Jumlah:</span>
                  <div className="flex items-center border border-merino-300 rounded-xl bg-merino-50">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 font-bold text-venice-blue-800 hover:bg-merino-200 rounded-l-xl"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-venice-blue-950">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 font-bold text-venice-blue-800 hover:bg-merino-200 rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-venice-blue-600/70">Stok: {currentFormat.stock}</span>
                </div>
              )}

              {/* TOMBOL AKSI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => navigate('/cart')}
                  className="bg-merino hover:bg-merino-200 text-venice-blue-950 font-bold py-3.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 border border-merino-300"
                >
                  <ShoppingCart className="w-4 h-4 text-rock-blue-dark" /> + Keranjang
                </button>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-black py-3.5 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-venice-blue-950/20"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>

            {/* TAB SECTIONS (Deskripsi, Spesifikasi, Ulasan) */}
            <div className="space-y-4 pt-4">
              {/* Tab Header */}
              <div className="flex border-b border-merino-300">
                {['deskripsi', 'spesifikasi', 'ulasan'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-4 font-bold text-sm capitalize transition-all border-b-2 ${
                      activeTab === tab
                        ? 'border-venice-blue-900 text-venice-blue-900'
                        : 'border-transparent text-venice-blue-600/60 hover:text-venice-blue-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm text-sm leading-relaxed text-venice-blue-900">
                {activeTab === 'deskripsi' && (
                  <p className="whitespace-pre-line">{book.description}</p>
                )}

                {activeTab === 'spesifikasi' && (
                  <div className="grid grid-cols-2 gap-y-3 text-xs">
                    <div><span className="text-venice-blue-600">ISBN:</span> <p className="font-bold">{book.isbn}</p></div>
                    <div><span className="text-venice-blue-600">Jumlah Halaman:</span> <p className="font-bold">{book.pages} Halaman</p></div>
                    <div><span className="text-venice-blue-600">Penerbit:</span> <p className="font-bold">{book.publisher}</p></div>
                    <div><span className="text-venice-blue-600">Bahasa:</span> <p className="font-bold">{book.language}</p></div>
                    <div><span className="text-venice-blue-600">Berat Pengiriman:</span> <p className="font-bold">{book.weight}</p></div>
                  </div>
                )}

                {activeTab === 'ulasan' && (
                  <div className="space-y-4">
                    {book.reviews.map((rev) => (
                      <div key={rev.id} className="border-b border-merino-200 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs">{rev.user}</span>
                          <span className="text-[10px] text-venice-blue-600/60">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400 mb-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-venice-blue-800">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
