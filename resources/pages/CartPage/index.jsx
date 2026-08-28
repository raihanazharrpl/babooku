// resources/pages/CartPage/index.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  BookOpen, ShieldCheck, Tag, ArrowLeft, Check, Loader2
} from 'lucide-react'

import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah } from '#resources/helpers/priceHelper.js';

export default function CartPage() {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState([]) // Menyimpan ID cart_items yang dicentang

  // 1. FETCH DATA KERANJANG DARI BACKEND (/api/cart)
  useEffect(() => {
    fetchCartData()
  }, [])

  const fetchCartData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const json = await res.json()

      if (json.success) {
        const items = json.data?.items || []
        setCartItems(items)
        // Default: Centang semua item saat pertama kali dimuat
        setSelectedIds(items.map(i => i.id))
      }
    } catch (error) {
      console.error('Gagal memuat keranjang:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 2. HANDLER CHECKBOX
  const toggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(cartItems.map(i => i.id))
    }
  }

  const toggleSelectItem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  // 3. UPDATE KUANTITAS ITEM KE BACKEND (PUT /api/cart)
  const handleUpdateQuantity = async (cartId, currentQty, delta) => {
    const token = localStorage.getItem('token')
    const newQty = currentQty + delta
    if (newQty <= 0) return

    // Optimistic Update UI
    setCartItems(prev => prev.map(item => item.id === cartId ? { ...item, quantity: newQty } : item))

    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cart_id: cartId, quantity: newQty })
      })
      const json = await res.json()
      if (!json.success) {
        fetchCartData() // Revert jika gagal
      }
    } catch (error) {
      fetchCartData()
    }
  }

  // 4. HAPUS ITEM DARI KERANJANG (DELETE /api/cart)
  const handleRemoveItem = async (cartId) => {
    const token = localStorage.getItem('token')
    
    setCartItems(prev => prev.filter(item => item.id !== cartId))
    setSelectedIds(prev => prev.filter(id => id !== cartId))

    try {
      await fetch(`/api/cart?id=${cartId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } catch (error) {
      console.error('Gagal menghapus item:', error)
    }
  }

  // PERHITUNGAN RINGKASAN
  const selectedItems = cartItems.filter(item => selectedIds.includes(item.id))
  const totalSelectedCount = selectedItems.reduce((acc, item) => acc + Number(item.quantity), 0)
  const subtotal = selectedItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-merino-50 flex flex-col items-center justify-center text-venice-blue-800">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="font-bold text-sm">Memuat keranjang belanja...</p>
      </div>
    )
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER */}
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
          <div className="w-20 hidden sm:block"></div>
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
                    cartItems.length > 0 && selectedIds.length === cartItems.length
                      ? 'bg-venice-blue-900 border-venice-blue-900' 
                      : 'border-merino-300 bg-white'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={cartItems.length > 0 && selectedIds.length === cartItems.length}
                      onChange={toggleSelectAll}
                      className="sr-only"
                    />
                    {selectedIds.length === cartItems.length && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm font-bold text-venice-blue-900">Pilih Semua ({cartItems.length})</span>
                </label>

                {selectedIds.length > 0 && (
                  <button 
                    onClick={() => {
                      selectedIds.forEach(id => handleRemoveItem(id))
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Hapus Pilihan
                  </button>
                )}
              </div>

              {/* LIST ITEM */}
              <div className="bg-white rounded-2xl border border-merino-300/60 shadow-sm divide-y divide-merino-200">
                {cartItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id)

                  return (
                    <div key={item.id} className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                      
                      {/* CHECKBOX ITEM */}
                      <div 
                        onClick={() => toggleSelectItem(item.id)}
                        className={`mt-6 w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-venice-blue-900 border-venice-blue-900' 
                            : 'border-merino-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>

                      {/* COVER BUKU */}
                      <img 
                        src={item.cover_image ? getCoverUrl(item.cover_image) : 'https://via.placeholder.com/150'} 
                        alt={item.title} 
                        className="w-16 sm:w-20 aspect-[3/4] object-cover rounded-xl bg-merino-100 border border-merino-200 shrink-0"
                      />

                      {/* DETAIL BUKU */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-venice-blue-900 text-merino flex items-center gap-1 w-max">
                            <BookOpen className="w-3 h-3 text-rock-blue-light" /> Buku Fisik
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
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
                          <span className="font-black text-sm sm:text-base text-venice-blue-900">
                            {formatRupiah(item.price)}
                          </span>

                          {/* COUNTER QUANTITY */}
                          <div className="flex items-center border border-merino-300 rounded-xl bg-merino-50 w-max">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                              className="p-1.5 text-venice-blue-800 hover:bg-merino-200 rounded-l-xl transition-colors disabled:opacity-40"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-venice-blue-950 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                              className="p-1.5 text-venice-blue-800 hover:bg-merino-200 rounded-r-xl transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>

            {/* --- RIGHT SECTION: SUMMARY (4 COLS) --- */}
            <div className="lg:col-span-4 space-y-6">
              
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

                <div className="flex items-center gap-2 text-[11px] text-venice-blue-700/80 bg-merino-50 p-2.5 rounded-xl border border-merino-200">
                  <Tag className="w-4 h-4 text-rock-blue-dark shrink-0" />
                  <span>Ongkos kirim & voucher diskon akan dihitung di halaman checkout.</span>
                </div>

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
