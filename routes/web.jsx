import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../resources/components/Route/ProtectedRoute.jsx'
import GuestRoute from '../resources/components/Route/GuestRoute.jsx'

// Layouts
import AppLayout from '../resources/layouts/AppLayout.jsx'
import AuthLayout from '../resources/layouts/AuthLayout.jsx'

// Pages
import LandingPage from '../resources/pages/LandingPage/index.jsx'
import HomePage from '../resources/pages/HomePage/index.jsx'
import StorePage from '../resources/pages/StorePage/index.jsx'
import LoginPage from '../resources/pages/Auth/LoginPage/index.jsx'
import RegisterPage from '../resources/pages/Auth/RegisterPage/index.jsx'
import ProfilePage from '../resources/pages/ProfilePage/index.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Standard Routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />

        {/* Protected (Must Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Guest Only (Must NOT Login) */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
