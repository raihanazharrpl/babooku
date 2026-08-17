// resources/pages/CheckoutPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  MapPin, Truck, CreditCard, ShieldCheck, Tag, 
  ChevronRight, AlertCircle, Check, BookOpen, 
  Smartphone, Headphones, ArrowLeft, QrCode, Wallet, Building2
} from 'lucide-react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  // --- STATE ALUR CHECKOUT ---
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [selectedCourier, setSelectedCourier] = useState('regular')
  const [selectedPayment, setSelectedPayment] = useState('qris')
  const [promoCode, setPromoCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')

  // --- MOCK DATA ALAMAT ---
  const addresses = [
    {
      id: 1,
      label: 'Rumah Utama',
      recipient: 'Eko Kurniawan',
      phone: '081234567890',
      address: 'Jl. Bojongsoang No. 123, Rt 02/05, Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375'
    },
    {
      id: 2,
      label: 'Kantor',
      recipient: 'Eko Kurniawan (Babooku Tech)',
      phone: '089876543210',
      address: 'Gedung Menara Indah Lt. 4, Jl. Asia Afrika No. 45, Sumur Bandung, Kota Bandung 40111'
    }
  ]

  // --- MOCK DATA PRODUCT DI KERANJANG ---
  const cartItems = [
    {
      id: 1,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      format: 'physical',
      price: 98000,
      quantity: 1,
      cover: '/storage/assets/images/ex.png'
    },
    {
      id: 2,
      title: 'Atomic Habits (Digital Edition)',
      author: 'James Clear',
      format: 'ebook',
      price: 85000,
      quantity: 1,
      cover: '/storage/assets/images/statis/book2.webp'
    }
  ]

  // --- MOCK DATA EKPEDISI / KURIR ---
  const couriers = [
    { id: 'regular', name: 'Reguler (JNE / J&T)', etd: '2-3 Hari', price: 15000 },
    { id: 'express', name: 'Express / Next Day', etd: '1 Hari (Besok Tiba)', price: 28000 },
    { id: 'cargo', name: 'Kargo (Pembelian Banyak)', etd: '3-5 Hari', price: 10000 }
  ]

  // --- MOCK METODE PEMBAYARAN ---
  const paymentMethods = [
    { id: 'qris', name: 'QRIS (GoPay, OVO, ShopeePay, Dana)', icon: QrCode, category: 'Instan' },
    { id: 'bca', name: 'Virtual Account BCA', icon: Building2, category: 'Transfer Bank' },
    { id: 'mandiri', name: 'Virtual Account Mandiri', icon: Building2, category: 'Transfer Bank' },
    { id: 'ewallet', name: 'E-Wallet (GoPay AutoPay)', icon: Wallet, category: 'E-Wallet' }
  ]

  // --- PERHITUNGAN BIAYA ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  // Cek apakah ada barang fisik yang perlu ongkir
  const hasPhysicalItem = cartItems.some(item => item.format === 'physical')
  const shippingFee = hasPhysicalItem 
    ? (couriers.find(c => c.id === selectedCourier)?.price || 0) 
    : 0

  const serviceFee = 2000
  const totalPrice = subtotal + shippingFee + serviceFee - discountAmount

  // Helper Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  // Handle Promo Voucher
  const handleApplyPromo = (e) => {
    e.preventDefault()
    setPromoError('')
    setPromoSuccess('')

    if (promoCode.toUpperCase() === 'BABOOKU2026') {
      const discount = subtotal * 0.2 // Diskon 20%
      setDiscountAmount(discount)
      setPromoSuccess('Voucher BABOOKU2026 berhasil dipasang! (Diskon 20%)')
    } else {
      setPromoError('Kode voucher tidak valid atau sudah kadaluwarsa.')
    }
  }

  // Handle Submit Order / Bayar
  const handleProcessOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect ke halaman sukses pesanan
      navigate('/orders')
    }, 1500)
  }

  return (
    <div className="bg-merino-50 min-h-screen font-sans text-venice-blue-950 pb-20">
      
      {/* 1. HEADER SIMPLE CHECKOUT */}
      <div className="bg-white border-b border-merino-300/60 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-venice-blue-800 hover:text-venice-blue-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Keranjang
          </button>
          <span className="font-black text-lg text-venice-blue-900 tracking-tight">Checkout Pesanan</span>
          <div className="w-20 hidden sm:block"></div> {/* Spacer balance */}
        </div>
      </div>

      {/* 2. MAIN LAYOUT CHECKOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SECTION: FORM & SELECTION (8 COLS) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. ALAMAT PENGIRIMAN (Khusus jika ada barang fisik) */}
            {hasPhysicalItem ? (
              <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-merino-200">
                  <h2 className="font-bold text-base md:text-lg text-venice-blue-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rock-blue-dark" /> Alamat Pengiriman
                  </h2>
                  <button className="text-xs font-bold text-rock-blue-dark hover:underline">+ Tambah Alamat Baru</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddress === addr.id 
                          ? 'border-venice-blue-800 bg-venice-blue-50/30 shadow-sm' 
                          : 'border-merino-200 hover:border-rock-blue'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-venice-blue-900 bg-merino px-2 py-0.5 rounded-md">
                          {addr.label}
                        </span>
                        {selectedAddress === addr.id && <Check className="w-4 h-4 text-venice-blue-900" />}
                      </div>
                      <p className="font-bold text-sm text-venice-blue-950">{addr.recipient}</p>
                      <p className="text-xs text-venice-blue-700/80 mb-2">{addr.phone}</p>
                      <p className="text-xs text-venice-blue-800/90 leading-relaxed line-clamp-2">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-merino-100 rounded-2xl p-4 border border-rock-blue/30 flex items-center gap-3 text-xs text-venice-blue-900 font-medium">
                <Smartphone className="w-5 h-5 text-rock-blue-dark shrink-0" />
                <span>Pesananmu seluruhnya berformat Digital (E-Book/Audiobook). Pengiriman fisik tidak diperlukan dan produk bisa langsung diakses dari perpustakaan akunmu.</span>
              </div>
            )}

            {/* 2. ITEM PESANAN */}
            <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4">
              <h2 className="font-bold text-base md:text-lg text-venice-blue-900 pb-3 border-b border-merino-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rock-blue-dark" /> Produk yang Dibeli ({cartItems.length})
              </h2>

              <div className="divide-y divide-merino-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img 
                      src={item.cover} 
                      alt={item.title} 
                      className="w-16 h-20 object-cover rounded-xl bg-merino-100 border border-merino-200 shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-venice-blue-900 text-merino flex items-center gap-1">
                          {item.format === 'physical' && <><BookOpen className="w-3 h-3 text-rock-blue-light" /> Fisik</>}
                          {item.format === 'ebook' && <><Smartphone className="w-3 h-3 text-rock-blue-light" /> E-Book</>}
                          {item.format === 'audiobook' && <><Headphones className="w-3 h-3 text-rock-blue-light" /> Audio</>}
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

            {/* 3. METODE PENGIRIMAN (KURIR) */}
            {hasPhysicalItem && (
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
            )}

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

          {/* --- RIGHT SECTION: SUMMARY & ACTION (4 COLS) --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CARD promo VOUCHER */}
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

            {/* RINGKASAN PEMBAYARAN */}
            <div className="bg-white rounded-2xl p-6 border border-merino-300/60 shadow-sm space-y-4 sticky top-24">
              <h3 className="font-bold text-base text-venice-blue-900 pb-3 border-b border-merino-200">
                Rincian Pembayaran
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-venice-blue-700">
                  <span>Subtotal Produk</span>
                  <span className="font-bold text-venice-blue-950">{formatRupiah(subtotal)}</span>
                </div>

                {hasPhysicalItem && (
                  <div className="flex justify-between text-venice-blue-700">
                    <span>Biaya Pengiriman</span>
                    <span className="font-bold text-venice-blue-950">{formatRupiah(shippingFee)}</span>
                  </div>
                )}

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

              {/* JAMINAN AMAN */}
              <div className="flex items-center gap-2 text-[11px] text-venice-blue-700/80 bg-merino-50 p-2.5 rounded-xl border border-merino-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transaksi dijamin 100% aman dan terenkripsi.</span>
              </div>

              {/* TOMBOL BAYAR SEKARANG */}
              <button
                onClick={handleProcessOrder}
                disabled={isProcessing}
                className="w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-black py-3.5 rounded-xl transition-all shadow-lg shadow-venice-blue-950/20 active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Memproses Pesanan...' : 'Bayar Sekarang'}
                {!isProcessing && <ChevronRight className="w-4 h-4 text-rock-blue-light" />}
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
