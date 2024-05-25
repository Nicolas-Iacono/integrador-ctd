import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Instrument } from './components/Pages/Instrument'
import { Instruments } from './components/Pages/Instruments'
import { About } from './components/Pages/About'
import { Contact } from './components/Pages/Contact'
import { Layout } from './components/Layout/Layout'
import { ContextProvider } from './components/utils/global.context'
import { AgregarInstrumento } from './components/Pages/AgregarInstrumento'
import { EditarInstrumento } from './components/Pages/EditarInstrumento'
import { HeaderVisibilityProvider } from './components/utils/context/HeaderVisibilityGlobal'
import { AuthContextProvider } from './components/utils/context/AuthGlobal'
import './App.css'
import AuthPage from './components/Pages/AuthPage'
import { ProtectedRoute } from './components/common/routes/ProtectedRoute'

export const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if (token && user) {
      setUser(user)
    }
    setLoading(false)
  }, [])

  return (
    <>
      {!loading && (
        <BrowserRouter>
          <HeaderVisibilityProvider>
            <AuthContextProvider loggedUser={user}>
              <ContextProvider>
                <Routes>
                  <Route path="/autentificacion" element={<AuthPage />} />
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/instruments" element={<Instruments />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/instrument/:id" element={<Instrument />} />
                    {user && (
                      <Route element={<ProtectedRoute user={user} />}>
                        <Route
                          path="/agregarInstrumento"
                          element={<AgregarInstrumento />}
                        />
                        <Route
                          path="/editarInstrumento/:id"
                          element={<EditarInstrumento />}
                        />
                      </Route>
                    )}
                  </Route>
                </Routes>
              </ContextProvider>
            </AuthContextProvider>
          </HeaderVisibilityProvider>
        </BrowserRouter>
      )}
    </>
  )
}
