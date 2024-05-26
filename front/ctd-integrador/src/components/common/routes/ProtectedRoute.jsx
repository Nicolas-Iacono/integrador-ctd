import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({
  user,
  redirectPath = '/',
  role,
  children
}) => {
  const redirect = role
    ? !(user && user.roles && user.roles.some((rol) => rol.rol === role))
    : !(user && user.roles)

  if (redirect) {
    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}
