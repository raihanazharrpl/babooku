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
