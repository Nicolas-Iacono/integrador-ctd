import React, { createContext, useContext, useState } from 'react'

const AuthUserContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthUserContext)
}
export const AuthContextProvider = ({ children }) => {
  const [authGlobal, setAuthGlobal] = useState(false)
  const toggleAuthGlobal = (isAuth) => {
    setAuthGlobal(isAuth)
  }
  return (
    <AuthUserContext.Provider
      value={{ authGlobal, toggleAuthGlobal }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}