import React, { createContext, useContext, useState } from 'react'

const AuthUserContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthUserContext)
}
export const AuthContextProvider = ({ loggedUser, children }) => {
  const [authGlobal, setAuthGlobal] = useState(!!loggedUser)
  const [user, setUser] = useState(loggedUser)
  const toggleAuthGlobal = (isAuth) => {
    setAuthGlobal(isAuth)
  }
  return (
    <AuthUserContext.Provider
      value={{ authGlobal, setAuthGlobal, user, setUser }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}
