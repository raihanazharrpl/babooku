// resources/pages/CartPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  BookOpen, Smartphone, Headphones, ShieldCheck, Tag,
  ArrowLeft, Check
} from 'lucide-react'

export default function CartPage() {
  const navigate = useNavigate()

  // --- MOCK DATA ITEMS KERANJANG ---
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      format: 'physical',
      price: 98000,
      originalPrice: 115000,
      quantity: 1,
      selected: true,
      cover: '/storage/assets/images/ex.png'
    },
    {
      id: 2,
      title: 'Atomic Habits (Digital Edition)',
      author: 'James Clear',
      format: 'ebook',
      price: 85000,
      originalPrice: null,
      quantity: 1,
      selected: true,
      cover: '/storage/assets/images/statis/book2.webp'
    },
    {
      id: 3,
      title: 'Sapiens: Riwayat Singkat (Audiobook)',
      author: 'Yuval Noah Harari',
      format: 'audiobook',
      price: 120000,
      originalPrice: 150000,
      quantity: 1,
      selected: false,
      cover: '/storage/assets/images/statis/book4.webp'
    }
  ])

  // --- HANDLER CHECKBOX & QUANTITY ---
  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected)
    setCartItems(cartItems.map(item => ({ ...item, selected: !allSelected })))
  }

  const toggleSelectItem = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // --- PERHITUNGAN RINGKASAN ---
  const selectedItems = cartItems.filter(item => item.selected)
  const totalSelectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Helper Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER SIMPLE KERANJANG */}
      <div className="bg-white border-b border-merino-300/60 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/store')} 
            className="flex items-center gap-2 text-sm font-bold text-venice-blue-800 hover:text-venice-blue-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Lanjut Belanja
          </button>
          <span className="font-black text-lg text-venice-blue-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rock-blue-dark" /> Keranjang Belanja
          </span>
          <div className="w-20 hidden sm:block"></div> {/* Spacer balance */}
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="bg-white rounded-3xl p-12 text-center border border-merino-300/60 shadow-sm space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-merino-100 text-venice-blue-800 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-venice-blue-900">Keranjangmu Masih Kosong</h2>
            <p className="text-sm text-venice-blue-700/80">Sepertinya kamu belum menambahkan buku apa pun ke keranjang.</p>
            <Link 
              to="/store" 
              className="inline-block bg-venice-blue-900 text-merino font-bold px-6 py-3 rounded-xl hover:bg-venice-blue-800 transition-colors shadow-md text-sm"
            >
              Cari Buku Sekarang
            </Link>
          </div>
        ) : (
          /* CART CONTENT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- LEFT SECTION: ITEM LIST (8 COLS) --- */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* SELECT ALL TOOLBAR */}
              <div className="bg-white rounded-2xl p-4 border border-merino-300/60 shadow-sm flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    cartItems.length > 0 && cartItems.every(i => i.selected) 
                      ? 'bg-venice-blue-900 border-venice-blue-900' 
                      : 'border-merino-300 bg-white'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={cartItems.length > 0 && cartItems.every(i => i.selected)}
                      onChange={toggleSelectAll}
                      className="sr-only"
                    />
                    {cartItems.every(i => i.selected) && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm font-bold text-venice-blue-900">Pilih Semua ({cartItems.length})</span>
                </label>

                {selectedItems.length > 0 && (
                  <button 
                    onClick={() => setCartItems(cartItems.filter(i => !i.selected))}
                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Hapus Pilihan
                  </button>
                )}
              </div>

              {/* LIST ITEM */}
              <div className="bg-white rounded-2xl border border-merino-300/60 shadow-sm divide-y divide-merino-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                    
                    {/* CHECKBOX ITEM */}
                    <div 
                      onClick={() => toggleSelectItem(item.id)}
                      className={`mt-6 w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer shrink-0 transition-colors ${
                        item.selected 
                          ? 'bg-venice-blue-900 border-venice-blue-900' 
                          : 'border-merino-300 bg-white'
                      }`}
                    >
                      {item.selected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>

                    {/* COVER */}
                    <img 
                      src={item.cover} 
                      alt={item.title} 
                      className="w-16 sm:w-20 aspect-[3/4] object-cover rounded-xl bg-merino-100 border border-merino-200 shrink-0"
                    />

                    {/* DETAIL BUKU */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-venice-blue-900 text-merino flex items-center gap-1 w-max">
                          {item.format === 'physical' && <><BookOpen className="w-3 h-3 text-rock-blue-light" /> Buku Fisik</>}
                          {item.format === 'ebook' && <><Smartphone className="w-3 h-3 text-rock-blue-light" /> E-Book</>}
                          {item.format === 'audiobook' && <><Headphones className="w-3 h-3 text-rock-blue-light" /> Audiobook</>}
                        </span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Hapus Buku"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-venice-blue-950 truncate leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-venice-blue-700/80">{item.author}</p>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* HARGA */}
                        <div>
                          {item.originalPrice && (
                            <span className="text-[10px] sm:text-xs line-through text-slate-400 block">
                              {formatRupiah(item.originalPrice)}
                            </span>
                          )}
                          <span className="font-black text-sm sm:text-base text-venice-blue-900">
                            {formatRupiah(item.price)}
                          </span>
                        </div>

                        {/* QUANTITY COUNTER */}
                        <div className="flex items-center border border-merino-300 rounded-xl bg-merino-50 w-max">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-venice-blue-800 hover:bg-merino-200 rounded-l-xl transition-colors disabled:opacity-40"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-venice-blue-950 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-venice-blue-800 hover:bg-merino-200 rounded-r-xl transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* --- RIGHT SECTION: SUMMARY & CHECKOUT CTA (4 COLS) --- */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* RINGKASAN BELANJA CARD */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4 sticky top-24">
                <h3 className="font-bold text-base text-venice-blue-900 pb-3 border-b border-merino-200">
                  Ringkasan Belanja
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-venice-blue-700">
                    <span>Total Barang Terpilih</span>
                    <span className="font-bold text-venice-blue-950">{totalSelectedCount} barang</span>
                  </div>

                  <div className="flex justify-between text-venice-blue-700">
                    <span>Total Harga Barang</span>
                    <span className="font-bold text-venice-blue-950">{formatRupiah(subtotal)}</span>
                  </div>

                  <div className="pt-3 border-t border-merino-300 flex justify-between items-center text-sm">
                    <span className="font-bold text-venice-blue-900">Total Estimasi</span>
                    <span className="font-black text-base text-venice-blue-900">{formatRupiah(subtotal)}</span>
                  </div>
                </div>

                {/* INFO SINGKAT ONGKIR */}
                <div className="flex items-center gap-2 text-[11px] text-venice-blue-700/80 bg-merino-50 p-2.5 rounded-xl border border-merino-200">
                  <Tag className="w-4 h-4 text-rock-blue-dark shrink-0" />
                  <span>Ongkos kirim & voucher diskon akan dihitung di halaman checkout.</span>
                </div>

                {/* TOMBOL KE CHECKOUT */}
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={selectedItems.length === 0}
                  className="w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-black py-3.5 rounded-xl transition-all shadow-lg shadow-venice-blue-950/20 active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  Beli ({totalSelectedCount}) <ArrowRight className="w-4 h-4 text-rock-blue-light" />
                </button>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  )
}
