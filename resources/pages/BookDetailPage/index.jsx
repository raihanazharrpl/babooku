// resources/pages/BookDetailPage/index.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
  Star, ShoppingCart, Heart, Share2, BookOpen, 
  Smartphone, Headphones, ShieldCheck, Truck, CheckCircle2, 
  ArrowLeft, ChevronRight, Eye, Loader2, Send
} from 'lucide-react'

import { getCoverUrl } from '#resources/helpers/assetsHelper.js'
import { formatRupiah } from '#resources/helpers/priceHelper.js'

export default function BookDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  // State Data Utama
  const [book, setBook] = useState(null)
  const [reviewsData, setReviewsData] = useState({ average_rating: 5.0, total_reviews: 0, reviews: [] })
  const [isLoading, setIsLoading] = useState(true)

  // State Form & Pilihan
  const [selectedFormat, setSelectedFormat] = useState('physical')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('deskripsi')
  const [isWishlist, setIsWishlist] = useState(false)
  const [isSubmittingCart, setIsSubmittingCart] = useState(false)

  // State Input Ulasan Baru
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  // 1. FETCH DATA DETAIL BUKU & ULASAN
  useEffect(() => {
    fetchBookDetail()
    fetchBookReviews()
  }, [id])

  const fetchBookDetail = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/books?id=${id}`)
      const json = await res.json()
      if (json.success && json.data) {
        // Jika API mengembalikan array, ambil item pertama
        const bookData = Array.isArray(json.data) 
          ? json.data.find(b => String(b.id) === String(id)) || json.data[0]
          : json.data
        setBook(bookData)
      }
    } catch (error) {
      console.error('Gagal memuat detail buku:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBookReviews = async () => {
    try {
      const res = await fetch(`/api/books/reviews?book_id=${id}`)
      const json = await res.json()
      if (json.success) {
        setReviewsData(json.data)
      }
    } catch (error) {
      console.error('Gagal memuat ulasan:', error)
    }
  }

  // 2. HANDLER TAMBAH KE KERANJANG
  const handleAddToCart = async (directCheckout = false) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Kamu harus login terlebih dahulu untuk menambah ke keranjang!')
      navigate('/auth/login')
      return
    }

    setIsSubmittingCart(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          book_id: book.id,
          quantity: quantity
        })
      })
      const json = await res.json()

      if (json.success) {
        if (directCheckout) {
          navigate('/checkout')
        } else {
          alert('Buku berhasil ditambahkan ke keranjang belanja!')
        }
      } else {
        alert('Gagal: ' + json.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan jaringan.')
    } finally {
      setIsSubmittingCart(false)
    }
  }

  // 3. HANDLER TOGGLE LIKE / WISHLIST
  const handleToggleLike = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Silakan login terlebih dahulu untuk menyukai buku ini.')
      return
    }

    try {
      const res = await fetch('/api/books/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ book_id: book.id })
      })
      const json = await res.json()
      if (json.success) {
        setIsWishlist(json.is_liked)
      }
    } catch (error) {
      console.error('Gagal menyukai buku:', error)
    }
  }

  // 4. HANDLER SUBMIT ULASAN BARU
  const handleSubmitReview = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Kamu harus login terlebih dahulu untuk memberikan ulasan.')
      return
    }

    setIsSubmittingReview(true)
    try {
      const res = await fetch('/api/books/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          book_id: book.id,
          rating: newRating,
          comment: newComment
        })
      })
      const json = await res.json()

      if (json.success) {
        alert('Ulasan kamu berhasil dikirim!')
        setNewComment('')
        fetchBookReviews()
      } else {
        alert('Gagal: ' + json.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim ulasan.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-merino-50 flex flex-col items-center justify-center text-venice-blue-800">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="font-bold text-sm">Memuat detail buku...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-merino-50 flex flex-col items-center justify-center text-venice-blue-900 p-4">
        <h2 className="text-2xl font-black mb-2">Buku Tidak Ditemukan</h2>
        <p className="text-sm text-venice-blue-700 mb-4">Buku yang kamu cari tidak tersedia atau telah dihapus.</p>
        <Link to="/store" className="bg-venice-blue-900 text-merino font-bold px-6 py-2.5 rounded-xl">
          Kembali ke Katalog
        </Link>
      </div>
    )
  }

  // Format Opsi Bacaan
  const formats = {
    physical: { 
      label: 'Buku Fisik', 
      icon: BookOpen, 
      note: 'Dikirim rapi dengan Bubble Wrap berlapis' 
    },
    ebook: { 
      label: 'E-Book (Digital)', 
      icon: Smartphone, 
      note: 'Akses instan di aplikasi perpustakaan' 
    },
    audiobook: { 
      label: 'Audiobook', 
      icon: Headphones, 
      note: 'Format suara jernih High-Definition' 
    }
  }

  const currentFormat = formats[selectedFormat]

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-24">
      
      {/* 1. BREADCRUMB HEADER */}
      <div className="bg-white border-b border-merino-300/60 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs md:text-sm">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-bold text-venice-blue-800 hover:text-venice-blue-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          
          <div className="flex items-center gap-2 text-venice-blue-600/70 truncate max-w-md hidden sm:flex">
            <Link to="/store" className="hover:underline">Katalog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="truncate font-semibold text-venice-blue-950">{book.title}</span>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Link buku berhasil disalin!')
            }}
            className="p-2 text-venice-blue-800 hover:bg-merino-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN DETAIL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* --- LEFT: COVER BUKU --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-merino-300/60 shadow-md relative overflow-hidden flex flex-col items-center">
              
              <button 
                onClick={handleToggleLike}
                className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all shadow-sm ${
                  isWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500' 
                    : 'bg-white/80 border-merino-200 text-venice-blue-800 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500' : ''}`} />
              </button>

              <img 
                src={book.cover_image ? getCoverUrl(book.cover_image) : 'https://via.placeholder.com/300x400?text=Cover+Buku'} 
                alt={book.title} 
                className="w-48 sm:w-56 aspect-[3/4] object-cover rounded-2xl shadow-lg border border-merino-200 my-2"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 border border-merino-300/60 shadow-sm space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-venice-blue-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Produk Original dari Penerbit</span>
              </div>
              <div className="flex items-center gap-2.5 text-venice-blue-900 font-semibold">
                <Truck className="w-4 h-4 text-rock-blue-dark shrink-0" />
                <span>Garansi Retur Jika Cacat Produksi</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: DETAIL NAMA & INFORMASI --- */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-venice-blue-900 text-merino text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {book.publisher_name || book.publisher || 'Penerbit Utama'}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{reviewsData.average_rating}</span>
                  <span className="text-venice-blue-600/60 font-normal">({reviewsData.total_reviews} ulasan)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-venice-blue-950 leading-tight">
                {book.title}
              </h1>
              <p className="text-sm text-venice-blue-700">Penulis: <strong className="text-venice-blue-950 font-bold">{book.author}</strong></p>
            </div>

            {/* PILIH FORMAT BUKU */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-venice-blue-900 uppercase tracking-wider">
                Pilih Format Bacaan:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(formats).map((key) => {
                  const fmt = formats[key]
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
                        <p className="font-black text-sm text-venice-blue-900 mt-1">{formatRupiah(book.price)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-xs text-venice-blue-700/80 italic flex items-center gap-1">
                ℹ️ {currentFormat.note}
              </p>
            </div>

            {/* HARGA & PANEL AKSI */}
            <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-venice-blue-950">
                  {formatRupiah(book.price)}
                </span>
              </div>

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
                      onClick={() => setQuantity(Math.min(book.stock || 99, quantity + 1))}
                      className="px-3 py-1.5 font-bold text-venice-blue-800 hover:bg-merino-200 rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-venice-blue-600/70">Stok Tersedia: {book.stock} pcs</span>
                </div>
              )}

              {/* TOMBOL KERANJANG & BELI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => handleAddToCart(false)}
                  disabled={isSubmittingCart}
                  className="bg-merino hover:bg-merino-200 text-venice-blue-950 font-bold py-3.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 border border-merino-300 disabled:opacity-50"
                >
                  {isSubmittingCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4 text-rock-blue-dark" />}
                  + Tambah Keranjang
                </button>
                <button 
                  onClick={() => handleAddToCart(true)}
                  disabled={isSubmittingCart}
                  className="bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-black py-3.5 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-venice-blue-950/20 disabled:opacity-50"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>

            {/* TAB INFORMASI */}
            <div className="space-y-4 pt-2">
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

              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm text-sm leading-relaxed text-venice-blue-900">
                {activeTab === 'deskripsi' && (
                  <p className="whitespace-pre-line">{book.description || 'Belum ada deskripsi untuk buku ini.'}</p>
                )}

                {activeTab === 'spesifikasi' && (
                  <div className="grid grid-cols-2 gap-y-3 text-xs">
                    <div><span className="text-venice-blue-600">Kategori:</span> <p className="font-bold">{book.category_name || '-'}</p></div>
                    <div><span className="text-venice-blue-600">Subkategori:</span> <p className="font-bold">{book.subcategory_name || '-'}</p></div>
                    <div><span className="text-venice-blue-600">Penerbit:</span> <p className="font-bold">{book.publisher_name || book.publisher || '-'}</p></div>
                    <div><span className="text-venice-blue-600">Penulis:</span> <p className="font-bold">{book.author}</p></div>
                    <div><span className="text-venice-blue-600">Status Stok:</span> <p className="font-bold">{book.stock} pcs</p></div>
                  </div>
                )}

                {activeTab === 'ulasan' && (
                  <div className="space-y-6">
                    {/* Form Beri Ulasan */}
                    <form onSubmit={handleSubmitReview} className="bg-merino-50 p-4 rounded-xl space-y-3 border border-merino-200">
                      <h4 className="font-bold text-xs text-venice-blue-900">Beri Rating & Ulasan Buku Ini:</h4>
                      <div className="flex gap-1 text-amber-400 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            onClick={() => setNewRating(star)}
                            className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <textarea
                        rows="2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tuliskan ulasan pengalaman membacamu..."
                        className="w-full p-2.5 bg-white border border-merino-300 rounded-lg text-xs focus:outline-none focus:border-venice-blue-700 resize-none"
                      />
                      <button 
                        type="submit" 
                        disabled={isSubmittingReview}
                        className="bg-venice-blue-900 text-merino font-bold px-4 py-2 rounded-lg text-xs hover:bg-venice-blue-800 flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isSubmittingReview ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Kirim Ulasan
                      </button>
                    </form>

                    {/* Daftar Ulasan User */}
                    <div className="space-y-4">
                      {reviewsData.reviews.length === 0 ? (
                        <p className="text-xs text-center py-4 text-venice-blue-600 font-semibold">Belum ada ulasan untuk buku ini.</p>
                      ) : (
                        reviewsData.reviews.map((rev) => (
                          <div key={rev.id} className="border-b border-merino-200 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs">{rev.user_name}</span>
                              <span className="text-[10px] text-venice-blue-600/60">
                                {new Date(rev.created_at).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            <div className="flex text-amber-400 mb-1">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                              ))}
                            </div>
                            <p className="text-xs text-venice-blue-800">{rev.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
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
