import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../stores/useAuthStore.js'

export default function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
