import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/Helper/ScrollToTop.jsx'
// import eruda from 'eruda'
import AppRoutes from '@/routes/AppRoutes'
import './css/style.css'

// Inisialisasi Eruda
// eruda.init()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
