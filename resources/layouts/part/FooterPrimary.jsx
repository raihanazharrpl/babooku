// resources/layouts/part/FooterPrimary.jsx
import React from 'react'

export default function FooterPrimary() {
  return (
    <footer className="bg-white border-t border-blue-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Babooku. All rights reserved.</p>
      </div>
    </footer>
  )
}
