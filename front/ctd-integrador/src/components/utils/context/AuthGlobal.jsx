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
  const [favorites, setFavorites] = useState([])

  const toggleAuthGlobal = (isAuth) => {
    setAuthGlobal(isAuth)
  }

  useEffect(() => {
    setIsUserAdmin(isAdmin(user?.roles))
  }, [user])

  const addFavorite = (instrument) => {
    setFavorites((prevFavorites) => [...prevFavorites, instrument])
  }

  const removeFavorite = (instrumentId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== instrumentId)
    )
  }

  return (
    <AuthUserContext.Provider
      value={{
        authGlobal,
        setAuthGlobal,
        user,
        setUser,
        isUserAdmin,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}

