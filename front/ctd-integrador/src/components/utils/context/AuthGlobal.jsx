import React, { createContext, useContext, useState, useEffect } from 'react'
import { isAdmin } from '../roles/constants'

const AuthUserContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthUserContext)
}
export const AuthContextProvider = ({ loggedUser, children }) => {
  const [authGlobal, setAuthGlobal] = useState(!!loggedUser)
  const [user, setUser] = useState(loggedUser)
  const [isUserAdmin, setIsUserAdmin] = useState(isAdmin(loggedUser?.roles))
  const toggleAuthGlobal = (isAuth) => {
    setAuthGlobal(isAuth)
  }

  useEffect(() => {
    setIsUserAdmin(isAdmin(user?.roles))
  }, [user])

  return (
    <AuthUserContext.Provider
      value={{ authGlobal, setAuthGlobal, user, setUser, isUserAdmin }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}
