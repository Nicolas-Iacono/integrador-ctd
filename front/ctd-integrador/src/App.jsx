import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Instrument } from './components/Pages/Instrument'
import { Instruments } from './components/Pages/Instruments'
import { About } from './components/Pages/About'
import { Contact } from './components/Pages/Contact'
import { Layout } from './components/Layout/Layout'
import { ContextProvider } from './components/utils/global.context'
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/instrument/:id" element={<Instrument />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}
