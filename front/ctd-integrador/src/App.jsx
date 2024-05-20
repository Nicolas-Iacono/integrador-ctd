import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Instrument } from './components/Pages/Instrument'
import { Instruments } from './components/Pages/Instruments'
import { About } from './components/Pages/About'
import { Contact } from './components/Pages/Contact'
import { Layout } from './components/Layout/Layout'
import { ContextProvider } from './components/utils/global.context'
import {AgregarInstrumento} from './components/Pages/AgregarInstrumento'
import { CrearUsuario } from './components/Pages/CrearUsuario'
import { HeaderVisibilityProvider } from './components/utils/context/HeaderVisibilityGlobal'
import './App.css'



export const App = () => {
  return (
    <BrowserRouter>
    <HeaderVisibilityProvider>
      <ContextProvider>
        <Routes>
          <Route path='/crearUsuario' element={<CrearUsuario/>}/>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/instrument/:id" element={<Instrument />} />
            <Route path= "/agregarinstrumento" element={<AgregarInstrumento />}/>
          </Route>
        </Routes>
      </ContextProvider>
      </HeaderVisibilityProvider>
    </BrowserRouter>
  )
}
