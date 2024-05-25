import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ user, redirectPath = '/', children }) => {
  if (!(user && user.roles && user.roles.some((rol) => rol.rol === 'ADMIN'))) {
    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}
