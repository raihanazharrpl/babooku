import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import AppLayout from '../resources/layouts/AppLayout.jsx'

// Pages - Customer/Public
import LandingPage from '../resources/pages/LandingPage/index.jsx'
import HomePage from '../resources/pages/HomePage/index.jsx'
import StorePage from '../resources/pages/StorePage/index.jsx'
import LoginPage from '../resources/pages/Auth/LoginPage/index.jsx'
import RegisterPage from '../resources/pages/Auth/RegisterPage/index.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        
      </Route>
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  )
}
