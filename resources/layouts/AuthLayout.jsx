// resources/layouts/AuthLayout.jsx
import React from 'react'
import { Outlet } from 'react-router'
import NavbarBack from './part/NavbarBack'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-merino-50 font-sans text-venice-blue-950">
      {/* Header Back khusus Auth */}
      <NavbarBack />

      {/* Konten Halaman Auth (LoginPage / RegisterPage) */}
      <main className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  )
}
