import { createBrowserRouter, Navigate, Outlet } from 'react-router'

// Route Guards & Helpers
import ProtectedRoute from '@/resources/components/Route/ProtectedRoute.jsx'
import GuestRoute from '@/resources/components/Route/GuestRoute.jsx'
import ScrollToTop from '@/resources/components/Helper/ScrollToTop.jsx'

// Layouts
import AppLayout from '@/resources/layouts/AppLayout.jsx'
import AuthLayout from '@/resources/layouts/AuthLayout.jsx'
import AdminLayout from '@/resources/layouts/AdminLayout.jsx'

// Pages - Main
import LandingPage from '@/resources/pages/LandingPage/index.jsx'
import HomePage from '@/resources/pages/HomePage/index.jsx'
import StorePage from '@/resources/pages/StorePage/index.jsx'
import ContactPage from '@/resources/pages/ContactPage/index.jsx'
import AboutPage from '@/resources/pages/AboutPage/index.jsx'
import LoginPage from '@/resources/pages/Auth/LoginPage/index.jsx'
import RegisterPage from '@/resources/pages/Auth/RegisterPage/index.jsx'
import ProfilePage from '@/resources/pages/ProfilePage/index.jsx'
import CartPage from '@/resources/pages/CartPage/index.jsx'
import BookDetailPage from '@/resources/pages/BookDetailPage/index.jsx'
import CheckoutPage from '@/resources/pages/CheckoutPage/index.jsx'

// Pages - Admin
import DashboardPage from '@/resources/pages/admin/DashboardPage/index.jsx'
import OrdersPage from '@/resources/pages/admin/OrdersPage/index.jsx'
import CustomersPage from '@/resources/pages/admin/CustomersPage/index.jsx'
import BannerPage from '@/resources/pages/admin/BannerPage/index.jsx'
import MailPage from '@/resources/pages/admin/MailPage/index.jsx'
import NotificationPage from '@/resources/pages/admin/NotificationPage/index.jsx'
import AdminProfilePage from '@/resources/pages/admin/ProfilePage/index.jsx'
import SettingPage from '@/resources/pages/admin/SettingPage/index.jsx'
import BookListPage from '@/resources/pages/admin/books/ListPage/index.jsx'
import BookCategoryPage from '@/resources/pages/admin/books/CategoryPage/index.jsx'
import BookTagPage from '@/resources/pages/admin/books/TagPage/index.jsx'
import PublisherPage from '@/resources/pages/admin/books/PublisherPage/index.jsx'
import SummaryPage from '@/resources/pages/admin/analytics/SummaryPage/index.jsx'
import StockPage from '@/resources/pages/admin/analytics/StockPage/index.jsx'
import UsersPage from '@/resources/pages/admin/analytics/UsersPage/index.jsx'
import SalesPage from '@/resources/pages/admin/analytics/SalesPage/index.jsx'

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      /* 1. PUBLIC & USER ROUTES */
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <LandingPage /> },
          { path: '/home', element: <HomePage /> },
          { path: '/store', element: <StorePage /> },
          { path: '/about', element: <AboutPage /> },
          { path: '/contact', element: <ContactPage /> },
          { path: '/store/book/:id', element: <BookDetailPage /> },

          // Protected User Routes
          {
            element: <ProtectedRoute />,
            children: [
              { path: '/profile', element: <ProfilePage /> },
              { path: '/cart', element: <CartPage /> },
              { path: '/checkout', element: <CheckoutPage /> },
            ],
          },
        ],
      },

      /* 2. PROTECTED ADMIN ROUTES */
      {
        path: 'admin',
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', element: <DashboardPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'customers', element: <CustomersPage /> },
              { path: 'banners', element: <BannerPage /> },
              { path: 'mail', element: <MailPage /> },
              { path: 'notifications', element: <NotificationPage /> },
              { path: 'profile', element: <AdminProfilePage /> },
              { path: 'settings', element: <SettingPage /> },

              // Books Submenu
              {
                path: 'books',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  { path: 'list', element: <BookListPage /> },
                  { path: 'category', element: <BookCategoryPage /> },
                  { path: 'tag', element: <BookTagPage /> },
                  { path: 'publishers', element: <PublisherPage /> },
                ],
              },

              // Analytics Submenu
              {
                path: 'analytics',
                children: [
                  { index: true, element: <Navigate to="summary" replace /> },
                  { path: 'summary', element: <SummaryPage /> },
                  { path: 'stock', element: <StockPage /> },
                  { path: 'users', element: <UsersPage /> },
                  { path: 'sales', element: <SalesPage /> },
                ],
              },
            ],
          },
        ],
      },

      /* 3. GUEST ONLY ROUTES */
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: '/auth', element: <Navigate to="/auth/login" replace /> },
              { path: '/auth/login', element: <LoginPage /> },
              { path: '/auth/register', element: <RegisterPage /> },
            ],
          },
        ],
      },

      /* FALLBACK */
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default router
