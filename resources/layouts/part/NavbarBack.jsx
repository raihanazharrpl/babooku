// resources/layouts/part/NavbarBack.jsx
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NavbarBack({ title }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-merino-50/90 backdrop-blur-md border-b border-merino-300/60 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Tombol Back di Kiri */}
        <button
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Kembali"
          className="flex items-center gap-2 p-2 rounded-xl text-venice-blue-900 hover:bg-merino-200/60 hover:text-venice-blue-950 transition-all duration-200 active:scale-95 group font-medium text-sm"
        >
          <ArrowLeft className="w-5 h-5 text-venice-blue-800 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Kembali</span>
        </button>

        {/* Judul Halaman Opsional (di tengah) */}
        {title && (
          <h1 className="text-base md:text-lg font-bold text-venice-blue-950 truncate max-w-[50%]">
            {title}
          </h1>
        )}

        {/* Tombol Ke Home di Kanan */}
        <Link
          to="/home"
          aria-label="Ke Beranda"
          className="flex items-center gap-2 p-2 rounded-xl text-venice-blue-900 hover:bg-merino-200/60 hover:text-venice-blue-950 transition-all duration-200 active:scale-95 group font-medium text-sm"
        >
          <span className="hidden sm:inline">Beranda</span>
          <Home className="w-5 h-5 text-venice-blue-800 group-hover:scale-105 transition-transform" />
        </Link>

      </div>
    </header>
  )
}
