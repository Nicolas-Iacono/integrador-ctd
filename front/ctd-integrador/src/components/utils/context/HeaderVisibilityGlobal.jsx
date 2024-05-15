import React, { createContext, useContext, useState } from 'react'

const HeaderVisibilityContext = createContext()

export const useHeaderVisibility = () => {
  return useContext(HeaderVisibilityContext)
}
export const HeaderVisibilityProvider = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const toggleHeaderVisibility = (isVisible) => {
    setIsHeaderVisible(isVisible)
  }
  return (
    <HeaderVisibilityContext.Provider
      value={{ isHeaderVisible, toggleHeaderVisibility }}
    >
      {children}
    </HeaderVisibilityContext.Provider>
  )
}
