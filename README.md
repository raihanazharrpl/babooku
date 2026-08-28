```markdown

.
├── README.md
├── api
│   ├── bookLikes.js
│   ├── bookReviews.js
│   ├── books.js
│   ├── cart.js
│   ├── categories.js
│   ├── discounts.js
│   ├── generateKeywords.js
│   ├── index.js
│   ├── landing.js
│   ├── login.js
│   ├── orders.js
│   ├── publishers.js
│   ├── readme.md
│   ├── register.js
│   ├── tags.js
│   └── upload.js
├── app
│   ├── Commands
│   │   ├── makeApiVercel.js
│   │   ├── makeEnvExample.js
│   │   ├── makeMigration.js
│   │   ├── makeSecret.js
│   │   ├── makeSeeder.js
│   │   └── migrate.js
│   ├── Controllers
│   │   ├── index.controller.js
│   │   └── landing.controller.js
│   ├── Middlewares
│   └── Models
├── config
│   ├── app.js
│   ├── database.js
│   └── pagesUrl.js
├── database
│   ├── factories
│   │   └── bookFactory.js
│   ├── migrations
│   │   ├── mysql
│   │   │   ├── 20260809112651_create_users_table.sql
│   │   │   ├── 20260809112652_create_categories_table.sql
│   │   │   ├── 20260809112654_create_subcategories_table.sql
│   │   │   ├── 20260809112655_create_books_table.sql
│   │   │   ├── 20260809112657_create_cart_items_table.sql
│   │   │   ├── 20260809112658_create_orders_table.sql
│   │   │   ├── 20260809112659_create_order_items_table.sql
│   │   │   ├── 20260825061932_create_notifications_table.sql
│   │   │   ├── 20260825061949_create_mail_table.sql
│   │   │   ├── 20260825073720_create_tags_table.sql
│   │   │   ├── 20260825083455_create_discounts_table.sql
│   │   │   ├── 20260825083516_create_book_likes_table.sql
│   │   │   ├── 20260825085421_create_book_reviews_table.sql
│   │   │   └── 20260825091440_create_publishers_table.sql
│   │   └── postgres
│   │       ├── 20260825010428_create_users_table.sql
│   │       ├── 20260825010445_create_categories_table.sql
│   │       ├── 20260825010505_create_subcategories_table.sql
│   │       ├── 20260825010609_create_orders_table.sql
│   │       ├── 20260825061932_create_notifications_table.sql
│   │       ├── 20260825061949_create_mail_table.sql
│   │       ├── 20260825073720_create_tags_table.sql
│   │       ├── 20260825091440_create_publishers_table.sql
│   │       ├── 20260825122247_create_books_table.sql
│   │       ├── 20260825122456_create_cart_items_table.sql
│   │       ├── 20260825122605_create_order_items_table.sql
│   │       ├── 20260825122730_create_discounts_table.sql
│   │       ├── 20260825122833_create_book_likes_table.sql
│   │       └── 20260825122917_create_book_reviews_table.sql
│   └── seeders
│       ├── BookSeeder.js
│       ├── CategorySeeder.js
│       ├── DatabaseSeeder.js
│       ├── PublisherSeeder.js
│       ├── TagsSeeder.js
│       └── UsersSeeder.js
├── index.html
├── lang
├── logo-with-text.png
├── netlify
├── nodemon.json
├── package-lock.json
├── package.json
├── public
│   └── main.jsx
├── resources
│   ├── components
│   │   ├── Helper
│   │   │   └── ScrollToTop.jsx
│   │   └── Route
│   │       ├── GuestRoute.jsx
│   │       └── ProtectedRoute.jsx
│   ├── css
│   │   └── style.css
│   ├── helpers
│   │   ├── assetsHelper.js
│   │   ├── categoriesHelper.js
│   │   ├── dbHelper.js
│   │   ├── priceHelper.js
│   │   ├── searchingHelper.js
│   │   └── uploadCoversHelper.js
│   ├── layouts
│   │   ├── AdminLayout.jsx
│   │   ├── AppLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── part
│   │       ├── FooterPrimary.jsx
│   │       ├── FooterSecondary.jsx
│   │       ├── NavbarAdmin.jsx
│   │       ├── NavbarBack.jsx
│   │       ├── NavbarPrimary.jsx
│   │       ├── NavbarSecondary.jsx
│   │       ├── SidebarAdmin.jsx
│   │       └── SidebarPrimary.jsx
│   ├── libs
│   │   ├── dbPool.js
│   │   ├── otpBot.js
│   │   └── uploadCover.js
│   ├── main.jsx
│   ├── pages
│   │   ├── AboutPage
│   │   │   └── index.jsx
│   │   ├── Auth
│   │   │   ├── LoginPage
│   │   │   │   └── index.jsx
│   │   │   └── RegisterPage
│   │   │       └── index.jsx
│   │   ├── BookDetailPage
│   │   │   └── index.jsx
│   │   ├── CartPage
│   │   │   └── index.jsx
│   │   ├── CheckoutPage
│   │   │   └── index.jsx
│   │   ├── ContactPage
│   │   │   └── index.jsx
│   │   ├── ErrorPage
│   │   │   └── index.jsx
│   │   ├── HomePage
│   │   │   └── index.jsx
│   │   ├── LandingPage
│   │   │   ├── components
│   │   │   │   ├── CtaSection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   ├── TopBooksSection.jsx
│   │   │   │   └── TopCategoriesSection.jsx
│   │   │   └── index.jsx
│   │   ├── ProfilePage
│   │   │   └── index.jsx
│   │   ├── StorePage
│   │   │   ├── components
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── StoreHeader.jsx
│   │   │   │   ├── StoreMobileFilter.jsx
│   │   │   │   ├── StorePagination.jsx
│   │   │   │   └── StoreSidebar.jsx
│   │   │   └── index.jsx
│   │   └── admin
│   │       ├── BannerPage
│   │       │   └── index.jsx
│   │       ├── CustomersPage
│   │       │   └── index.jsx
│   │       ├── DashboardPage
│   │       │   └── index.jsx
│   │       ├── MailPage
│   │       │   └── index.jsx
│   │       ├── NotificationPage
│   │       │   └── index.jsx
│   │       ├── OrdersPage
│   │       │   └── index.jsx
│   │       ├── ProfilePage
│   │       │   └── index.jsx
│   │       ├── SettingPage
│   │       │   └── index.jsx
│   │       ├── analytics
│   │       │   ├── SalesPage
│   │       │   │   └── index.jsx
│   │       │   ├── StockPage
│   │       │   │   └── index.jsx
│   │       │   ├── SummaryPage
│   │       │   │   └── index.jsx
│   │       │   └── UsersPage
│   │       │       └── index.jsx
│   │       └── books
│   │           ├── CategoryPage
│   │           │   └── index.jsx
│   │           ├── ListPage
│   │           │   └── index.jsx
│   │           ├── PublisherPage
│   │           │   └── index.jsx
│   │           └── TagPage
│   │               └── index.jsx
│   ├── stores
│   │   └── useAuthStore.js
│   ├── tools
│   │   ├── create-user.js
│   │   └── upload-cover.js
│   └── utils
│       ├── supabase.js
│       └── whatsappSocket.js
├── routes
│   ├── AdminRoutes.jsx
│   ├── AppRoutes.jsx
│   └── api
│       ├── bookLikes.js
│       ├── bookReviews.js
│       ├── books.js
│       ├── cart.js
│       ├── categories.js
│       ├── discounts.js
│       ├── generateKeywords.js
│       ├── landing.js
│       ├── login.js
│       ├── orders.js
│       ├── otp.js
│       ├── publishers.js
│       ├── register.js
│       ├── tags.js
│       └── upload.js
├── server.js
├── sessions
├── storage
│   ├── assets
│   │   ├── images
│   │   │   ├── ex.png
│   │   │   ├── statis
│   │   │   │   ├── hero-books.webp
│   │   │   │   ├── logo-only-500.png
│   │   │   │   ├── logo-with-text-non-proposional-500.png
│   │   │   │   ├── logo-with-text-proposional-1250.png
│   │   │   │   └── wallpaper-landing-page.jpg
│   │   │   └── uploads
│   │   │       └── covers
│   │   │           ├── categories
│   │   │           │   └── novels
│   │   │           │       └── ex.png
│   │   │           └── ex.png
│   │   └── videos
│   └── images
│       └── covers
│           └── perahu-kertas.jpg
├── vercel.json
└── vite.config.js

78 directories, 176 files
```
```javascript
resources/main.jsx
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

// resources/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/resources/components/Route/ProtectedRoute.jsx';
import GuestRoute from '@/resources/components/Route/GuestRoute.jsx';

// Layouts
import AppLayout from '@/resources/layouts/AppLayout.jsx';
import AuthLayout from '@/resources/layouts/AuthLayout.jsx';

// Pages
import LandingPage from '@/resources/pages/LandingPage/index.jsx';
import HomePage from '@/resources/pages/HomePage/index.jsx';
import StorePage from '@/resources/pages/StorePage/index.jsx';
import ContactPage from '@/resources/pages/ContactPage/index.jsx';
import AboutPage from '@/resources/pages/AboutPage/index.jsx';
import LoginPage from '@/resources/pages/Auth/LoginPage/index.jsx';
import RegisterPage from '@/resources/pages/Auth/RegisterPage/index.jsx';
import ProfilePage from '@/resources/pages/ProfilePage/index.jsx';
import CartPage from '@/resources/pages/CartPage/index.jsx';
import BookDetailPage from '@/resources/pages/BookDetailPage/index.jsx';
import CheckoutPage from '@/resources/pages/CheckoutPage/index.jsx';

// Sub-Routes Import
import AdminRoutes from './AdminRoutes.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC / STANDARD USER ROUTES */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
       <Route path="/store/book/:id" element={<BookDetailPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      {/* 2. PROTECTED ADMIN ROUTES (Menggunakan wildcard admin/*) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      {/* 3. GUEST ONLY ROUTES */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// resources/components/Route/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore.js'

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

// resources/components/Route/GuestRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore.js'

export default function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

// resources/stores/useAuthStore.js
import { create } from 'zustand'

// Helper untuk cek token awal dari localStorage
const initialToken = localStorage.getItem('token') || null
const initialUser = (() => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (e) {
    return null
  }
})()

export const useAuthStore = create((set) => ({
  user: initialUser,
  token: initialToken,
  isAuthenticated: Boolean(initialToken), // <-- TAMBAHAN PENTING
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const textData = await response.text()
      let data = {}
      
      try {
        data = textData ? JSON.parse(textData) : {}
      } catch (parseError) {
        throw new Error('Respons server tidak valid (Bukan JSON).')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal masuk, periksa kembali data Anda.')
      }

      // Simpan ke localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Update state dengan isAuthenticated: true
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      })

      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const textData = await response.text()
      let data = {}
      
      try {
        data = textData ? JSON.parse(textData) : {}
      } catch (parseError) {
        throw new Error('Respons server tidak valid (Bukan JSON).')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal mendaftar, silakan periksa data Anda.')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      })

      return { success: true }
      
    } catch (err) {
      set({ error: err.message, loading: false })
      return { success: false, error: err.message }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false, error: null })
  },
}))

// routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import AdminLayout from '@/resources/layouts/AdminLayout.jsx';

// Import Halaman Utama Admin (Semua huruf kecil pada folder 'admin')
import DashboardPage from '@/resources/pages/admin/DashboardPage/index.jsx';
import OrdersPage from '@/resources/pages/admin/OrdersPage/index.jsx';
import CustomersPage from '@/resources/pages/admin/CustomersPage/index.jsx';
import BannerPage from '@/resources/pages/admin/BannerPage/index.jsx';
import MailPage from '@/resources/pages/admin/MailPage/index.jsx';
import NotificationPage from '@/resources/pages/admin/NotificationPage/index.jsx';
import ProfilePage from '@/resources/pages/admin/ProfilePage/index.jsx';
import SettingPage from '@/resources/pages/admin/SettingPage/index.jsx';

// Import Submenu Books
import BookListPage from '@/resources/pages/admin/books/ListPage/index.jsx';
import BookCategoryPage from '@/resources/pages/admin/books/CategoryPage/index.jsx';
import BookTagPage from '@/resources/pages/admin/books/TagPage/index.jsx';
// Tambahkan import komponen
import PublisherPage from '@/resources/pages/admin/books/PublisherPage/index.jsx';

// Import Submenu Analytics
import SummaryPage from '@/resources/pages/admin/analytics/SummaryPage/index.jsx';
import StockPage from '@/resources/pages/admin/analytics/StockPage/index.jsx';
import UsersPage from '@/resources/pages/admin/analytics/UsersPage/index.jsx';
import SalesPage from '@/resources/pages/admin/analytics/SalesPage/index.jsx';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Submenu Books */}
        <Route path="books" element={<Outlet />}>
          <Route index element={<Navigate to="list" replace />} />
          <Route path="list" element={<BookListPage />} />
          <Route path="category" element={<BookCategoryPage />} />
          <Route path="tag" element={<BookTagPage />} />
          <Route path="publishers" element={<PublisherPage />} />
        </Route>

        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="banners" element={<BannerPage />} />
        <Route path="mail" element={<MailPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingPage />} />

        {/* Submenu Analytics */}
        <Route path="analytics" element={<Outlet />}>
          <Route index element={<Navigate to="summary" replace />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sales" element={<SalesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
```