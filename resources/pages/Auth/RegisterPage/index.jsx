// resources/pages/RegisterPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../../stores/useAuthStore'
import { User, Mail, Lock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    // Validasi frontend untuk kecocokan password
    if (password !== confirmPassword) {
      setLocalError('Password dan Konfirmasi Password tidak cocok.')
      return
    }
    if (password.length < 6) {
      setLocalError('Password harus minimal 6 karakter.')
      return
    }

    const result = await register(name, email, password)
    
    // Redirect langsung ke /store jika register berhasil (auto-login)
    if (result.success) {
      navigate('/store')
    }
  }

  // Gabungkan error dari API dan error validasi lokal
  const displayError = localError || error

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8 my-8">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900">
            Daftar <span className="text-brand-primary">Babooku</span>
          </h2>
          <p className="text-slate-500 text-sm">
            Buat akun gratis dan mulai jelajahi ribuan buku.
          </p>
        </div>

        {/* Alert Error */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{displayError}</span>
          </div>
        )}

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eko Kurniawan"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-hover text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'Memproses...' : 'Buat Akun'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {/* Link Kembali ke Login */}
        <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/auth/login" className="font-semibold text-brand-primary hover:underline">
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  )
}
