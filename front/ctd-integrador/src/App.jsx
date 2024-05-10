import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Instrument } from './components/Pages/Instrument'
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
            <Route path="/instrument" element={<Instrument />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}
