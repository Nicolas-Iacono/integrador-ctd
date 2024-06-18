import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Instrument } from './components/Pages/Instrument'
import { Instruments } from './components/Pages/Instruments'
import { About } from './components/Pages/About'
import { Contact } from './components/Pages/Contact'
import { Layout } from './components/Layout/Layout'
import { ContextProvider } from './components/utils/global.context'
import { AgregarInstrumento } from './components/Pages/Admin/AgregarInstrumento'
import { EditarInstrumento } from './components/Pages/Admin/EditarInstrumento'
import { Usuarios } from './components/Pages/Admin/Usuarios'
import CrearUsuario from './components/Pages/CrearUsuario'
import EditUser from './components/Form/formUsuario/EditUser'
import { Categories } from './components/Pages/Admin/categories'
import { AgregarCategoria } from './components/Pages/Admin/AgregarCategoria'
import { EditarCategoria } from './components/Pages/Admin/EditarCategoria'
import { Favorites } from './components/Pages/Favorites'
import { HeaderVisibilityProvider } from './components/utils/context/HeaderVisibilityGlobal'
import { AuthContextProvider } from './components/utils/context/AuthGlobal'
import './App.css'
import AuthPage from './components/Pages/AuthPage'
import { NotFoundPage } from './components/Pages/NotFound'
import { ProtectedRoute } from './components/common/routes/ProtectedRoute'

export const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()

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
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/instrument/:id" element={<Instrument />} />
                    <Route element={<ProtectedRoute role="ADMIN" />}>
                      <Route path="/instruments" element={<Instruments />} />
                      <Route path="/usuarios" element={<Usuarios />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route
                        path="/agregarInstrumento"
                        element={<AgregarInstrumento />}
                      />
                      <Route
                        path="/editarInstrumento/:id"
                        element={<EditarInstrumento />}
                      />
                    </Route>
                    <Route
                      path="/agregarCategoria"
                      element={<AgregarCategoria />}
                    />
                    <Route
                      path="/editarCategoria/:id"
                      element={<EditarCategoria />}
                    />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/favorites" element={<Favorites />} />
                    </Route>
                  </Route>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/editarUsuario/:id" element={<EditUser />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Route>
                  <Route element={<ProtectedRoute role="ADMIN" />}>
                    <Route path="/agregarUsuario" element={<CrearUsuario />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ContextProvider>
            </AuthContextProvider>
          </HeaderVisibilityProvider>
        </BrowserRouter>
      )}
    </>
  )
}
