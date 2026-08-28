import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../stores/useAuthStore.js'

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
