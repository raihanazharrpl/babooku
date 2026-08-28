// resources/pages/RegisterPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuthStore } from '../../../stores/useAuthStore'
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-merino-50 flex items-center justify-center p-6 font-sans text-venice-blue-950">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-merino-300/60 shadow-xl shadow-venice-blue-950/5 space-y-8 my-8">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-3 flex flex-col items-center">
          {/* Logo Proporsional 1250x250 (Ratio 5:1) */}
          <Link to="/" className="inline-block group">
            <div 
              className="h-10 w-50 bg-venice-blue-900 transition-transform duration-300 group-hover:scale-105"
              style={{
                maskImage: 'url(/storage/assets/images/statis/logo-with-text-proposional-1250.png)',
                WebkitMaskImage: 'url(/storage/assets/images/statis/logo-with-text-proposional-1250.png)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
              aria-label="Babooku Logo"
            />
          </Link>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-venice-blue-900">
              Buat Akun Baru
            </h2>
            <p className="text-venice-blue-700/80 text-sm">
              Mulai petualangan membacamu bersama Babooku.
            </p>
          </div>
        </div>

        {/* Alert Error */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <span>{displayError}</span>
          </div>
        )}

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-venice-blue-800 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/60" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eko Kurniawan"
                className="w-full pl-11 pr-4 py-3 bg-merino-50/50 border border-merino-300 rounded-xl text-venice-blue-950 text-sm placeholder-venice-blue-600/40 focus:bg-white focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-venice-blue-800 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-11 pr-4 py-3 bg-merino-50/50 border border-merino-300 rounded-xl text-venice-blue-950 text-sm placeholder-venice-blue-600/40 focus:bg-white focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-venice-blue-800 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-11 pr-4 py-3 bg-merino-50/50 border border-merino-300 rounded-xl text-venice-blue-950 text-sm placeholder-venice-blue-600/40 focus:bg-white focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/50 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-venice-blue-800 uppercase tracking-wider">
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-venice-blue-600/60" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                className="w-full pl-11 pr-4 py-3 bg-merino-50/50 border border-merino-300 rounded-xl text-venice-blue-950 text-sm placeholder-venice-blue-600/40 focus:bg-white focus:border-rock-blue focus:ring-2 focus:ring-rock-blue-light/50 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-venice-blue-900 hover:bg-venice-blue-800 text-merino font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-venice-blue-950/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'Memproses...' : 'Buat Akun'}
            {!loading && <ArrowRight className="w-5 h-5 text-rock-blue-light" />}
          </button>
        </form>

        {/* Link Kembali ke Login */}
        <div className="pt-4 border-t border-merino-300/60 text-center text-sm text-venice-blue-700/80">
          Sudah punya akun?{' '}
          <Link to="/auth/login" className="font-bold text-venice-blue-900 hover:text-rock-blue-dark hover:underline">
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  )
}
