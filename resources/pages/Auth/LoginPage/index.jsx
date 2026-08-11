// resources/pages/LoginPage/index.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../../stores/useAuthStore'
import { Mail, Lock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result.success) {
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900">
            Masuk ke <span className="text-brand-primary">Babooku</span>
          </h2>
          <p className="text-slate-500 text-sm">
            Masukkan akun kamu untuk melanjutkan belanja buku.
          </p>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-brand-primary hover:underline">
                Lupa Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-hover text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk sekarang'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {/* Link Register */}
        <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          Belum punya akun?{' '}
          <Link to="/auth/register" className="font-semibold text-brand-primary hover:underline">
            Daftar Gratis
          </Link>
        </div>

      </div>
    </div>
  )
}
