// resources/pages/CheckoutPage/index.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, Truck, CreditCard, ShieldCheck, Tag, 
  ChevronRight, Check, BookOpen, 
  Smartphone, Headphones, ArrowLeft, QrCode, Wallet, Building2, Loader2
} from 'lucide-react'

import { getCoverUrl } from '#resources/helpers/assetsHelper.js';
import { formatRupiah } from '#resources/helpers/priceHelper.js';

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // --- STATE DATA DARI BACKEND ---
  const [cartItems, setCartItems] = useState([])
  const [shippingAddress, setShippingAddress] = useState('')

  // --- STATE ALUR CHECKOUT ---
  const [selectedCourier, setSelectedCourier] = useState('regular')
  const [selectedPayment, setSelectedPayment] = useState('qris')
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')

  // Opsi Ekspedisi / Kurir
  const couriers = [
    { id: 'regular', name: 'Reguler (JNE / J&T)', etd: '2-3 Hari', price: 15000 },
    { id: 'express', name: 'Express / Next Day', etd: '1 Hari (Besok Tiba)', price: 28000 },
    { id: 'cargo', name: 'Kargo (Pembelian Banyak)', etd: '3-5 Hari', price: 10000 }
  ]

  // Opsi Metode Pembayaran
  const paymentMethods = [
    { id: 'qris', name: 'QRIS (GoPay, OVO, ShopeePay, Dana)', icon: QrCode, category: 'Instan' },
    { id: 'bca', name: 'Virtual Account BCA', icon: Building2, category: 'Transfer Bank' },
    { id: 'mandiri', name: 'Virtual Account Mandiri', icon: Building2, category: 'Transfer Bank' },
    { id: 'ewallet', name: 'E-Wallet (GoPay AutoPay)', icon: Wallet, category: 'E-Wallet' }
  ]

  // 1. FETCH DATA KERANJANG BELANJA USER
  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Kamu harus login terlebih dahulu!')
      navigate('/auth/login')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const json = await res.json()

      if (json.success) {
        setCartItems(json.data?.items || [])
      } else {
        alert(json.message)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // PERHITUNGAN BIAYA
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0)
  const hasPhysicalItem = true // Default untuk pengiriman buku
  const shippingFee = couriers.find(c => c.id === selectedCourier)?.price || 0
  const serviceFee = 2000
  const totalPrice = subtotal + shippingFee + serviceFee - discountAmount

  // Handle Promo Voucher
  const handleApplyPromo = (e) => {
    e.preventDefault()
    setPromoError('')
    setPromoSuccess('')

    if (promoCode.toUpperCase() === 'BABOOKU2026') {
      const discount = subtotal * 0.2
      setDiscountAmount(discount)
      setPromoSuccess('Voucher BABOOKU2026 berhasil dipasang! (Diskon 20%)')
    } else {
      setPromoError('Kode voucher tidak valid atau sudah kadaluwarsa.')
    }
  }

  // 2. PROCESS ORDER / CHECKOUT KE BACKEND (/api/orders)
  const handleProcessOrder = async () => {
    if (!shippingAddress.trim()) {
      alert('Alamat pengiriman wajib diisi lengkap!')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Sesi telah berakhir. Silakan login kembali.')
      navigate('/auth/login')
      return
    }

    setIsProcessing(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          shipping_address: shippingAddress
        })
      })

      const json = await res.json()

      if (json.success) {
        alert('Pesanan berhasil dibuat!')
        navigate('/orders') // Pindah ke riwayat pesanan
      } else {
        alert('Gagal membuat pesanan: ' + json.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan jaringan saat memproses pesanan.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-merino-50 flex flex-col items-center justify-center text-venice-blue-800">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="font-bold text-sm">Memuat data keranjang...</p>
      </div>
    )
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b border-merino-300/60 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-venice-blue-800 hover:text-venice-blue-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <span className="font-black text-lg text-venice-blue-900 tracking-tight">Checkout Pesanan</span>
          <div className="w-20 hidden sm:block"></div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-merino-300 shadow-sm max-w-md mx-auto space-y-4">
            <p className="font-bold text-venice-blue-900 text-lg">Keranjang belanjamu kosong.</p>
            <button 
              onClick={() => navigate('/store')} 
              className="bg-venice-blue-900 text-merino font-bold px-6 py-2.5 rounded-xl hover:bg-venice-blue-800"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- LEFT SECTION --- */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. INPUT ALAMAT PENGIRIMAN */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-merino-200">
                  <h2 className="font-bold text-base md:text-lg text-venice-blue-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rock-blue-dark" /> Alamat Pengiriman
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-venice-blue-800 mb-1">
                    Tuliskan Alamat Lengkap & Nomor Penerima:
                  </label>
                  <textarea
                    rows="3"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Contoh: Eko (08123456789) - Jl. Bojongsoang No. 123, Kec. Baleendah, Bandung 40375"
                    className="w-full px-3.5 py-2.5 bg-merino-50 border border-merino-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-venice-blue-700 resize-none"
                  />
                </div>
              </div>

              {/* 2. ITEM PESANAN DARI DATABASE */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                <h2 className="font-bold text-base md:text-lg text-venice-blue-900 pb-3 border-b border-merino-200 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-rock-blue-dark" /> Produk yang Dibeli ({cartItems.length})
                </h2>

                <div className="divide-y divide-merino-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                      <img 
                        src={item.cover_image ? getCoverUrl(item.cover_image) : 'https://via.placeholder.com/150'} 
                        alt={item.title} 
                        className="w-16 h-20 object-cover rounded-xl bg-merino-100 border border-merino-200 shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-venice-blue-900 text-merino flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-rock-blue-light" /> Buku Fisik
                          </span>
                          <span className="text-xs text-venice-blue-600">{item.author}</span>
                        </div>
                        <h3 className="font-bold text-sm text-venice-blue-950">{item.title}</h3>
                        <p className="text-xs text-venice-blue-800">{item.quantity} x <strong className="text-venice-blue-950">{formatRupiah(item.price)}</strong></p>
                      </div>
                      <p className="font-black text-sm text-venice-blue-900 text-right">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. METODE PENGIRIMAN */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                <h2 className="font-bold text-base md:text-lg text-venice-blue-900 pb-3 border-b border-merino-200 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-rock-blue-dark" /> Opsi Pengiriman
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {couriers.map((courier) => (
                    <div
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        selectedCourier === courier.id 
                          ? 'border-venice-blue-800 bg-venice-blue-50/30 shadow-sm' 
                          : 'border-merino-200 hover:border-rock-blue'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-xs text-venice-blue-950">{courier.name}</p>
                        <p className="text-[11px] text-venice-blue-600/80 mt-1">Estimasi: {courier.etd}</p>
                      </div>
                      <p className="font-black text-xs text-venice-blue-900 mt-3">{formatRupiah(courier.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. METODE PEMBAYARAN */}
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                <h2 className="font-bold text-base md:text-lg text-venice-blue-900 pb-3 border-b border-merino-200 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rock-blue-dark" /> Metode Pembayaran
                </h2>

                <div className="space-y-2">
                  {paymentMethods.map((pay) => {
                    const Icon = pay.icon
                    return (
                      <div 
                        key={pay.id}
                        onClick={() => setSelectedPayment(pay.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          selectedPayment === pay.id 
                            ? 'border-venice-blue-800 bg-venice-blue-50/30 shadow-sm' 
                            : 'border-merino-200 hover:border-rock-blue'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-merino-100 text-venice-blue-900">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-venice-blue-950">{pay.name}</p>
                            <p className="text-[11px] text-venice-blue-600">{pay.category}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === pay.id ? 'border-venice-blue-800 bg-venice-blue-800' : 'border-merino-300'}`}>
                          {selectedPayment === pay.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* --- RIGHT SECTION: SUMMARY --- */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-venice-blue-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-rock-blue-dark" /> Pakai Voucher Hemat
                </h3>

                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Kode: BABOOKU2026" 
                    className="flex-1 px-3 py-2.5 rounded-xl bg-merino-50 border border-merino-300 text-xs text-venice-blue-950 focus:outline-none focus:border-rock-blue"
                  />
                  <button type="submit" className="bg-venice-blue-900 text-merino font-bold px-4 text-xs rounded-xl hover:bg-venice-blue-800 transition-colors shrink-0">
                    Pasang
                  </button>
                </form>

                {promoSuccess && <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">{promoSuccess}</p>}
                {promoError && <p className="text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-lg">{promoError}</p>}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4 sticky top-24">
                <h3 className="font-bold text-base text-venice-blue-900 pb-3 border-b border-merino-200">
                  Rincian Pembayaran
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-venice-blue-700">
                    <span>Subtotal Produk</span>
                    <span className="font-bold text-venice-blue-950">{formatRupiah(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-venice-blue-700">
                    <span>Biaya Pengiriman</span>
                    <span className="font-bold text-venice-blue-950">{formatRupiah(shippingFee)}</span>
                  </div>

                  <div className="flex justify-between text-venice-blue-700">
                    <span>Biaya Layanan</span>
                    <span className="font-bold text-venice-blue-950">{formatRupiah(serviceFee)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Diskon Voucher</span>
                      <span>-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-merino-300 flex justify-between items-center text-sm">
                    <span className="font-bold text-venice-blue-900">Total Pembayaran</span>
                    <span className="font-black text-base text-venice-blue-900">{formatRupiah(totalPrice)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-venice-blue-700/80 bg-merino-50 p-2.5 rounded-xl border border-merino-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transaksi dijamin 100% aman dan terenkripsi.</span>
                </div>

                <button
                  onClick={handleProcessOrder}
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-black py-3.5 rounded-xl transition-all shadow-lg shadow-venice-blue-950/20 active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  {isProcessing ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses Pesanan...</> : 'Bayar Sekarang'}
                  {!isProcessing && <ChevronRight className="w-4 h-4 text-rock-blue-light" />}
                </button>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  )
}
