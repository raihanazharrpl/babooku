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
